const mongoose = require("mongoose");

const clienteSchema = new mongoose.Schema({
  nombre: { type: String, require: true },
  apellido: { type: String, require: true },
  direccion: { type: String, require: true },
  historialCompras: [
    {
      vehiculo: { type: mongoose.Schema.Types.ObjectId, ref: "Vehiculo" },
      fecha: { type: Date, require: true },
    },
  ],
});

module.exports = mongoose.model("Clientes", clienteSchema);
