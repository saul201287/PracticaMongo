const routeCar = require("express").Router();
const Vehiculo = require("../models/Vehiculos.model");

routeCar.get("/", async (req, res) => {
    try {
        const vehiculos = await Vehiculo.find();
        res.json(vehiculos);
    } catch (error) {
        res.status(500).json(error);
    }
});

routeCar.get("/:modelo&:date", async (req, res) => {
    try {
        const { modelo, date } = req.params
        const vehiculos = await Vehiculo.find({
            modelo: modelo,
            año: date
        });

        if (vehiculos[0]) {
            res.json(vehiculos);
        } else {
            res.json({ msg: "no se encontro ningun vehiculo con esas cararcteristicas" });
        }

    } catch (error) {
        res.status(500).json(error);
    }
});

routeCar.get("/:id", async (req, res) => {
    try {
        const vehiculo = await Vehiculo.findById(req.params.id);
        console.log(vehiculo);
        if (vehiculo) {
            return res.json(vehiculo);
        } else {
            return res.status(404).json("no se encontro el vehiculo")
        }

    } catch (error) {
        res.status(500).json(error);

    }
});

routeCar.post("/add", async (req, res) => {
    try {
        const vehiculo = await Vehiculo.create(req.body);
        res.json(vehiculo);
    } catch (error) {
        res.status(500).json({ "error": error.message });
    }
});

routeCar.put("/precio", async (req, res) => {
    try {
        const { modelo, date, color, precio } = req.body;
        const vehiculo = await Vehiculo.findOneAndUpdate({
            modelo: modelo,
            año: date,
            color: color
        }, {
            $set: {
                precio: precio
            }
        }, {
            
        });
        if (!vehiculo) {
         res.json({msg:"No se encontro el vehiculo"});
        }
    } catch (error) {
        res.status(500).json({ "error": error.message });
    }
});

routeCar.put("/vendido/:id", async (req, res) => { 
   try {
       const id = req.params.id;
       const vehiculo = await Vehiculo.findByIdAndUpdate({
           _id: id,
       }, {
           $set:{
              estatus: "Comprado" 
           }
       }, {
           new: true
       });
       if (!vehiculo) {
           return res.json({msg:"No se encontro el vehiculo"});
       } else {
           res.json(vehiculo);
       }
   } catch (error) {
    res.status(500).json(error.message);
   }

})

routeCar.delete("/delet/:id", async (req, res) => {
    try {
        const id = req.params.id;
        const vehiculo = await Vehiculo.findByIdAndDelete(id);
        if (vehiculo) {
            res.json(vehiculo);
        } else {
            res.json({msg:"No se encontro el vehiculo"})
        }
    } catch (error) {
        res.status(500).json({ "error": error.message });
    }
})

module.exports = routeCar;
