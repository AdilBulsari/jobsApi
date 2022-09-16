const { StatusCodes } = require("http-status-codes");
const UserModelSchema = require("../models/User.model");

exports.register = async (req, res) => {
  const user = await UserModelSchema.create({
    ...req.body,
  });

  console.log(user);

  res.status(StatusCodes.CREATED).json(user);
};

exports.login = async (req, res) => {
  res.send("Login user");
};
