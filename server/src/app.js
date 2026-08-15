const express = require("express");
const cors = require("cors");

const ticketRoutes = require("./routes/ticketRoutes");
const errorHandler = require("./middleware/errorHandler");

const app = express();

app.use(
  cors({
    origin: process.env.CLIENT_URL || "http://localhost:5173"
  })
);

app.use(express.json());

app.get("/api/health", (req, res) => {
  res.json({
    message: "Support CRM API is running"
  });
});

app.use("/api/tickets", ticketRoutes);

app.use(errorHandler);

module.exports = app;