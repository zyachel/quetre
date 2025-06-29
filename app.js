import express from 'express';
import morgan from 'morgan';
import helmet from 'helmet';
import compression from 'compression';
import { fileURLToPath } from 'url';
import viewRouter from './routes/viewRoutes.js';
import apiRouter from './routes/apiRoutes.js';
import globalErrorHandler from './controllers/errorController.js';
import AppError from './utils/AppError.js';
import { formatReq } from './middlewares/middlewares.js';
import env from './utils/env.js';

const app = express();

app.use(compression());
app.use(
  helmet({
    contentSecurityPolicy: {
      directives: {
        'block-all-mixed-content': null, // deprecated.
        'upgrade-insecure-requests': env.NO_UPGRADE ? null : [],
      },
    },
    crossOriginEmbedderPolicy: false,
  })
); // using sane headers on response

app.set('view engine', 'pug');
const pathToViews = fileURLToPath(
  new URL('./views/pug/pages', import.meta.url)
);
app.set('views', pathToViews);
const pathToPublicDirectory = fileURLToPath(
  new URL('./public', import.meta.url)
);
app.use(
  express.static(pathToPublicDirectory, {
    maxAge: env.CACHE_PERIOD,
  })
);
if (env.NODE_ENV === 'development') app.use(morgan('dev'));

app.use(formatReq);

app.use('/', viewRouter);
app.use('/api/v1/', apiRouter);
// for all other routes, throwing error
app.all('*', (req, _res, next) => {
  next(new AppError(`this route(${req.originalUrl}) doesn't exist`, 404));
});

app.use(globalErrorHandler);

export default app;
