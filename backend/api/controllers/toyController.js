// controllers/toyController.js
const Toy = require("../models/Toy");
const Manufacturer = require("../models/Manufacturer");

exports.getToys = async (req, res) => {
  try {
    const toys = await Toy.find().populate("manufacturer", "name");
    res.json(toys);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "An error occurred while retrieving toys" });
  }
};

exports.createToy = async (req, res) => {
  try {
    const { productID, productName, manufacturer, price, category, ageGroup, stockLeft } = req.body;

    // Check if the manufacturer exists
    const existingManufacturer = await Manufacturer.findById(manufacturer);
    if (!existingManufacturer) {
      return res.status(400).json({ error: "Manufacturer not found" });
    }

    // Create a new toy document
    const newToy = new Toy({ productID, productName, manufacturer, price, category, ageGroup, stockLeft });

    // Save the toy document to the database
    await newToy.save();

    res.status(201).json(newToy);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "An error occurred while adding the toy" });
  }
};