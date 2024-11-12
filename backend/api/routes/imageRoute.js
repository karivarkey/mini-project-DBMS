// routes/imageRoute.js
const express = require('express');
const multer = require('multer');
const { uploadToyImage,getToyImages } = require('./../controllers/imageController'); // Ensure the path is correct

const router = express.Router();

// Configure multer for file upload
const upload = multer({ dest: 'uploads/' }); // Temporary storage for multer

// Define the route for image upload
router.post('/:productID/upload-image', upload.single('image'), uploadToyImage);
router.get('/:productID/images', getToyImages);
module.exports = router;
