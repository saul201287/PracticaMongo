const mongoose = require('mongoose');

const ventaSchema = new mongoose.Schema({
  fechaVenta: {type: Date, requiere: true},
  cliente: { type: mongoose.Schema.Types.ObjectId, ref: 'Cliente' },
  vendedor: { type: mongoose.Schema.Types.ObjectId, ref: 'Vendedor' },
  vehiculo: { type: mongoose.Schema.Types.ObjectId, ref: 'Vehiculo' },
  precioVenta: {type: Number, requiere: true},
  pagos: [{ fechaPago: Date, monto: Number }],
  devoluciones: [{ fechaDevolucion: Date, motivo: String }],
});

module.exports = mongoose.model('Ventas', ventaSchema);
