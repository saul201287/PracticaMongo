const express = require("express");
const mongoose = require("mongoose");
const routeClient = require("./routers/Cliente.route");
const routCar = require("./routers/Vehiculo.route");
const routeSeller = require("./routers/Vendedores.route");
const routeSales = require("./routers/Ventas.route");
const app = express();
app.use(express.json());
mongoose.set("strictQuery", false);
const port = 3006;

app.use("/clientes",routeClient);
app.use("/vehiculos",routCar);
app.use("/vendedores",routeSeller);
app.use("/ventas",routeSales);

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
