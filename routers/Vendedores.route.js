const routeSeller = require("express").Router();
const Vendedores = require("../models/Vendedores.model");

routeSeller.get("/", async (req, res) => {
    const vendedores = await Vendedores.find();
    res.json(vendedores);
} );

routeSeller.get("/:id", async (req, res) => {
    const vendedor = await Vendedores.findById(req.params.id);
    res.json(vendedor);
});

routeSeller.post("/add", async (req, res) => {
    const vendedor = await Vendedores.create(req.body);
    res.json(vendedor);
});

module.exports = routeSeller;