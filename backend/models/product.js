const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const newSchema = new Schema({
    name: { type: String },
    price: { type: String },
    stock: { type: String },
    description: { type: String }
})

module.exports = mongoose.model('Product', newSchema)
