// models/Order.js
const mongoose = require("mongoose");

const OrderSchema = new mongoose.Schema({
  userId: {
    type:String,
    required: true
  },
  products: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: "Toy",
    required: true
  }],
  price: {
    individualPrices: {
      type: [Number], // Array of individual prices for each product
      required: true
    },
    shipping: {
      type: Number,
      required: true,
      min: 0
    },
    total: {
      type: Number,
      required: true,
      min: 0,
      // Automatically calculate total based on individualPrices and shipping
      default: function() {
        const individualTotal = this.price.individualPrices.reduce((acc, curr) => acc + curr, 0);
        return individualTotal + this.price.shipping;
      }
    }
  },
  address: {
    street: { type: String, required: true },
    city: { type: String, required: true },
    state: { type: String, required: true },
    zip: { type: String, required: true },
    country: { type: String, required: true }
  },
  ETA: {
    type: Date,
    required: true,
    default: Date.now
  }
});

// Pre-save hook to calculate `total` price
OrderSchema.pre("save", function(next) {
  if (!this.price.total) {
    const individualTotal = this.price.individualPrices.reduce((acc, curr) => acc + curr, 0);
    this.price.total = individualTotal + this.price.shipping;
  }
  next();
});

module.exports = mongoose.model("Order", OrderSchema);
