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
    const {
      productName,
      manufacturer,
      price,
      category,
      ageGroup,
      stockLeft,
      description,
    } = req.body;

    // Check if the manufacturer exists
    const existingManufacturer = await Manufacturer.findById(manufacturer);
    if (!existingManufacturer) {
      return res.status(400).json({ error: "Manufacturer not found" });
    }

    // Create a new toy document with default popularity
    const newToy = new Toy({
      productName,
      manufacturer,
      price,
      category,
      ageGroup,
      stockLeft,
      popularity: {
        views: 0,
        purchases: 0,
      },
      description,
    });

    // Save the toy document to the database
    await newToy.save();

    res.status(201).json(newToy);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "An error occurred while adding the toy" });
  }
};

exports.getToyById = async (req, res) => {
  try {
    const { productID } = req.params;

    // Find the toy by its productID and populate the manufacturer details
    const toy = await Toy.findById(productID).populate("manufacturer", "name");

    // If the toy is not found, return a 404 error
    if (!toy) {
      return res.status(404).json({ error: "Toy not found" });
    }

    res.json(toy);
  } catch (error) {
    console.error(error);
    res
      .status(500)
      .json({ error: "An error occurred while retrieving the toy" });
  }
};
