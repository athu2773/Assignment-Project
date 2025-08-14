const mongoose = require("mongoose");

const interfaceLogSchema = new mongoose.Schema({
  interfaceName: { type: String, required: true, index: true },
  integrationKey: { type: String, required: true, index: true },
  status: { type: String, enum: ["SUCCESS", "FAILURE"], required: true, index: true },
  severity: { type: String, enum: ["LOW", "MEDIUM", "HIGH"], default: "LOW", index: true },
  message: { type: String },
  timestamp: { type: Date, default: Date.now, index: true }
}, { versionKey: false });

interfaceLogSchema.index({ timestamp: -1 });

module.exports = mongoose.model("InterfaceLog", interfaceLogSchema);
