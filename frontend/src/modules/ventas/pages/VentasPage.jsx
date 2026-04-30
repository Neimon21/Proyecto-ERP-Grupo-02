import { useMemo, useState } from 'react';
import './VentasPage.css';

const productosDemo = [
  {
    id: 'PROD001',
    nombre: 'Paracetamol 500mg',
    categoria: 'Analgésicos',
    precio: 2.5,
    stock: 120,
    stockMin: 20,
  },
  {
    id: 'PROD002',
    nombre: 'Ibuprofeno 400mg',
    categoria: 'Antiinflamatorios',
    precio: 3.2,
    stock: 45,
    stockMin: 15,
  },
  {
    id: 'PROD003',
    nombre: 'Amoxicilina 500mg',
    categoria: 'Antibióticos',
    precio: 5.8,
    stock: 12,
    stockMin: 20,
  },
  {
    id: 'PROD004',
    nombre: 'Loratadina 10mg',
    categoria: 'Antialérgicos',
    precio: 1.8,
    stock: 80,
    stockMin: 10,
  },
];

const ventasDemo = [
  {
    id: 'V0001',
    cliente: 'Cliente general',
    fecha: '2026-01-15',
    total: 28.5,
    estado: 'Completada',
  },
  {
    id: 'V0002',
    cliente: 'María Torres',
    fecha: '2026-01-15',
    total: 42.2,
    estado: 'Completada',
  },
];

const VentasPage = () => {
  const [cliente, setCliente] = useState('Cliente general');
  const [productoId, setProductoId] = useState('');
  const [cantidad, setCantidad] = useState(1);
  const [detalle, setDetalle] = useState([]);
  const [ventas, setVentas] = useState(ventasDemo);

  const productoSeleccionado = productosDemo.find((p) => p.id === productoId);

  const subtotal = useMemo(() => {
    return detalle.reduce((acc, item) => acc + item.subtotal, 0);
  }, [detalle]);

  const igv = subtotal * 0.18;
  const total = subtotal + igv;

  const agregarProducto = () => {
    if (!productoSeleccionado) return;

    const cantidadNumber = Number(cantidad);

    if (cantidadNumber <= 0) {
      alert('La cantidad debe ser mayor a 0');
      return;
    }

    if (cantidadNumber > productoSeleccionado.stock) {
      alert('Stock insuficiente');
      return;
    }

    const existe = detalle.find((item) => item.id === productoSeleccionado.id);

    if (existe) {
      setDetalle((prev) =>
        prev.map((item) =>
          item.id === productoSeleccionado.id
            ? {
                ...item,
                cantidad: item.cantidad + cantidadNumber,
                subtotal: (item.cantidad + cantidadNumber) * item.precio,
              }
            : item
        )
      );
    } else {
      setDetalle((prev) => [
        ...prev,
        {
          id: productoSeleccionado.id,
          nombre: productoSeleccionado.nombre,
          precio: productoSeleccionado.precio,
          cantidad: cantidadNumber,
          subtotal: productoSeleccionado.precio * cantidadNumber,
        },
      ]);
    }

    setProductoId('');
    setCantidad(1);
  };

  const eliminarItem = (id) => {
    setDetalle((prev) => prev.filter((item) => item.id !== id));
  };

  const registrarVenta = () => {
    if (detalle.length === 0) {
      alert('Agrega productos a la venta');
      return;
    }

    const nuevaVenta = {
      id: `V${String(ventas.length + 1).padStart(4, '0')}`,
      cliente,
      fecha: new Date().toISOString().split('T')[0],
      total,
      estado: 'Completada',
    };

    setVentas([nuevaVenta, ...ventas]);
    setDetalle([]);
    setCliente('Cliente general');

    alert('Venta registrada correctamente');
  };

  return (
    <main className="ventas-page">
      <header className="ventas-header">
        <div>
          <h1>Gestión de Ventas</h1>
          <p>Registro de ventas, control de stock y cálculo automático de IGV.</p>
        </div>

        <button className="btn-primary" onClick={registrarVenta}>
          Registrar venta
        </button>
      </header>

      <section className="ventas-stats">
        <article>
          <span>Ventas del día</span>
          <strong>{ventas.length}</strong>
        </article>

        <article>
          <span>Total vendido</span>
          <strong>S/ {ventas.reduce((acc, v) => acc + v.total, 0).toFixed(2)}</strong>
        </article>

        <article>
          <span>Productos críticos</span>
          <strong>
            {productosDemo.filter((p) => p.stock <= p.stockMin).length}
          </strong>
        </article>
      </section>

      <section className="ventas-grid">
        <div className="card">
          <h2>Nueva venta</h2>

          <label>Cliente</label>
          <div className="form-row cliente-row">
            <div>
              <label>Cliente</label>
              <select value={cliente} onChange={(e) => setCliente(e.target.value)}>
                <option value="Cliente general">Cliente general</option>
                <option value="María Torres">María Torres</option>
                <option value="Carlos Ramírez">Carlos Ramírez</option>
                <option value="Ana López">Ana López</option>
              </select>
            </div>

            <div>
              <label>Documento</label>
              <input placeholder="DNI/RUC" />
            </div>
          </div>

          <div className="form-row">
            <div>
              <label>Producto</label>
              <select value={productoId} onChange={(e) => setProductoId(e.target.value)}>
                <option value="">Seleccionar producto</option>
                {productosDemo.map((producto) => (
                  <option key={producto.id} value={producto.id}>
                    {producto.nombre} - Stock: {producto.stock}
                  </option>
                ))}
              </select>
            </div>

            <div>
              <label>Cantidad</label>
              <input
                type="number"
                min="1"
                value={cantidad}
                onChange={(e) => setCantidad(e.target.value)}
              />
            </div>
          </div>

          {productoSeleccionado && (
            <div className="product-preview">
              <span>{productoSeleccionado.categoria}</span>
              <strong>S/ {productoSeleccionado.precio.toFixed(2)}</strong>
              <small
                className={
                  productoSeleccionado.stock <= productoSeleccionado.stockMin
                    ? 'stock-danger'
                    : 'stock-ok'
                }
              >
                Stock: {productoSeleccionado.stock}
              </small>
            </div>
          )}

          <button className="btn-secondary" onClick={agregarProducto}>
            Agregar producto
          </button>
        </div>

        <div className="card card-detalle">
          <h2>Detalle de venta</h2>

          <div className="table-scroll">
          <table>
            <thead>
              <tr>
                <th>Producto</th>
                <th>Cant.</th>
                <th>Precio</th>
                <th>Subtotal</th>
                <th></th>
              </tr>
            </thead>

            <tbody>
              {detalle.length === 0 ? (
                <tr>
                  <td colSpan="5" className="empty">
                    No hay productos agregados
                  </td>
                </tr>
              ) : (
                detalle.map((item) => (
                  <tr key={item.id}>
                    <td>{item.nombre}</td>
                    <td>{item.cantidad}</td>
                    <td>S/ {item.precio.toFixed(2)}</td>
                    <td>S/ {item.subtotal.toFixed(2)}</td>
                    <td>
                      <button className="btn-danger" onClick={() => eliminarItem(item.id)}>
                        Quitar
                      </button>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
          </div>

          <div className="totales">
            <p>
              Subtotal: <strong>S/ {subtotal.toFixed(2)}</strong>
            </p>
            <p>
              IGV 18%: <strong>S/ {igv.toFixed(2)}</strong>
            </p>
            <h3>
              Total: <strong>S/ {total.toFixed(2)}</strong>
            </h3>
          </div>
        </div>
      </section>

      <section className="card">
        <h2>Últimas ventas</h2>

        <table>
          <thead>
            <tr>
              <th>Código</th>
              <th>Cliente</th>
              <th>Fecha</th>
              <th>Total</th>
              <th>Estado</th>
            </tr>
          </thead>

          <tbody>
            {ventas.map((venta) => (
              <tr key={venta.id}>
                <td>{venta.id}</td>
                <td>{venta.cliente}</td>
                <td>{venta.fecha}</td>
                <td>S/ {venta.total.toFixed(2)}</td>
                <td>
                  <span className="badge">{venta.estado}</span>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </section>
    </main>
  );
};

export default VentasPage;