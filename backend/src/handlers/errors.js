const catchErrors = fn => (req, res, next) => fn(req, res, next).catch(next);

const notFound = (req, res, next) => {
  const err = new Error('Not Found');
  err.status = 404;
  next(err);
};

const forbidden = (req, res, next, msg) => {
  res.status(403).json({
    error: msg,
  });
};

export { catchErrors, notFound, forbidden };
