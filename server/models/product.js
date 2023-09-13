const mongoose = require('mongoose')

const Product = new mongoose.Schema({
    userid: {
        type: String,
        required: true
    },
    product: {
        type: String,
        required: true
    },
    type: {
        type: String,
        required: true
    },
    color: {
        type: String,
        required: true
    },
    price: {
        type: String,
        required: true
    },
    title: {
        type: String,
        required: true
    },
    description: {
        type: String,
        required: true
    },
    category: {
        type: String,
        required: true
    },
    image: {
        type: String,
        required: true
    }
})
module.exports = mongoose.model('product', Product)