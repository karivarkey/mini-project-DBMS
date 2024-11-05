const cloudinary = require("cloudinary").v2;

exports.getHome = async (req, res) => {
  try {
    // Define the public ID of the image you want to fetch
    const publicId = "homeBanner"; // Replace with your actual public ID

    // Fetch the image URL using the public ID
    const imageUrl = cloudinary.url(publicId, {
      secure: true, // Use HTTPS
    });

    // Prepare additional data to send back
    const additionalData = {
      title: "Welcome to Our Store",
      description: "Check out our latest products and offers.",
      imageUrl: imageUrl,
    };

    // Return the image URL along with additional JSON data
    res.status(200).json(additionalData);
  } catch (error) {
    console.error("Error fetching image from Cloudinary:", error);
    res
      .status(500)
      .json({ error: "An error occurred while fetching the image" });
  }
};
