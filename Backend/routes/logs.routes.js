const express = require("express");
const router = express.Router();
const { getSummary, getLogs, exportLogs } = require("../controllers/logController");

// Summary route
router.get("/summary", getSummary);

// Paginated logs
router.get("/", getLogs);

// Export all logs
router.get("/export", exportLogs);

module.exports = router;
