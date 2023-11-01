const routeClient = require("express").Router();
const Cliente = require("../models/Clientes.model");
const Vehiculo = require("../models/Vehiculos.model");

routeClient.get("/", async (req, res) => {
    try {
        const clientes = await Cliente.find();
        if (clientes) {
            res.json(clientes);
        } else {
            res.status(401).json("No se encontraron clientes");
        }
    } catch (error) {
        res.status(500).json(error);
    }
});

routeClient.get("/:id", async (req, res) => {
    try {
        const cliente = await Cliente.findById(req.params.id);
        if (cliente) {
            res.json(cliente);
        } else {
            res.status(401).json("No se encontro el cliente");
        }
    } catch (error) {
        res.status(500).json(error);
    }

});

routeClient.get("/cliente/:nombre&:apellido", async (req, res) => {
    try {
        const { nombre, apellido } = req.params;
        const cliente = Cliente.findOne({nombre: nombre, apellido: apellido})
        if (cliente) {
            res.json(cliente);
        } else {
            res.status(401).json("No se encontro el cliente");
        }
    } catch (error) {
        console.log(error)
        res.status(500).json(error);
    }

});
routeClient.post("/add", async (req, res) => {
    try {
        const cliente = await Cliente.create(req.body);
        if (cliente) {
            res.json(cliente);
        } else {
            res.status(401).json("no se guardo el registro")
        }
    } catch (error) {
        res.status(500).json({ "error": error.message });
    }
});

routeClient.put("/:nombre&:apellido", async (req, res) => {
    try {
        const { nombre, apellido } = req.params;
        const { vehiculo, fecha } = req.body;
        const date = new Date(fecha);
        const cliente = await Cliente.findOne({ nombre: nombre, apellido: apellido });
        if (cliente) {
            const addHistorial = await Cliente.findOneAndUpdate({
                _id: cliente._id
            }, {
                $addToSet: {
                    historialCompras:
                    {
                        vehiculo,
                        fecha: date,
                    }
                }
            }, {
                new: true
            });

            if (addHistorial) {
                return res.json(addHistorial);
            } else {
                return res.status(401).json("No se actualizo el registro");
            }
        } else {
            return res.status(401).json("No se encontro el cliente");
        }
    } catch (error) {
        console.log(error);
        res.status(500).json({ "error": error.message });
    }
})

routeClient.delete("/:id", async (req, res) => {
    try {
        const id = req.params.id;
        const clienete = await Cliente.findByIdAndDelete(id);
        if (clienete) {
            res.json(clienete);
        } else {
            res.json({msg:"No se encontro el vehiculo"})
        }
    } catch (error) {
        res.status(500).json({ "error": error.message });
    }
})


module.exports = routeClient;