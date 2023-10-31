const routeCar = require("express").Router();
const Vehiculo = require("../models/Vehiculos.model");

routeCar.get("/", async (req, res) => {
    const vehiculos = await Vehiculo.find();
} );

routeCar.get("/:id", async (req, res) => {
    const vehiculo = await Vehiculo.findById(req.params.id);
    res.json(vehiculo);
});

routeCar.post("/", async (req, res) => {
    const vehiculo = await Vehiculo.create(req.body);
    res.json(vehiculo);
});


module.exports = routeCar;
