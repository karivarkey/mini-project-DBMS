// server.js
require("dotenv").config();
const express = require("express");
const cors = require("cors");
const connectDB = require("./config/db");

const manufacturerRoutes = require("./routes/manufacturerRoutes");
const toyRoutes = require("./routes/toyRoutes");

const app = express();
app.use(cors());
app.use(express.json());

const PORT = process.env.PORT || 8000;

// Connect to MongoDB
connectDB();

// Routes
app.use("/api/manufacturer", manufacturerRoutes);
app.use("/api/toys", toyRoutes);

app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});

module.exports = app;
