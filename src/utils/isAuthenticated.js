require('dotenv/config');
const db = require('../models');
const User = db.rest.models.user;

export const gender = async (req, res, next) => {

  const { gender } = req.query;

  const user = await User.findOne({
    where: {
      gender,
    },
  });

  if (user) {
    return next();
  } else {
    return res.status(200).send({

    });
  }

};
