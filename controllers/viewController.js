/* eslint-disable no-unused-vars */
////////////////////////////////////////////////////////
//                     IMPORTS
////////////////////////////////////////////////////////
import catchAsyncErrors from '../utils/catchAsyncErrors.js';
import getAnswers from '../fetchers/getAnswers.js';
import { nonSlugRoutes } from '../utils/constants.js';

////////////////////////////////////////////////////////
//                     EXPORTS
////////////////////////////////////////////////////////
export const about = (req, res, next) => {
  res.render('about', { title: 'About' });
};
export const privacy = (req, res, next) => {
  res.render('privacy', { title: 'Privacy' });
};

export const unansweredQuestion = catchAsyncErrors(async (req, res, next) => {
  const answers = await getAnswers(`/unanswered/${req.params.slug}`);
  res.status(200).render('answers', {
    title: answers.question.text.spans.map(span => span.text).join(''),
    data: answers,
    math: answers.hasMath,
  });
});

export const answeredQuestion = catchAsyncErrors(async (req, res, next) => {
  const { slug } = req.params;
  // added this so that a request by browser to get favicon doesn't end up being interpreted as a slug
  if (nonSlugRoutes.includes(slug)) return next();

  const answers = await getAnswers(slug);

  res.status(200).render('answers', {
    title: answers.question.text.spans.map(span => span.text).join(''),
    data: answers,
    math: answers.hasMath,
  });
});

export const unimplemented = (req, res, next) => {
  res.status(503).render('error', {
    title: 'Not yet implemented',
    statusCode: 503,
    message: "This route isn't yet implemented. Check back sometime later!",
  });
};
