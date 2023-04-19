const mongoose = require('mongoose');

const AuthSchema = new mongoose.Schema({
    rfid: []
})

module.exports = mongoose.model("Auth", AuthSchema)