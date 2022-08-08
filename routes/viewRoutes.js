import express from 'express';
import {
  about,
  privacy,
  answers,
  topic,
  unimplemented,
  profile,
} from '../controllers/viewController.js';

const viewRouter = express.Router();

viewRouter.get('/', about);
viewRouter.get('/privacy', privacy);
viewRouter.get('/search', unimplemented);
viewRouter.get('/profile/:name', profile);
viewRouter.get('/topic/:slug', topic);
viewRouter.get('/unanswered/:slug', answers);
viewRouter.get('/:slug', answers);

export default viewRouter;
