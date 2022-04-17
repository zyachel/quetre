import express from 'express';
import {
  about,
  unimplemented,
  unansweredQuestion,
  answeredQuestion,
} from '../controllers/apiController.js';

const apiRouter = express.Router();

apiRouter.get('/', about);
apiRouter.get('/search', unimplemented);
apiRouter.get('/profile/:name', unimplemented);
apiRouter.get('/topic/:name', unimplemented);
apiRouter.get('/unanswered/:slug', unansweredQuestion);
apiRouter.get('/:slug', answeredQuestion);

export default apiRouter;
