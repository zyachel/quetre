/* eslint-disable no-unused-vars */
////////////////////////////////////////////////////////
//                     IMPORTS
////////////////////////////////////////////////////////
import catchAsyncErrors from '../utils/catchAsyncErrors.js';
import getAnswers from '../fetchers/getAnswers.js';
import getTopic from '../fetchers/getTopic.js';
import { nonSlugRoutes } from '../utils/constants.js';

////////////////////////////////////////////////////////
//                     EXPORTS
////////////////////////////////////////////////////////
export const about = (req, res, next) => {
  res.render('about', {
    meta: {
      title: 'About',
    },
  });
};

export const privacy = (req, res, next) => {
  res.render('privacy', {
    meta: {
      title: 'Privacy',
    },
  });
};

export const answers = catchAsyncErrors(async (req, res, next) => {
  const { slug } = req.params;
  // added this so that a request by browser to get favicon doesn't end up being interpreted as a slug
  if (nonSlugRoutes.includes(slug)) return next();

  const answersData = await getAnswers(slug);
  const title = answersData.question.text.spans.map(span => span.text).join('');

  res.status(200).render('answers', {
    data: answersData,
    meta: {
      title,
    },
  });
});

export const topic = catchAsyncErrors(async (req, res, next) => {
  const topicData = await getTopic(req.params.slug);

  res.status(200).render('topic', {
    data: topicData,
    meta: {
      title: topicData.name,
    },
  });
});

export const unimplemented = (req, res, next) => {
  const message =
    "This route isn't yet implemented. Check back sometime later!";
  res.status(501).render('error', {
    data: {
      statusCode: 501,
      message,
    },
    meta: {
      title: 'Not yet implemented',
    },
  });
};
