const routeClient = require("express").Router();
const Cliente = require("../models/Clientes.model");
const Vehiculo = require("../models/Vehiculos.model");

routeClient.get("/", async (req, res) => {
    const clientes = await Cliente.find();
} );

routeClient.get("/:id", async (req, res) => {
    const cliente = await Cliente.findById(req.params.id);
    res.json(cliente);
});

routeClient.post("/", async (req, res) => {
    const cliente = await Cliente.create(req.body);
    res.json(cliente);
});



module.exports = routeClient;