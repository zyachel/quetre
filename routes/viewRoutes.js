import express from 'express';
import { about, privacy, unimplemented, gone } from '../controllers/viewController.js';
import { answers, topic, profile, redirect } from '../controllers/controller.js';
import { answersKey, profileKey, topicKey } from '../utils/cacheKeys.js';
import { checkCache, checkRateLimit, setCache } from '../middlewares/middlewares.js';
import { render } from '../middlewares/viewMiddlewares.js';

const viewRouter = express.Router();

viewRouter.get('/search', gone);
viewRouter.get('/(|about)', about);
viewRouter.get('/privacy', privacy);
viewRouter.get(
  '/profile/:name',
  checkCache(profileKey),
  checkRateLimit,
  profile,
  setCache,
  render('profile'),
);
viewRouter.get(
  '/topic/:slug',
  checkCache(topicKey),
  checkRateLimit,
  topic,
  setCache,
  render('topic'),
);
viewRouter.get(
  '/unanswered/:slug',
  checkCache(answersKey),
  checkRateLimit,
  answers,
  setCache,
  render('answers'),
);
viewRouter.get('/space/:name', unimplemented);
viewRouter.get('/space/:name/:slug', unimplemented);
viewRouter.get(
  '/:slug',
  // excludeStaticPaths,
  checkCache(answersKey),
  checkRateLimit,
  answers,
  setCache,
  render('answers'),
);
viewRouter.get('/redirect/*', redirect); // eg: /redirect/https://www.quora.com/topic/linux

export default viewRouter;
