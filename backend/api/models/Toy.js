const mongoose = require('mongoose');

const ToySchema = new mongoose.Schema({
    productID: {
        type: String,
        required: true,
        unique: true
    },
    productName: {
        type: String,
        required: true
    },
    manufacturer: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Manufacturer',
        required: true
    },
    price: {
        type: Number,
        required: true,
        min: 0.01
    },
    category: {
        type: Object,
        required: true
    },
    ageGroup: {
        type: [Number],
        validate: {
            validator: function(v) {
                return v.length === 2 && v[0] < v[1];
            },
            message: 'Age group should be an array with two numbers: [lowerLimit, upperLimit]'
        },
        required: true
    },
    stockLeft: {
        type: Number,
        default: 0
    }
});

// Check if the model already exists


// Export the model
module.exports = ToySchema;
