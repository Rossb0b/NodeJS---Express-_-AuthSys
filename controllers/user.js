const bcrypt = require('bcryptjs');
const User = require('../models/user');

/**
 * Async method to create a new User
 * Init the user send by the request and a result response
 * Hash the user password
 * Save the user in DB and the response into result
 * Declare formatedUser as a User without _id and password
 * push the formatedUser into the body and call next
 *
 * @returns {json{message<string>, next() if success}}
 */
exports.createUser = async (req, res, next) => {

  let user = new User(req.body);
  let result;

  try {
    user.password = await hashPassword(req.body.password);
    result = await user.save();

    const {_id, password, ...formatedUser} = result._doc;
    req.body = formatedUser;
    
    next();
  } catch (e) {
    res.status(500).json({
      message: 'Creation failed', e: e
    });
  }
};

/**
 * Encrypt the password
 */
hashPassword = (password) => {
  return bcrypt.hash(password, 10);
};

/**
 * Async method that find the user._id for the given user.email
 *
 * @returns {json{user.id<id>}}
 */
exports.getUserFromJWT = async (req, res) => {

  let user;

  try {
    user = await User.findById(req.userData.userId);
  } catch (e) {
    return res.status(401).json({
      message: 'Fetching user failed', e: e
    });
  }
  
  const {password, ...formatedUser} = user._doc;

  res.status(200).json(formatedUser);
};