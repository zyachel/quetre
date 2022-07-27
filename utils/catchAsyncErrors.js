/// ////////////////////////////////////////////////////////////
//                         FUNCTION
/// ////////////////////////////////////////////////////////////
/**
 *
 * @param {function} asyncFunction  an async function whose errors need to be caught
 * @returns a function which executes all the code inside the passed asyncFunction, and passes down the errors to the express middleware, if any.
 *
 * @description an alternative to try catch blocks to handle errors in async functions
 */
const catchAsyncErrors = asyncFunction => (req, res, next) => {
  asyncFunction(req, res, next).catch(err => next(err))
}

/// ////////////////////////////////////////////////////////////
//                        EXPORTS
/// ////////////////////////////////////////////////////////////
export default catchAsyncErrors
