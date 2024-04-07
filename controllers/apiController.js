/* eslint-disable no-unused-vars */
////////////////////////////////////////////////////////
//                     IMPORTS
////////////////////////////////////////////////////////
import getAxiosInstance from '../utils/getAxiosInstance.js';
import catchAsyncErrors from '../utils/catchAsyncErrors.js';
import getAnswers from '../fetchers/getAnswers.js';
import getTopic from '../fetchers/getTopic.js';
import getProfile from '../fetchers/getProfile.js';
import getOrSetCache from '../utils/getOrSetCache.js';
import { answersKey, profileKey, topicKey } from '../utils/cacheKeys.js';

////////////////////////////////////////////////////////
//                     EXPORTS
////////////////////////////////////////////////////////
export const about = (req, res, next) => {
  res.status(200).json({
    status: 'success',
    message: `make a request. 
    available endpoints are: '/slug', '/unanswered/slug', '/topic/slug', '/profile/slug'`,
  });
};

export const answers = catchAsyncErrors(async (req, res, next) => {
  const {
    urlObj,
    params: { slug },
    query: { lang },
  } = req;

  const data = await getOrSetCache(answersKey(urlObj), getAnswers, slug, lang);
  res.status(200).json({ status: 'success', data });
});

export const topic = catchAsyncErrors(async (req, res, next) => {
  const {
    urlObj,
    params: { slug },
    query: { lang },
  } = req;

  const data = await getOrSetCache(topicKey(urlObj), getTopic, slug, lang);
  res.status(200).json({ status: 'success', data });
});

export const profile = catchAsyncErrors(async (req, res, next) => {
  const {
    urlObj,
    params: { name },
    query: { lang },
  } = req;

  const data = await getOrSetCache(profileKey(urlObj), getProfile, name, lang);
  res.status(200).json({ status: 'success', data });
});

export const unimplemented = (req, res, next) => {
  res.status(501).json({
    status: 'fail',
    message: "This route isn't yet implemented. Check back sometime later!",
  });
};

export const gone = (req, res, next) => {
  res.status(501).json({
    status: 'fail',
    message: "This route doesn't exist anymore.",
  });
};


export const image = catchAsyncErrors(async (req, res, next) => {
  const { domain, path } = req.params;
  if (!domain.endsWith('quoracdn.net')) {
    return res.status(403).json({
      status: 'fail',
      message: 'Invalid domain',
    });
  }
  // changing defaults for this particular endpoint
  const axiosInstance = getAxiosInstance();
  axiosInstance.defaults.baseURL = `https://${domain}/`;

  const imageRes = await axiosInstance.get(path, { responseType: 'stream' });

  res.set('Content-Type', imageRes.headers['content-type']);
  res.set('Cache-Control', 'public, max-age=315360000');
  return imageRes.data.pipe(res);
});
