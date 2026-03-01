export const bodyValidator = (dataValidator) => {
  return (req, res, next) => {
    const { data, success, error } = dataValidator.safeParse(req.body);

    if (!success) {
      const { fieldErrors } = error.flatten();

      res.status(400).json({
        errors: fieldErrors,
      });
    } else {
      req.data = data;
      next();
    }
  };
};

export const queryValidator = (dataValidator) => {
  return (req, res, next) => {
    const { data, success, error } = dataValidator.safeParse(req.query);
    req.validatedQuery = data;
    next();
  };
};
