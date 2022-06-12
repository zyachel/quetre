////////////////////////////////////////////////////////
//                      IMPORTS
////////////////////////////////////////////////////////
import express from 'express';
import morgan from 'morgan';
import helmet from 'helmet';
import compression from 'compression';
import { fileURLToPath } from 'url';
import viewRouter from './routes/viewRoutes.js';
import apiRouter from './routes/apiRoutes.js';
import globalErrorHandler from './controllers/errorController.js';
import AppError from './utils/AppError.js';

////////////////////////////////////////////////////////
//            CREATING AND CONFIGURING APP
////////////////////////////////////////////////////////
const app = express();

app.set('view engine', 'pug');
const pathToViews = fileURLToPath(new URL('./views/pug', import.meta.url));
app.set('views', pathToViews);
const pathToPublicDirectory = fileURLToPath(
  new URL('./public', import.meta.url)
);
app.use(
  express.static(pathToPublicDirectory, {
    maxAge: process.env.CACHE_PERIOD || '1h',
  })
);

////////////////////////////////////////////////////////
//                   MIDDLEWARES
////////////////////////////////////////////////////////
app.use(compression()); // compressing responses
app.use(
  helmet({
    contentSecurityPolicy: {
      directives: {
        'img-src': ["'self'", '*.quoracdn.net'],
        'script-src': ["'self'", 'cdn.jsdelivr.net'],
      },
    },
    crossOriginEmbedderPolicy: false,
  })
); // using sane headers on response
if (process.env.NODE_ENV === 'development') app.use(morgan('dev')); // for logging during development

// middleware to add baseUrl to req object
app.use((req, res, next) => {
  req.urlObj = new URL(
    `${req.protocol}://${req.get('host')}${req.originalUrl}`
  );
  next();
});

// main middlewares to handle routes
app.use('/', viewRouter);
app.use('/api/v1/', apiRouter);

////////////////////////////////////////////////////////
//                 HANDLING ERRORS
////////////////////////////////////////////////////////
// for all other routes, throwing error
app.all('*', (req, res, next) => {
  next(new AppError(`this route(${req.originalUrl}) doesn't exist`, 404));
});

app.use(globalErrorHandler);

////////////////////////////////////////////////////////
//                      EXPORTS
////////////////////////////////////////////////////////
export default app;
