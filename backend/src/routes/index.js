const express = require("express");
const router = express.Router();

router.use("/empresas", require("./empresa.routes"));
router.use("/categorias", require("./categoria.routes"));
router.use("/clientes", require("./cliente.routes"));
router.use("/proveedores", require("./proveedor.routes"));
router.use("/productos", require("./producto.routes"));
router.use("/almacenes", require("./almacen.routes"));
router.use("/stock", require("./stock.routes"));
router.use("/empleados", require("./empleado.routes"));
router.use("/usuarios", require("./usuario.routes"));
router.use("/cajas", require("./caja.routes"));
router.use("/movimientos-caja", require("./cajaMovimiento.routes"));
router.use("/compras", require("./compra.routes"));
router.use("/detalle-compras", require("./compraDetalle.routes"));
router.use("/ventas", require("./venta.routes"));
router.use("/detalle-ventas", require("./ventaDetalle.routes"));

module.exports = router;