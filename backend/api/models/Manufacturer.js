const mongoose = require('mongoose');

// Define the Manufacturer schema
const ManufacturerSchema = new mongoose.Schema({
    uid: {
        type: String,
        required: true,
        unique: true
    },
    address: {
        type: String,
        required: true
    },
    contact: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true,
        unique: true
    },
    manufacturerName: {
        type: String,
        required: true,
        unique: true
    },
    gstin: {
        type: String,
        required: true
    }
});

// Create a model from the schema


// Export the model
module.exports = mongoose.models.Manufacturer || mongoose.model("Manufacturer", ManufacturerSchema);