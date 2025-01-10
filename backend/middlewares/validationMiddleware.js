
const { check, validationResult } = require('express-validator');

// Middleware for validation errors
 const validate = (validations) => async (req, res, next) => {
    await Promise.all(validations.map((validation) => validation.run(req)));
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    next();
  };

  module.exports = validate