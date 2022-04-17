import express from 'express';
import {
  about,
  answeredQuestion,
  privacy,
  unansweredQuestion,
  unimplemented,
} from '../controllers/viewController.js';

const viewRouter = express.Router();

viewRouter.get('/', about);
viewRouter.get('/privacy', privacy);
viewRouter.get('/search', unimplemented);
viewRouter.get('/profile/:name', unimplemented);
viewRouter.get('/topic/:name', unimplemented);
viewRouter.get('/unanswered/:slug', unansweredQuestion);
viewRouter.get('/:slug', answeredQuestion);

export default viewRouter;
