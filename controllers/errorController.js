/* eslint-disable no-param-reassign */

////////////////////////////////////////////////////////
//                      IMPORTS
////////////////////////////////////////////////////////
import log from '../utils/log.js';

////////////////////////////////////////////////////////
//                    FUNCTIONS
////////////////////////////////////////////////////////
/**
 * @description function to send error responses to the client
 * @param {{}} err error object
 * @param {{}} req request object provided by express
 * @param {{}} res response object provided by express
 * @param {boolean} devMode if set to true, will send full stack trace to the client
 */
const sendErrorResponse = (err, req, res, devMode = false) => {
  // 1. FOR API
  if (req.originalUrl.startsWith('/api/'))
    res.status(err.statusCode).json({
      status: err.status,
      message: err.message,
      // only if devMode is true, will this stack trace get sent. using es6 spreading and short circuiting
      ...(devMode && { stack: err.stack }),
    });
  // 2. FOR WEBPAGES
  else
    res.status(err.statusCode).render('error', {
      title: 'Error',
      statusCode: err.statusCode,
      message: err.message,
      ...(devMode && { stack: err.stack }),
    });
};

/**
 * @description function to handle all errors occuring in the app
 * @param {{}} err object containing full error
 * @param {{}} req request object in express
 * @param {{}} res response object in express
 * @param {function} next function to call next middleware in express
 */

const globalErrorHandler = (err, req, res, next) => {
  // since not all errors will be an instance of AppError class(as not errors will be manually thrown by us), we have to set sensible defaults before dealing with those errors
  err.statusCode = err.statusCode || 500;
  err.status = err.status || 'error';
  log(err, 'error');

  if (process.env.NODE_ENV === 'development')
    sendErrorResponse(err, req, res, true);
  else {
    // if error is not operational, sending a generic error message and not revealing full details in production mode
    if (err.name !== 'OperationalError') err.message = 'something went wrong!';
    sendErrorResponse(err, req, res);
  }
};

////////////////////////////////////////////////////////
//                     EXPORTS
////////////////////////////////////////////////////////
export default globalErrorHandler;
