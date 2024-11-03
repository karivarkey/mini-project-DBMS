// routes/manufacturerRoutes.js
const express = require("express");
const router = express.Router();
const { getManufacturers, createManufacturer } = require("../controllers/manufacturerController");

router.get("/", getManufacturers);
router.post("/", createManufacturer);

module.exports = router;
