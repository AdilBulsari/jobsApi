const express = require("express");
const { register, login } = require("../controllers/auth.controller");
const router = express.Router();

router.post(login);
router.post(register);

module.exports = router;
