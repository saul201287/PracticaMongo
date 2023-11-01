const mongoose = require('mongoose');

const devolucionesSchema = new mongoose.Schema({
   fechaDevolucion:{type:Date, require:true},
   cliente: { type: mongoose.Schema.Types.ObjectId, ref: 'Cliente' },
   vendedor: { type: mongoose.Schema.Types.ObjectId, ref: 'Vendedor' },
   vehiculo: { type: mongoose.Schema.Types.ObjectId, ref: 'Vehiculo' },
   motivo: {type:String, require:true}
});

module.exports = mongoose.model('Devoluciones', devolucionesSchema);
