const mongoose = require('mongoose');


const vehiculoSchema = new mongoose.Schema({
  modelo: {type: String , require: true},
  año:{ type: Number , require: true},
  color:{ type: String , require: true},
  precio: {type: Number , require: true},
  estado: {type: String , require: true},
});

module.exports = mongoose.model('Vehiculo', vehiculoSchema);
