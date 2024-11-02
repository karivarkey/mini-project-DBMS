require("dotenv").config();
const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const ManufacturerSchema = require("./models/manufacturer");


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


app.get("/api/manufacturer", async (request, response) => {
    const manufacturers = await ManufacturerSchema.find({});
    response.json(manufacturers);
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
