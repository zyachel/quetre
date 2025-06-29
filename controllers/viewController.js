/** @type {import("express").RequestHandler} */
export const about = (req, res, _next) => {
  res.render('about', {
    meta: {
      title: 'About',
      url: req.urlObj,
      imageUrl: `${req.urlObj.origin}/icon.svg`,
      description:
        'Quetre is a libre front-end for Quora. See any answer without being tracked, without being required to log in, and without being bombarded by pesky ads.',
    },
  });
};

/** @type {import("express").RequestHandler} */
export const privacy = (req, res, _next) => {
  res.render('privacy', {
    meta: {
      title: 'Privacy',
      url: req.urlObj,
      imageUrl: `${req.urlObj.origin}/icon.svg`,
      description: 'Privacy Policy of Quetre, a libre front-end for Quora.',
    },
  });
};

/** @type {import("express").RequestHandler} */
export const unimplemented = (req, res, _next) => {
  const data = {
    message: "This route isn't yet implemented. Check back sometime later!",
    statusCode: 501,
  };

  res.status(data.statusCode).render('error', {
    data,
    meta: {
      title: 'Not yet implemented',
      url: req.urlObj,
      imageUrl: `${req.urlObj.origin}/icon.svg`,
      description: data.message,
    },
  });
};

/** @type {import("express").RequestHandler} */
export const gone = (req, res, _next) => {
  const data = {
    message: "This route doesn't exist anymore.",
    statusCode: 410,
  };

  res.status(data.statusCode).render('error', {
    data,
    meta: {
      title: 'Gone',
      url: req.urlObj,
      imageUrl: `${req.urlObj.origin}/icon.svg`,
      description: data.message,
    },
  });
};
