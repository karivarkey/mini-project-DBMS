// models/ProductImage.js
const mongoose = require('mongoose');

const ProductImageSchema = new mongoose.Schema({
  productID: { type: mongoose.Schema.Types.ObjectId, ref: 'Toy', required: true },
  images: [{
    url: { type: String, required: true },
    publicID: { type: String, required: true },
  }],
});

const ProductImage = mongoose.model('ProductImage', ProductImageSchema);

module.exports = ProductImage;
