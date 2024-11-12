// routes/toyRoutes.js
const express = require("express");
const router = express.Router();
const {
  getToys,
  createToy,
  getToyById,
} = require("../controllers/toyController");

router.get("/", getToys);
router.post("/", createToy);
router.get("/:productID", getToyById);

module.exports = router;
