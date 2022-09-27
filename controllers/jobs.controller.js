const Job = require("../models/Job.model");
const { StatusCodes } = require("http-status-codes");
const { BadRequestError, NotFoundError } = require("../errors/");

exports.getJob = async (req, res) => {};

exports.getAllJob = async (req, res) => {
  console.log(req.user);
  const jobs = await Job.find({ createdBy: req.user.userId }).sort("createdAt");

  res.status(StatusCodes.OK).json({ jobs, count: jobs.length });
};

exports.createJob = async (req, res) => {
  req.body.createdBy = req.user.userId;
  const job = await Job.create(req.body);
  res.status(StatusCodes.CREATED).json({ job });
};

exports.updateJob = async (req, res) => {
  res.send("Update jobs");
};

exports.deleteJob = async (req, res) => {
  res.send("Delete jobs");
};
