////////////////////////////////////////////////////////
//                     IMPORTS
////////////////////////////////////////////////////////
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
