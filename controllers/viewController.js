/* eslint-disable no-unused-vars */
////////////////////////////////////////////////////////
//                     IMPORTS
////////////////////////////////////////////////////////
import catchAsyncErrors from '../utils/catchAsyncErrors.js';
import getAnswers from '../fetchers/getAnswers.js';
import getTopic from '../fetchers/getTopic.js';
import { acceptedLanguages, nonSlugRoutes } from '../utils/constants.js';
import getProfile from '../fetchers/getProfile.js';
import getOrSetCache from '../utils/getOrSetCache.js';
import { answersKey, profileKey, topicKey } from '../utils/cacheKeys.js';

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
  const {
    urlObj,
    params: { slug },
    query: { lang },
  } = req;

  // added this so that a request by browser to get favicon doesn't end up being interpreted as a slug
  if (nonSlugRoutes.includes(slug)) return next();

  const answersData = await getOrSetCache(answersKey(urlObj), getAnswers, slug, lang);
  const title = answersData.question.text[0].spans.map(span => span.text).join('');

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
  const {
    urlObj,
    params: { slug },
    query: { lang },
  } = req;

  const topicData = await getOrSetCache(topicKey(urlObj), getTopic, slug, lang);

  res.status(200).render('topic', {
    data: topicData,
    meta: {
      title: topicData.name,
      url: urlObj,
      imageUrl: `${urlObj.origin}/icon.svg`,
      description: `Information about ${topicData.name} topic.`,
    },
  });
});

export const profile = catchAsyncErrors(async (req, res, next) => {
  const {
    urlObj,
    params: { name },
    query: { lang },
  } = req;

  const profileData = await getOrSetCache(profileKey(urlObj), getProfile, name, lang);

  res.status(200).render('profile', {
    data: profileData,
    meta: {
      title: profileData.basic.name,
      url: urlObj,
      imageUrl: `${urlObj.origin}/icon.svg`,
      description: `${profileData.basic.name}'s profile.`,
    },
  });
});

const regex = /^https:\/\/(.{2,})\.quora\.com(\/.*)$/; // local helper constant
export const redirect = (req, res, next) => {
  const url = req.originalUrl.replace('/redirect/', ''); // removing `/redirect/` part.
  const match = regex.exec(url);

  if (!match) return res.redirect('/');

  const [_, subdomain, rest] = match; // eg: subdomain: 'es', rest: '/topic/linux?share=1'
  let link;

  if (acceptedLanguages.includes(subdomain))
    // adding lang param
    link = `${rest}${rest.includes('?') ? '&' : '?'}lang=${subdomain}`;
  else if (subdomain === 'www') link = rest; // doing nothing
  else link = `/space/${subdomain}${rest}`; // gotta be a space url.

  return res.redirect(link);
};

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

export const gone = (req, res, next) => {
  const data = {
    message: "This route doesn't exist anymore.",
    statusCode: 410,
  };

  res.status(data.statusCode).render('error', {
    data,
    meta: {
      title: 'Gone',
      url: req.urlObj,
      imageUrl: `${req.urlObj.origin}/icon.svg`,
      description: data.message,
    },
  });
};
