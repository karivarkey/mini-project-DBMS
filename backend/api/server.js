// server.js
require("dotenv").config();
const express = require("express");
const cors = require("cors");
const initializeServices = require("./config/db");

const manufacturerRoutes = require("./routes/manufacturerRoutes");
const toyRoutes = require("./routes/toyRoutes");
const orderRoutes = require("./routes/orderRoutes");
const homeRoutes = require("./routes/homeRoute");
const imageRoutes = require("./routes/imageRoute");
const app = express();
app.use(cors());
app.use(express.json());

const PORT = process.env.PORT || 8000;

// Connect to MongoDB
initializeServices();

// Routes
app.use("/api/manufacturer", manufacturerRoutes);
app.use("/api/toys", toyRoutes);
app.use("/api/orders", orderRoutes);
app.use("/api/home", homeRoutes);
app.use("/api/image",imageRoutes);

app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});

module.exports = app;
