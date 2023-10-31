const routeSales = require("express").Router();
const Ventas = require("../models/Ventas.model");

routeSales.get("/", (req, res) => {
    Ventas.find();
    res.json(Ventas);
});

routeSales.get("/:id", (req, res) => {
    Ventas.findById(req.params.id);
    res.json(Ventas);
});

routeSales.post("/", (req, res) => {
    Ventas.create(req.body);
    res.json(Ventas);
});

routeSales.put("/:id", (req, res) => {
    Ventas.findByIdAndUpdate(req.params.id, req.body);
    res.json(Ventas);
});


module.exports = routeSales;


