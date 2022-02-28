const User = require('../models/User');

const { StatusCode, StatusCodes } = require('http-status-codes');
const CustomError = require('../errors');
const { attachCookiesToResponse } = require('../utils');

const login = async (req, res) => {
  const { email, password } = req.body;
  if (!email || !password) {
    throw new CustomError.BadRequestError('Please provide email and password');
  }
  const user = await User.findOne({ email });
  if (!user) {
    throw new CustomError.UnauthenticatedError('user not found');
  }
  const isPasswordCorrect = await user.comparePassword(password)
  if(!isPasswordCorrect) {
    throw new CustomError.UnauthenticatedError('Invalid credentials')
  }
  const tokenUser = { name: user.name, userId: user._id, role: user.role };
  attachCookiesToResponse({ res, user: tokenUser });

  res.status(StatusCodes.CREATED).json({user:tokenUser});
};

const register = async (req, res) => {
  const { email, name, password } = req.body;

  const existingEmail = (await User.findOne({ email })) === 0;
  if (existingEmail) {
    throw new CustomError.BadRequestError('Email is already exists');
  }


   // first registered user is an admin
   const isFirstAccount = (await User.countDocuments({})) === 0;
   const role = isFirstAccount ? 'admin' : 'user';


  const user = await User.create({ email, name, password, role });
  const tokenUser = { name: user.name, userId: user._id, role: user.role };
  attachCookiesToResponse({ res, user: tokenUser });

  
};

const logout = async(req, res) => {
  res.cookie('token', 'logout', {
    httpOnly: true,
    expires: new Date(Date.now()+5*1000)
  })
  res.status(StatusCodes.OK).json({msg:"user logged out"})
  
};

module.exports = {
  login,
  logout,
  register,
};
