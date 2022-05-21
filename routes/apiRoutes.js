import express from 'express';
import { about, unimplemented, answers } from '../controllers/apiController.js';

const apiRouter = express.Router();

apiRouter.get('/', about);
apiRouter.get('/search', unimplemented);
apiRouter.get('/profile/:name', unimplemented);
apiRouter.get('/topic/:name', unimplemented);
apiRouter.get('/unanswered/:slug', answers);
apiRouter.get('/:slug', answers);

export default apiRouter;
