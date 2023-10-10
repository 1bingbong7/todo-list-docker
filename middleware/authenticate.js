const jwt = require('jsonwebtoken');
const { HttpError } = require('../helpers/http_error');
const authenticate = (req, res, next) => {
  const token = (req.headers.Authorization || req.headers.authorization)?.split(' ')[1];
  if (!token) {
    throw new HttpError(HttpError.S.Unauthorized, "Token not found", "authenticate");
  }

  try {
    const decoded = jwt.verify(token, process.env.SECRET);
    if (decoded === '') {
      throw new HttpError(HttpError.S.Unauthorized, "Unauthorized Token Verification", "authenticate");
    }
    req.user = decoded;
    next();
  } catch (error) {
    next(error)
  }
};

module.exports = authenticate;
