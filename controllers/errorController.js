import env from '../utils/env.js';
import log from '../utils/log.js';

/**
 * @param {Parameters<ErrorRequestHandler>['0']} err
 * @param {Parameters<ErrorRequestHandler>['1']} req
 * @param {Parameters<ErrorRequestHandler>['2']} res
 * @param {boolean} devMode
 */
const sendErrorResponse = (err, req, res, devMode = false) => {
  // 1. FOR API
  if (req.originalUrl.startsWith('/api/'))
    res.status(err.statusCode).json({
      status: err.status,
      message: err.message,
      // only if devMode is true, will this stack trace get sent
      ...(devMode && { stack: err.stack }),
    });
  // 2. FOR WEBPAGES
  else
    res.status(err.statusCode).render('error', {
      data: {
        statusCode: err.statusCode,
        message: err.message,
        ...(devMode && { stack: err.stack }),
      },
      meta: {
        title: 'Error',
        url: req.urlObj,
        imageUrl: `${req.urlObj.origin}/icon.svg`,
        description: `ERROR: ${err.message}. Please try again later.`,
      },
    });
};

/**
 * @import { type ErrorRequestHandler } from "express";
 * @description function to handle all errors occurring in the app
 * @type {ErrorRequestHandler} 
 */
const globalErrorHandler = (err, req, res, _next) => {
  // since not all errors will be an instance of AppError class(as not errors will be manually thrown by us), we have to set sensible defaults before dealing with those errors
  err.statusCode = err.statusCode || 500;
  err.status = err.status || 'error';
  log(err, 'error');

  if (env.NODE_ENV === 'development') {
    sendErrorResponse(err, req, res, true);
  } else {
    // if error is not operational, sending a generic error message and not revealing full details in production mode
    if (err.name !== 'OperationalError') err.message = 'something went wrong!';
    sendErrorResponse(err, req, res);
  }
};

export default globalErrorHandler;
