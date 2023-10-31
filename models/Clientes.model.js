const mongoose = require("mongoose");

const clienteSchema = new mongoose.Schema({
  nombre: { type: string, require: true },
  apellido: { type: string, require: true },
  direccion: { type: string, require: true },
  historialCompras: [
    {
      vehiculo: { type: mongoose.Schema.Types.ObjectId, ref: "Vehiculo" },
      fecha:{type: Date , require: true },
    },
  ],
});

module.exports = mongoose.model("Cliente", clienteSchema);
