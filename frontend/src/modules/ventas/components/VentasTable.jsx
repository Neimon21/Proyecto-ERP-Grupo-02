const VentasTable = ({ ventas }) => {
  return (
    <table>
      <thead>
        <tr>
          <th>ID</th>
          <th>Cliente</th>
          <th>Total</th>
          <th>Fecha</th>
        </tr>
      </thead>

      <tbody>
        {ventas.map((venta) => (
          <tr key={venta._id || venta.id}>
            <td>{venta._id || venta.id}</td>
            <td>{venta.cliente?.nombre || 'Sin cliente'}</td>
            <td>S/ {venta.total}</td>
            <td>{venta.fecha}</td>
          </tr>
        ))}
      </tbody>
    </table>
  );
};

export default VentasTable;