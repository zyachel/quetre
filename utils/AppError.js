/**
 * @param {string} message error message to display
 * @param {number} statusCode status code to send(defaults to 500)
 * @description custom error class to handle operational errors
 */
const AppError = class extends Error {
  constructor(message, statusCode = 500) {
    super(message);
    this.statusCode = statusCode;
    this.status = `${statusCode}`.startsWith('4') ? 'fail' : 'error';
    // adding custom name to distinguish operational errors(errors that we know will occur and will handle them accordingly) from non-operational errors.
    this.name = 'OperationalError';
    // `this.constructor` just points back to AppError
    Error.captureStackTrace(this, this.constructor);
  }
};

export default AppError;
