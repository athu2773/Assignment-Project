// index.js
const express = require("express");
const cors = require("cors");
const helmet = require("helmet");
const morgan = require("morgan");
const compression = require("compression");

const { connectDB } = require("./db");
const { PORT } = require("./config");
const logsRoutes = require("./routes/logs.routes");
const { seedHRLogs } = require("./controllers/logs.controller");

const app = express();

// Middlewares
app.use(cors());
app.use(helmet());
app.use(morgan("dev"));
app.use(compression());
app.use(express.json({ limit: "10mb" }));

// Routes
app.use("/api/logs", logsRoutes);

// Start Server
connectDB().then(async () => {
  await seedHRLogs();
  app.listen(PORT, () => {
    console.log(`🚀 Server running on port ${PORT}`);
  });
});
