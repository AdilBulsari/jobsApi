const { StatusCodes } = require("http-status-codes");
const BadRequestError = require("../errors/bad-request");
const UnauthenticatedError = require("../errors/unauthenticated");
const UserModelSchema = require("../models/User.model");

exports.register = async (req, res) => {
  const user = await UserModelSchema.create({
    ...req.body,
  });

  const token = user.createJWT();
  console.log(token);
  res.status(StatusCodes.CREATED).json({ user: { name: user.name }, token });
};

exports.login = async (req, res) => {
  const { email, password } = req.body;

  if (!email || !password) {
    throw new BadRequestError("Please enter valid details");
  }

  const user = await UserModelSchema.findOne({ email });

  if (!user) {
    throw new UnauthenticatedError("Invalid Credentials");
  }
  const isPasswordCorrect = await user.checkPassword(password);

  if (!isPasswordCorrect) {
    throw new UnauthenticatedError("Invalid credentials");
  }

  const token = user.createJWT();
  res.status(StatusCodes.OK).json({
    user: { name: user.name },
    token,
  });
};
