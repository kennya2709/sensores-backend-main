const mongoose = require("mongoose");

const lecturasSchema = new mongoose.Schema({
  sensor_id: {
    type: String,
    required: true,
  },
  sensors: [],
});

module.exports = mongoose.model("lecturas", lecturasSchema);
