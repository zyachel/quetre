/**
 * @type {import("express").RequestHandler}
 */
export const toJson = (_req, res, _next) => {
  const { data } = res.locals;
  res.locals = {};

  res.status(200).json({
    status: 'success',
    data,
  });
};
