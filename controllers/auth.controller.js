const { StatusCodes } = require("http-status-codes");
const UserModelSchema = require("../models/User.model");
const jwt = require("jsonwebtoken");

exports.register = async (req, res) => {
  const user = await UserModelSchema.create({
    ...req.body,
  });

  const token = user.createJWT();
  console.log(token);
  res.status(StatusCodes.CREATED).json({ user: { name: user.name }, token });
};

exports.login = async (req, res) => {
  res.send("Login user");
};
