////////////////////////////////////////////////////////
//                     IMPORTS
////////////////////////////////////////////////////////
import axiosInstance from '../utils/axiosInstance.js';
import catchAsyncErrors from '../utils/catchAsyncErrors.js';
import getAnswers from '../fetchers/getAnswers.js';
import getTopic from '../fetchers/getTopic.js';

////////////////////////////////////////////////////////
//                     EXPORTS
////////////////////////////////////////////////////////
export const about = (req, res, next) => {
  res.status(200).json({
    status: 'success',
    message:
      "make a request. available endpoints are: '/some-slug', '/unanswered/some-slug'",
  });
};

export const answers = catchAsyncErrors(async (req, res, next) => {
  const data = await getAnswers(req.params.slug);
  res.status(200).json({ status: 'success', data });
});

export const topic = catchAsyncErrors(async (req, res, next) => {
  const data = await getTopic(req.params.slug);
  res.status(200).json({ status: 'success', data });
});

export const unimplemented = (req, res, next) => {
  res.status(501).json({
    status: 'fail',
    message: "This route isn't yet implemented. Check back sometime later!",
  });
};

export const image = catchAsyncErrors(async (req, res, next) => {
  if (!req.params.domain.endsWith("quoracdn.net")) {
    return res.status(403).json({
      status: 'fail',
      message: "Invalid domain",
    });
  }

  const imageRes = await axiosInstance.get(`https://${req.params.domain}/${req.params.path}`, { responseType: 'arraybuffer' });
  res.set('Content-Type', imageRes.headers['content-type'])
  res.status(200).send(imageRes.data);
});