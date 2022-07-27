const express = require("express");
const { getRuns, startRun } = require("./runs");
const { getSuites } = require("./suites");

const router = express.Router();

router.get("/runs", getRuns);
router.post("/runs", startRun);
router.get("/suites", getSuites);

module.exports = {
  router,
};