const mongoose = require('mongoose');

const ventaSchema = new mongoose.Schema({
  fechaVenta:{type:Date , require:true},
  cliente: { type: mongoose.Schema.Types.ObjectId, ref: 'Cliente' },
  vendedor: { type: mongoose.Schema.Types.ObjectId, ref: 'Vendedor' },
  vehiculo: { type: mongoose.Schema.Types.ObjectId, ref: 'Vehiculo' },
  precioVenta: { type: Number, require:true},
  pagos: [{ fechaPago: Date, monto: Number ,require:true }],
});

module.exports = mongoose.model('Ventas', ventaSchema);
