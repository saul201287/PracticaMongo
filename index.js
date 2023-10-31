const express = require("express");
const mongoose = require("mongoose");
const app = express();
app.use(express.json());
require("dotenv").config();
mongoose.set("strictQuery", false);
const port = 3006;

app.listen(port, () => console.log("Escuchando en el puerto ", port));

// Conexion a MongoDB
mongoose
  .connect("mongodb://127.0.0.1/Concesionaria", {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => console.log("Conectado a la base de datos"))
  .catch((error) => {
    console.error("Error de conexión a la base de datos:", error);
  });

module.exports = app;
