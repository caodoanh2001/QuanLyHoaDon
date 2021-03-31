const mongoose = require('mongoose')
const ReceiptSchema = new mongoose.Schema({
    name : String,
    buyer: String,
    picture: String,
})

mongoose.model("receipt", ReceiptSchema)