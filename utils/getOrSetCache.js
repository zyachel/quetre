import redis from './redis.js';

const ttl = process.env.REDIS_TTL || 3600;

const getOrSetCache = async (key, callback, ...callbackArgs) => {
  const data = await redis.get(key);
  if (data) return JSON.parse(data);

  const dataToCache = await callback(...callbackArgs);
  await redis.set(key, JSON.stringify(dataToCache), 'EX', ttl);

  return dataToCache;
};

export default getOrSetCache;
