import axiosInstance from '../utils/axiosInstance.js';
import catchAsyncErrors from '../utils/catchAsyncErrors.js';

/** @type {import('express').RequestHandler} */
export const about = (_req, res, _next) => {
  res.status(200).json({
    status: 'success',
    message: `make a request. available endpoints are: '/slug', '/unanswered/slug', '/topic/slug', '/profile/slug'`,
  });
};

/** @type {import('express').RequestHandler} */
export const unimplemented = (_req, res, _next) => {
  res.status(501).json({
    status: 'fail',
    message: "This route isn't yet implemented. Check back sometime later!",
  });
};

/** @type {import('express').RequestHandler} */
export const gone = (_req, res, _next) => {
  res.status(501).json({
    status: 'fail',
    message: "This route doesn't exist anymore.",
  });
};


/** @type {import('express').RequestHandler} */
export const image = catchAsyncErrors(async (req, res, _next) => {
  const { domain, path } = req.params;
  if (!domain.endsWith('quoracdn.net')) {
    return res.status(403).json({
      status: 'fail',
      message: 'Invalid domain',
    });
  }

  const imageRes = await axiosInstance.get(path, { baseURL: `https://${domain}/`, responseType: 'stream' });

  res.set('Content-Type', imageRes.headers['content-type']);
  res.set('Cache-Control', 'public, max-age=315360000');
  return imageRes.data.pipe(res);
});
