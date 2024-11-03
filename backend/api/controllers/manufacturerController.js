const Manufacturer = require("../models/Manufacturer");

exports.getManufacturers = async (req, res) => {
  try {
    const manufacturers = await Manufacturer.find({});
    res.json(manufacturers);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "An error occurred while retrieving manufacturers" });
  }
};

exports.createManufacturer = async (req, res) => {
  try {
    const manufacturer = new Manufacturer(req.body);
    const result = await manufacturer.save();
    res.status(201).json(result);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "An error occurred while adding the manufacturer" });
  }
};