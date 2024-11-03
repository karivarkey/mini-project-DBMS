// controllers/orderController.js
const Order = require("../models/Order");
const Toy = require("../models/Toy");
const Manufacturer = require("../models/Manufacturer");

// Create a new order

// controllers/orderController.js


exports.createOrder = async (req, res) => {
  try {
    const { userId, products, address } = req.body;

    // Find products based on product IDs and populate details
    const toyDocs = await Toy.find({ _id: { $in: products } }).populate("manufacturer");

    // Ensure we have found the toys
    if (toyDocs.length === 0) {
      return res.status(400).json({ error: "No valid products found" });
    }

    // Extract individual prices from the toys
    const individualPrices = toyDocs.map(toy => toy.price); // Assuming `price` is a field in the Toy schema

    // Calculate total price
    const shipping = 5; // You can adjust this as needed or include it in the request
    const total = individualPrices.reduce((acc, itemPrice) => acc + itemPrice, 0) + shipping;

    // Get unique manufacturers
    const manufacturers = [...new Set(toyDocs.map(toy => toy.manufacturer))];

    // Calculate ETA (Estimated Time of Arrival)
    const shippingDays = 5; // Set the number of days to add for shipping
    const eta = new Date();
    eta.setDate(eta.getDate() + shippingDays); // Add shippingDays to the current date

    // Create new order
    const newOrder = new Order({
      userId,
      products, // Keep the IDs of the products
      price: {
        individualPrices,
        shipping,
        total
      },
      address,
      manufacturers,
      ETA: eta // Set calculated ETA here
    });

    await newOrder.save();
    res.status(201).json(newOrder);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "An error occurred while creating the order" });
  }
};

// Get all orders
exports.getOrders = async (req, res) => {
    try {
      const orders = await Order.find()
        .populate("userId", "username") // Populate the userId with username
        .populate({
          path: "products", // Populate products with toy details
          model: "Toy",
          select: "productName price manufacturer" // Select necessary fields
        });
  
      // Extract manufacturer information from products
      const ordersWithManufacturers = await Promise.all(
        orders.map(async (order) => {
          const productIds = order.products.map(product => product._id);
          
          // Fetch toys with manufacturers
          const toys = await Toy.find({ _id: { $in: productIds } })
            .populate("manufacturer", "manufacturerName"); // Populate manufacturer details
  
          return {
            ...order._doc, // Spread the existing order data
            manufacturers: toys.map(toy => toy.manufacturer), // Extract manufacturers from toys
          };
        })
      );
  
      res.json(ordersWithManufacturers);
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: "An error occurred while retrieving orders" });
    }
  };
  

// Get an order by ID
exports.getOrderById = async (req, res) => {
    try {
      const order = await Order.findById(req.params.id)
        .populate("userId", "username")
        .populate({
          path: "products",
          model: "Toy",
          select: "productName price manufacturer" // Populate only necessary fields
        });
  
      if (!order) {
        return res.status(404).json({ error: "Order not found" });
      }
  
      // Fetch manufacturers for each product in the order
      const productIds = order.products.map(product => product._id);
      const toys = await Toy.find({ _id: { $in: productIds } })
        .populate("manufacturer", "manufacturerName"); // Populate manufacturer details
  
      // Create an array of manufacturers based on the toys
      const manufacturers = toys.map(toy => toy.manufacturer);
  
      // Return order along with the manufacturers
      res.json({
        ...order._doc, // Spread order properties
        manufacturers, // Add the populated manufacturers array
      });
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: "An error occurred while retrieving the order" });
    }
  };
  

// Update an order
exports.updateOrder = async (req, res) => {
    try {
      // Destructure the fields that can be updated
      const { products, individualPrices, shipping, address, ETA, status } = req.body;
  
      // Prepare an update object to hold the new values
      const update = {};
  
      // Add properties to the update object if they exist in the request body
      if (products) update.products = products;
      if (individualPrices) update.price = update.price || {}; // Create price object if not already created
      if (individualPrices) update.price.individualPrices = individualPrices; // Update individualPrices
      if (shipping) update.price.shipping = shipping; // Update shipping cost
      if (address) update.address = address; // Update address
      if (ETA) update.ETA = ETA; // Update ETA
      if (status) update.status = status; // Update status
  
      // Perform the update operation
      const updatedOrder = await Order.findByIdAndUpdate(
        req.params.id,
        update,
        { new: true }
      );
  
      if (!updatedOrder) {
        return res.status(404).json({ error: "Order not found" });
      }
  
      // Return the updated order
      res.json(updatedOrder);
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: "An error occurred while updating the order" });
    }
  };
  
  
// Delete an order
exports.deleteOrder = async (req, res) => {
  try {
    const deletedOrder = await Order.findByIdAndDelete(req.params.id);
    if (!deletedOrder) {
      return res.status(404).json({ error: "Order not found" });
    }
    res.json({ message: "Order deleted successfully" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "An error occurred while deleting the order" });
  }
};
