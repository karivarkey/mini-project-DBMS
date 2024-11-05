// models/Toy.js
const mongoose = require("mongoose");

const ToySchema = new mongoose.Schema({
  productName: {
    type: String,
    required: true,
  },
  manufacturer: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Manufacturer",
    required: true,
  },
  price: {
    type: Number,
    required: true,
    min: 0.01,
  },
  category: {
    type: Object,
    required: true,
  },
  ageGroup: {
    type: [Number],
    validate: {
      validator: function (v) {
        return v.length === 2 && v[0] < v[1];
      },
      message:
        "Age group should be an array with two numbers: [lowerLimit, upperLimit]",
    },
    required: true,
  },
  stockLeft: {
    type: Number,
    default: 0,
  },
  popularity: {
    type: {
      views: {
        type: Number,
        default: 0,
      },
      purchases: {
        type: Number,
        default: 0,
      },
    },
    default: 0,
  },
});
ToySchema.index({ productName: 1, manufacturer: 1 }, { unique: true });

// Check if the model already exists to avoid duplicate model registration
module.exports = mongoose.models.Toy || mongoose.model("Toy", ToySchema);
