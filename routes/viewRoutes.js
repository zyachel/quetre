import express from 'express';
import {
  about,
  privacy,
  answers,
  topic,
  unimplemented,
  profile,
  search,
} from '../controllers/viewController.js';

const viewRouter = express.Router();

viewRouter.get('/(|search)', search); // search on / or /search
viewRouter.get('/about', about);
viewRouter.get('/privacy', privacy);
viewRouter.get('/profile/:name', profile);
viewRouter.get('/topic/:slug', topic);
viewRouter.get('/unanswered/:slug', answers);
viewRouter.get('/:slug', answers);

export default viewRouter;
