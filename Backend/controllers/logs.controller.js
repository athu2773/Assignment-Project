const InterfaceLog = require("../models/InterfaceLog");
const { buildFilters } = require("../utils/filters");

const HR_INTERFACES = [
  "Employee Master Sync",
  "Payroll Data Transfer",
  "Leave Balance Update",
  "Attendance Record Sync",
  "Benefit Enrollment Update",
  "Job Requisition Sync",
  "Performance Review Upload",
  "Training Completion Update"
];

const HR_MESSAGES = [
  "Successfully processed employee records",
  "Payroll data exported to SAP ECP",
  "Leave balances updated successfully",
  "Attendance data synced from biometric device",
  "Benefit enrollment records updated",
  "Job requisition posted to external system",
  "Performance review data uploaded",
  "Training completion data synced"
];

const SEVERITY_LEVELS = ["LOW", "MEDIUM", "HIGH"];

// 🌱 Seed HR logs
async function seedHRLogs() {
  const count = await InterfaceLog.estimatedDocumentCount();
  if (count > 0) {
    console.log("ℹ️ Logs already exist, skipping seed...");
    return;
  }

  let logs = [];
  for (let i = 0; i < 5000; i++) {
    const idx = Math.floor(Math.random() * HR_INTERFACES.length);
    logs.push({
      interfaceName: HR_INTERFACES[idx],
      integrationKey: `HR-${Math.random().toString(36).substring(2, 8).toUpperCase()}`,
      status: Math.random() > 0.15 ? "SUCCESS" : "FAILURE",
      severity: SEVERITY_LEVELS[Math.floor(Math.random() * SEVERITY_LEVELS.length)],
      message: HR_MESSAGES[idx],
      timestamp: new Date(Date.now() - Math.random() * 1000 * 60 * 60 * 24 * 30)
    });
  }

  await InterfaceLog.insertMany(logs, { ordered: false });
  console.log(`✅ Seeded ${logs.length} HR logs`);
}

// 📊 Summary endpoint
async function getSummary(req, res) {
  try {
    const filters = buildFilters(req.query);
    const summary = await InterfaceLog.aggregate([
      { $match: filters },
      { $group: { _id: "$status", count: { $sum: 1 } } }
    ]);
    res.json(summary);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
}

// 📜 Paginated logs
async function getLogs(req, res) {
  try {
    const { page = 1, limit = 50, sort = "-timestamp" } = req.query;
    const filters = buildFilters(req.query);

    const logs = await InterfaceLog.find(filters)
      .sort(sort.replace("-", "-"))
      .skip((page - 1) * limit)
      .limit(parseInt(limit))
      .lean();

    const total = await InterfaceLog.countDocuments(filters);

    res.json({ logs, total, page: Number(page), limit: Number(limit) });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
}

// 📤 Export logs
async function exportLogs(req, res) {
  try {
    const filters = buildFilters(req.query);
    const logs = await InterfaceLog.find(filters).lean();
    res.json(logs);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
}

module.exports = { seedHRLogs, getSummary, getLogs, exportLogs };
