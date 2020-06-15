const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

const User = require('../models/user');

/**
 * Async method to connect a User
 * First check that the user exist
 * Uncrypt and compare the password
 * Create a new token with user data, the JWT key, and the delay before his connexion expires
 *
 * @returns {json{message<string> || message<string>, token, expiresIn<number>, userId<string>}}
 */
exports.login = async (req, res) => {
  try {
    const user = await User.findOne({
      email: req.body.email
    });

    console.log(user);

    if(!user) {
      return res.status(401).json({
          message: 'Auth failed'
      });
    }

    const result = await bcrypt.compare(req.body.password, user.password);

    if (!result) {
      return res.status(401).json({
          message: 'Auth failed'
      });
    }

    const {password, ...formatedUser} = user._doc;

    const token = jwtSign({ email: formatedUser.email, userId: formatedUser._id });

    res.status(200).json({
      token: token,
      expiresIn: 3600,
      user: formatedUser
    });
  } catch (e) {
    res.status(401).json({
      message: 'Unknown error', e: e
    });
  }
};

exports.autoLogin = async (req, res) => {
  try {
    const user = await User.findOne({
      email: req.body.email
    });

    if(!user) {
      return res.status(401).json({
          message: 'Auth failed'
      });
    }

    const {password, ...formatedUser} = user._doc;

    const token = jwtSign({ email: formatedUser.email, userId: formatedUser._id });

    res.status(200).json({
      token: token,
      expiresIn: 3600,
      user: formatedUser
    });
  } catch (e) {
    res.status(401).json({
      message: 'Unknown error', e: e
    });
  }
}

/**
 * Create a new token of connexion for the identified user
 */
jwtSign = ({ email, userId }) => {
    return jwt.sign(
      { email: email, userId: userId },
      process.env.JWT_KEY,
      { expiresIn: '1h' },
    );
  };

