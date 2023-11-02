const routeSales = require("express").Router();
const Ventas = require('../models/Ventas.model');
const Clientes = require('../models/Clientes.model');
const Vendedor = require('../models/Vendedores.model');

routeSales.get("/", async (req, res) => {
    try {
        const ventas = await Ventas.find(); 
        res.json(ventas);
    } catch (error) {
        console.log(error);
    }

});

routeSales.get("/:id", (req, res) => {
    Ventas.findById(req.params.id);
    res.json(Ventas);
});

routeSales.post("/add", async (req, res) => {
    console.log(req.body.pagos);
    const {fechaVenta, cliente, vendedor, vehiculo, precioVenta, pagos, devoluciones} =req.body;
    try {
        const ventas = await Ventas.create({
            fechaVenta: fechaVenta,
            cliente: cliente,
            vendedor: vendedor,
            vehiculo: vehiculo,
            precioVenta: precioVenta,
            pagos: [{"fechaPago":pagos.fechaPago, "monto": pagos.monto}],
            devoluciones: [{"fechaDevolucion":devoluciones.fechaDevolucion, "motivo":devoluciones.motivo }] 
        });
        res.json(ventas);
    } catch (error) {
        res.status(500);
        console.log(error);
    }

});



  routeSales.post("/actualizarPagos", async (req, res) => {
    const { clienteNombre, vendedorNombre, fechaVenta, vehiculoId, monto, fechaPago } = req.body;
    try {
      const cliente = await Clientes.findOne({
        nombre: { $regex: clienteNombre, $options: "i" },
      })
      if (!cliente) {
        res.status(404).send("Cliente no encontrado");
        console.log("Cliente no encontrado");
        return;
      }
      const vendedor = await Vendedor.findOne({
        nombre: { $regex: vendedorNombre, $options: "i" },
      });
      if (!vendedor) {
        res.status(404).send("Vendedor no encontrado");
        console.log("Vendedor no encontrado");
        return;
      }
      const venta = await Ventas.findOne({
        "cliente": cliente._id,
        "vendedor": vendedor._id,
        fechaVenta: new Date(fechaVenta),
        "Vehiculo.vehiculoId": vehiculoId
      });
      const datos = {fechaPago, monto};
      if (!venta) {
        res.status(404).send("Venta no encontrada");
        console.log("Venta no encontrada");
        return;
      }else{
        venta.pagos.push (datos);
        await venta.save();
        res.status(200).send("Venta actualizada");
        console.log("Venta actualizada");
      }
  
    } catch (error) {
      console.log(error);
      res.status(500).send("Error al actualizar la venta");
    }
  });

routeSales.delete("/delete", async (req, res) => {
    const { clienteNombre, vendedorNombre, fechaVenta } = req.body;
    try {
      const cliente = await Clientes.findOne({
        nombre: { $regex: clienteNombre, $options: "i" },
      });
      if (!cliente) {
        res.status(404).send("Cliente no encontrado");
        console.log("Cliente no encontrado");
        return;
      }
      const vendedor = await Vendedor.findOne({
        nombre: { $regex: vendedorNombre, $options: "i" },
      });
      if (!vendedor) {
        res.status(404).send("Vendedor no encontrado");
        console.log("Vendedor no encontrado");
        return;
      }
      const venta = await Ventas.findOne({
        "cliente": cliente._id,
        "vendedor": vendedor._id,
        fechaVenta: new Date(fechaVenta),
      });

      if (!venta) {
        res.status(404).send("Venta no encontrada");
        console.log("Venta no encontrada");
      } else {
        await Ventas.deleteOne(venta);
        res.status(200).send("Venta eliminada");
        console.log("Venta eliminada");
      }
    } catch (error) {
      console.log(error);
      res.status(500).send("Error al eliminar la venta");
    }
  });


module.exports = routeSales;


