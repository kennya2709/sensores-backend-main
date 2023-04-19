const mongoose = require("mongoose");

const sensorSchema = new mongoose.Schema({
  nombre: {
    type: String,
    required: true,
  },
  descripcion: {
    type: String,
    required: true,
  },
});

module.exports = mongoose.model("Sensor", sensorSchema);
