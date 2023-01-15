/* eslint-disable no-unused-vars */
////////////////////////////////////////////////////////
//                     IMPORTS
////////////////////////////////////////////////////////
import catchAsyncErrors from '../utils/catchAsyncErrors.js';
import getAnswers from '../fetchers/getAnswers.js';
import getTopic from '../fetchers/getTopic.js';
import { acceptedLanguages, nonSlugRoutes } from '../utils/constants.js';
import getProfile from '../fetchers/getProfile.js';
import getSearch from '../fetchers/getSearch.js';

////////////////////////////////////////////////////////
//                     EXPORTS
////////////////////////////////////////////////////////
export const about = (req, res, next) => {
  res.render('about', {
    meta: {
      title: 'About',
      url: req.urlObj,
      imageUrl: `${req.urlObj.origin}/icon.svg`,
      description:
        'Quetre is a libre front-end for Quora. See any answer without being tracked, without being required to log in, and without being bombarded by pesky ads.',
    },
  });
};

export const privacy = (req, res, next) => {
  res.render('privacy', {
    meta: {
      title: 'Privacy',
      url: req.urlObj,
      imageUrl: `${req.urlObj.origin}/icon.svg`,
      description: 'Privacy Policy of Quetre, a libre front-end for Quora.',
    },
  });
};

export const answers = catchAsyncErrors(async (req, res, next) => {
  const { slug } = req.params;
  const { lang } = req.query;

  // added this so that a request by browser to get favicon doesn't end up being interpreted as a slug
  if (nonSlugRoutes.includes(slug)) return next();

  const answersData = await getAnswers(slug, lang);
  const title = answersData.question.text[0].spans
    .map(span => span.text)
    .join('');

  return res.status(200).render('answers', {
    data: answersData,
    meta: {
      title,
      url: req.urlObj,
      imageUrl: `${req.urlObj.origin}/icon.svg`,
      description: `Answers to ${title}`,
    },
  });
});

export const topic = catchAsyncErrors(async (req, res, next) => {
  const { slug } = req.params;
  const { lang } = req.query;

  const topicData = await getTopic(slug, lang);

  res.status(200).render('topic', {
    data: topicData,
    meta: {
      title: topicData.name,
      url: req.urlObj,
      imageUrl: `${req.urlObj.origin}/icon.svg`,
      description: `Information about ${topicData.name} topic.`,
    },
  });
});

export const profile = catchAsyncErrors(async (req, res, next) => {
  const { name } = req.params;
  const { lang } = req.query;
  const profileData = await getProfile(name, lang);

  res.status(200).render('profile', {
    data: profileData,
    meta: {
      title: profileData.basic.name,
      url: req.urlObj,
      imageUrl: `${req.urlObj.origin}/icon.svg`,
      description: `${profileData.basic.name}'s profile.`,
    },
  });
});

export const search = catchAsyncErrors(async (req, res, next) => {
  const searchText = req.urlObj.searchParams.get('q')?.trim();
  const { lang } = req.query;
  let searchData = null;
  if (searchText) searchData = await getSearch(req.urlObj.search, lang);

  res.status(200).render('search', {
    data: searchData,
    meta: {
      title: searchText || 'Search',
      url: req.urlObj,
      imageUrl: `${req.urlObj.origin}/icon.svg`,
      description: searchText ? `results for '${searchText}'` : 'search page',
    },
  });
});

export const unimplemented = (req, res, next) => {
  const data = {
    message: "This route isn't yet implemented. Check back sometime later!",
    statusCode: 501,
  };

  res.status(data.statusCode).render('error', {
    data,
    meta: {
      title: 'Not yet implemented',
      url: req.urlObj,
      imageUrl: `${req.urlObj.origin}/icon.svg`,
      description: data.message,
    },
  });
};
