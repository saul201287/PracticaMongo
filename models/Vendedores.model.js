const mongoose = require('mongoose');

const vendedorSchema = new mongoose.Schema({
  nombre: {type: String , require: true},
  apellido: {type: String , require: true},
  telefono: {type: Number , require: true}
  
});

module.exports = mongoose.model('Vendedor', vendedorSchema);
