// models/Toy.js
const mongoose = require('mongoose');

// Define the Toy schema
const toySchema = new mongoose.Schema({
  productName: { type: String, required: true },
  manufacturer: {
    name: { type: String, required: true },
    address: { type: String, default: '' },
  },
  price: { type: Number, required: true },
  category: {
    mainCategory: { type: String, required: true },
    subCategory: { type: String, default: '' },
  },
  ageGroup: {
    type: [Number],
    validate: {
      validator: function (v) {
        return v.length === 2;
      },
      message: 'Age group must have exactly two numbers [lowerLimit, upperLimit].',
    },
    required: true,
  },
  stockLeft: { type: Number, required: true },
});

// Export the Toy model
module.exports = mongoose.model('Toy', toySchema);
