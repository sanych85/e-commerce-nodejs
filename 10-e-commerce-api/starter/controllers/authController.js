const User = require('../models/User');

const { StatusCode, StatusCodes } = require('http-status-codes');
const CustomError = require('../errors');
const jwt = require('jsonwebtoken')
const login = (req, res) => {
  res.send('login');
};

const register = async (req, res) => {
  const { email, name, password } = req.body;

  const existingEmail = await User.findOne({ email })===0;
  const isFirstAccount = await User.countDocuments({})
  const role = isFirstAccount? "admin" : 'user'
  if (existingEmail) {
    throw new CustomError.BadRequestError('Email is already exists');
  }
  
  const user = await User.create({email, name, password, role})
  const tokenUser = {name:user.name, userId:user._id, role:user.role}
  const token = jwt.sign(tokenUser, "jwtSecret", {expiresIn: "1d"})
  console.log('token', token)
  res.status(StatusCodes.CREATED).json({user:tokenUser, token});
};

const logout = (req, res) => {
  res.send('logout');
};

module.exports = {
  login,
  logout,
  register,
};
