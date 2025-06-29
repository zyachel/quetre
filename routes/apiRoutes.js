import express from 'express';
import { about, unimplemented, image, gone } from '../controllers/apiController.js';
import { answers, topic, profile } from '../controllers/controller.js';
import { answersKey, profileKey, topicKey } from '../utils/cacheKeys.js';
import { checkCache, checkRateLimit, setCache } from '../middlewares/middlewares.js';
import { toJson } from '../middlewares/apiMiddlewares.js';

const apiRouter = express.Router();

apiRouter.get('/search', gone);
apiRouter.get('/(|about)', about);
apiRouter.get('/image/:domain/:path', image);
apiRouter.get('/profile/:name', checkCache(profileKey), checkRateLimit, profile, setCache, toJson);
apiRouter.get('/topic/:slug', checkCache(topicKey), checkRateLimit, topic, setCache, toJson);
apiRouter.get('/unanswered/:slug', checkCache(answersKey), checkRateLimit, answers, setCache, toJson);
apiRouter.get('/space/:name', unimplemented);
apiRouter.get('/space/:name/:slug', unimplemented);
apiRouter.get('/:slug', checkCache(answersKey), checkRateLimit, answers, setCache, toJson);

export default apiRouter;
