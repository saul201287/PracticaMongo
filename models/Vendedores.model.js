const mongoose = require('mongoose');

const vendedorSchema = new mongoose.Schema({
  nombre: {type: String , require: true},
  apellido: {type: String , require: true},
  
});

module.exports = mongoose.model('Vendedor', vendedorSchema);
