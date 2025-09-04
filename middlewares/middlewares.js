import { getValidQueryParams } from '../utils/urlModifiers.js';
import AppError from '../utils/AppError.js';
import { requestsState } from '../utils/state.js';
import catchAsyncErrors from '../utils/catchAsyncErrors.js';
import redis, { ttl } from '../utils/redis.js';
import env from '../utils/env.js';


/** @type {import("express").RequestHandler} */
export const formatReq = (req, _res, next) => {
  req.urlObj = new URL(req.originalUrl, `${req.protocol}://${req.get('host')}`);
  req.query = getValidQueryParams(req.query);
  next();
};

/** @type {import("express").RequestHandler} */
export const checkRateLimit = (_req, res, next) => {
  if (res.locals.data) return next(); // cached data present.
  if (!requestsState.retryAfter) return next();

  // time limit over. trying again.
  if (requestsState.retryAfter <= Date.now()) {
    requestsState.retryAfter = null;
    return next();
  }

  next(new AppError('Quora is rate limiting this instance. Try another or host your own.', 503));
};

export const setCache = catchAsyncErrors(async (_req, res, next) => {
  if (res.locals.fromCache) return next();

  const data = res.locals.data;
  const cacheKey = res.locals.cacheKey;

  await redis.set(cacheKey, JSON.stringify(data), 'EX', ttl);
  next();
});

/**
 * sets cached response in `res.locals.data` if any
 * @param {(urlObj: URL) => string} cacheKeyFunction to retrieve cache key.
 */
export const checkCache = cacheKeyFunction =>
  catchAsyncErrors(async (req, res, next) => {
    const key = cacheKeyFunction(req.urlObj);
    res.locals.cacheKey = key;

    const data = await redis.get(key);

    if (data) {
      await redis.expire(env.REDIS_TTL, ttl, 'GT');
      res.locals.data = JSON.parse(data);
    }

    next();
  });
