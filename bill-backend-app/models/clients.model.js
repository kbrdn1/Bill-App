const mongoose = require('mongoose')
const { Schema } = mongoose

const clientShema = new Schema({
    firstName: {
        type: String,
        required: true
    },
    lastName: {
        type: String,
        required: true
    },
    date_added: {
        type: String,
        required: true
    },
    fonction: String,
    tel: Number,
    email: String,
    company: String,
    address: String,
    address2: String,
    city: String,
    zip: Number,
    country: String,
})

module.exports = mongoose.model('Client', clientShema)