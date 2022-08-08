import express from 'express';
import {
  about,
  unimplemented,
  answers,
  topic,
  image,
  profile,
} from '../controllers/apiController.js';

const apiRouter = express.Router();

apiRouter.get('/', about);
apiRouter.get('/search', unimplemented);
apiRouter.get('/image/:domain/:path', image);
apiRouter.get('/profile/:name', profile);
apiRouter.get('/topic/:slug', topic);
apiRouter.get('/unanswered/:slug', answers);
apiRouter.get('/:slug', answers);

export default apiRouter;
