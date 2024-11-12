// controllers/imageController.js
const cloudinary = require("cloudinary").v2;
const Toy = require('../models/Toy');
const ProductImage = require('../models/ProductImage'); // Import the ProductImage model

exports.uploadToyImage = async (req, res) => {
  try {
    const { productID } = req.params;

    // Check if the toy exists
    const toy = await Toy.findById(productID);
    if (!toy) {
      return res.status(404).json({ error: 'Toy not found' });
    }

    // Check if file is present
    if (!req.file) {
      return res.status(400).json({ error: 'No image file provided' });
    }

    // Upload image to Cloudinary
    const result = await cloudinary.uploader.upload(req.file.path, {
      folder: 'toys', // Optional: Specify folder in Cloudinary
      public_id: `${productID}_${Date.now()}`, // Unique public ID format
    });

    // Check if the product already has an entry in the ProductImage collection
    let productImages = await ProductImage.findOne({ productID });
    
    if (!productImages) {
      // If no images exist for this product, create a new entry
      productImages = new ProductImage({
        productID,
        images: [{ url: result.secure_url, publicID: result.public_id }],
      });
    } else {
      // If images already exist for this product, add the new image to the array
      productImages.images.push({
        url: result.secure_url,
        publicID: result.public_id,
      });
    }

    // Save the updated images for the product
    await productImages.save();

    res.status(201).json({
      message: 'Image uploaded successfully',
      image: {
        url: result.secure_url,
        publicID: result.public_id,
      },
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'An error occurred during image upload' });
  }
};


exports.getToyImages = async (req, res) => {
    try {
      const { productID } = req.params;
  
      // Retrieve images for the given product ID
      const productImages = await ProductImage.findOne({ productID });
      
      if (!productImages) {
        return res.status(404).json({ error: 'No images found for this product' });
      }
  
      res.status(200).json({
        productID: productImages.productID,
        images: productImages.images,
      });
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: 'An error occurred while retrieving images' });
    }
  };
