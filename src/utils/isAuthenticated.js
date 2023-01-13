const jwt = require('jsonwebtoken');
module.exports = (req, res, next) => {
  const authHeader = req.headers.authorization;
  if (!authHeader) {
    res.status(401).json({
      status: 'fail',
      message: 'Unauthorized!',
    });
  }
  const tokenPayLoad = authHeader.split(' ')[1];
  try {
    const user = jwt.verify(tokenPayLoad, process.env.TOKEN_KEY,
      {
        expiresIn: "2h",
      });
    req.user = user;
    next();
  } catch (error) {
    res.status(401).json({
      status: 'fail',
      message: 'Unauthorized!',
    });
  }
};