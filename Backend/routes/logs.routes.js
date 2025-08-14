const express = require("express");
const { getSummary, getLogs, exportLogs } = require("../controllers/logs.controller");

const router = express.Router();

router.get("/summary", getSummary);
router.get("/", getLogs);
router.get("/export", exportLogs);

module.exports = router;
