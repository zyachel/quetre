import express from 'express';
import {
  about,
  unimplemented,
  answers,
  topic,
  image,
  profile,
  gone,
} from '../controllers/apiController.js';

const apiRouter = express.Router();

apiRouter.get('/search', gone);
apiRouter.get('/(|about)', about);
apiRouter.get('/image/:domain/:path', image);
apiRouter.get('/profile/:name', profile);
apiRouter.get('/topic/:slug', topic);
apiRouter.get('/unanswered/:slug', answers);
apiRouter.get('/space/:name', unimplemented);
apiRouter.get('/space/:name/:slug', unimplemented);
apiRouter.get('/:slug', answers);

export default apiRouter;
