import express from 'express';
import {
  about,
  privacy,
  answers,
  topic,
  unimplemented,
  profile,
  gone,
  redirect,
} from '../controllers/viewController.js';

const viewRouter = express.Router();

viewRouter.get('/search', gone); 
viewRouter.get('/(|about)', about);
viewRouter.get('/privacy', privacy);
viewRouter.get('/profile/:name', profile);
viewRouter.get('/topic/:slug', topic);
viewRouter.get('/unanswered/:slug', answers);
viewRouter.get('/space/:name', unimplemented);
viewRouter.get('/space/:name/:slug', unimplemented);
viewRouter.get('/:slug', answers);
viewRouter.get('/redirect/*', redirect); // eg: /redirect/https://www.quora.com/topic/linux

export default viewRouter;
