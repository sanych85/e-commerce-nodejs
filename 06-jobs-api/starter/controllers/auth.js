const User = require('../models/User');
const { StatusCodes } = require('http-status-codes');
const { BadRequestError, UnauthenticatedError } = require('../errors');
// const jwt = require('jsonwebtoken');

const register = async (req, res) => {
  // const {name, email, password}= req.body
  // if(!name || !email || !password) {
  //     throw new BadRequestError('Please provide name, email, password')
  // }

  //   const salt = await bcrypt.genSalt(10)
  //   const hashedPassword = await bcrypt.hash(password, salt)
  //   const tempUser = {name, email, password:hashedPassword}
  // все нижеуказанное перенесли в отдельный файл, используя pre в UserSchema
  const user = await User.create({ ...req.body });

  console.log(user);
  const token = user.createJWT();
  res.status(StatusCodes.CREATED).json({ user: { name: user.name }, token });
};
const login = async (req, res) => {
  const { email, password } = req.body;
  if (!email || !password) {
      throw new BadRequestError('Please provide email and password')

  }
  const user = await User.findOne({email})
  console.log("user", user)
  //compare password
  if(!user) {
      throw new UnauthenticatedError("Invalid Credentials")
  }
  const isPasswordCorrect = await user.comparePassword(password)
  console.log(isPasswordCorrect)
  if(!isPasswordCorrect) {
    throw new UnauthenticatedError("Invalid Credentials")
}

  const token  = user.createJWT()
  res.status(StatusCodes.OK).json({user: {name: user.name,}, token})
};

module.exports = {
  register,
  login,
};
