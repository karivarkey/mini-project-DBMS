require("dotenv").config();
const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");


const ManufacturerSchema = require("./models/Manufacturer.js");
const ToySchema = require("./models/Toy");
const Manufacturer = mongoose.model("Manufacturer", ManufacturerSchema);
const Toy = mongoose.model("Toy", ToySchema);

const app = express();
app.use(cors());
app.use(express.json()); 



const PORT = process.env.PORT || 8000;
const MONGO_URI = process.env.MONGO_URI;

mongoose
  .connect(MONGO_URI)
  .then(() => console.log("Connected to MongoDB"))
  .catch((error) =>
    console.error("Error connecting to MongoDB:", error.message)
  );


  app.post('/api/toys', async (req, res) => {
    try {
      const { productID, productName, manufacturer, price, category, ageGroup, stockLeft } = req.body;

      // Check if the manufacturer exists
      const existingManufacturer = await Manufacturer.findById(manufacturer);
      if (!existingManufacturer) {
          return res.status(400).json({ error: 'Manufacturer not found' });
      }

      // Create a new toy
      const newToy = new Toy({
          productID,
          productName,
          manufacturer,
          price,
          category,
          ageGroup,
          stockLeft
      });

      // Save the toy to the database
      await newToy.save();

      return res.status(201).json(newToy);
  } catch (error) {
      console.error(error);
      return res.status(500).json({ error: 'An error occurred while adding the toy' });
  }
});

app.get('/api/toys', async (req, res) => {
  try {
      const toys = await Toy.find().populate('manufacturer', 'manufacturerName');
      return res.json(toys);
  } catch (error) {
      console.error(error);
      return res.status(500).json({ error: 'An error occurred while retrieving toys' });
  }
});






app.get("/api/manufacturer", async (request, response) => {
    const manufacturersList = await Manufacturer.find({});
    response.json(manufacturersList);
  });


  app.post("/api/manufacturer",async  (request, response) => {
    
    
    const manufacturer = new ManufacturerSchema(request.body);
    manufacturer.save().then((result) => {
      response.status(201).send(result);
    });
  });






// Start the server
app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});

module.exports = app;
