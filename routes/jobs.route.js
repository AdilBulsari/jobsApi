const express = require("express");
const {
  createJob,
  getAllJob,
  getJob,
  deleteJob,
  updateJob,
} = require("../controllers/jobs.controller");
const router = express.Router();

router.route("/").post(createJob).get(getAllJob);
router.route("/:id").get(getJob).delete(deleteJob).patch(updateJob);

module.exports = router;
