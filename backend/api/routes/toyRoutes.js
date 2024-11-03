// routes/toyRoutes.js
const express = require("express");
const router = express.Router();
const { getToys, createToy } = require("../controllers/toyController");

router.get("/", getToys);
router.post("/", createToy);

module.exports = router;
