const mongoose = require('mongoose');

const vendedorSchema = new mongoose.Schema({
  nombre: {type: string , require: true},
  apellido: {type: string , require: true},
  // Otros campos de vendedor xd
});

module.exports = mongoose.model('Vendedor', vendedorSchema);
