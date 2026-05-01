import '../../../styles/Dashboard.css';
import { useNavigate } from 'react-router-dom';
import { useEffect } from 'react';

const AlmacenDashboard = () => {
  const navigate = useNavigate();

  useEffect(() => {
    const session = JSON.parse(localStorage.getItem('session'));
    if (!session || session.rol !== 'ALMACENERO') {
      navigate('/');
    }
  }, [navigate]);

  const handleLogout = () => {
    localStorage.removeItem('session');
    navigate('/');
  };

  // Datos enfocados en LOGÍSTICA (Diferentes a los del Admin)
  const almacenStats = [
    { label: 'Productos en Stock', value: '1,420', icon: '💊', color: '#2196F3' },
    { label: 'Stock Crítico', value: '8', icon: '📉', color: '#F44336' },
    { label: 'Por Vencer (30 días)', value: '15', icon: '📅', color: '#FF9800' },
    { label: 'Ingresos hoy', value: '4 Lotes', icon: '🚚', color: '#4CAF50' },
  ];

  return (
    <div className="dashboard-container">
      <aside className="sidebar almacen-sidebar">
        <div className="sidebar-header">
          <h2>ERP ALMACÉN FARMACIA</h2>
        </div>
        <nav>
          <ul>
            <li className="active">📦 Inventario Actual</li>
            <li onClick={() => navigate('/profile')}>👤 Mi Perfil</li>
            <li>📥 Registrar Ingreso (Lotes)</li>
            <li>📤 Salida de Mercadería</li>
            <li>🏢 Proveedores</li>
            <li>⚠️ Alertas de Stock</li>
          </ul>
        </nav>
      </aside>

      <main className="dashboard-content">
        <header className="topbar">
          <div>
            <h1>Panel de Almacén</h1>
            <span className="welcome-text">Control de inventario y suministros - Sede Huacho</span>
          </div>
          <div className="topbar-actions">
            <button className="profile-btn" onClick={() => navigate('/profile')}>Mi Perfil</button>
            <button className="logout-btn" onClick={handleLogout}>Cerrar Sesión</button>
          </div>
        </header>

        {/* Reutilizamos la estructura de tarjetas que arreglamos antes */}
        <section className="stats-grid">
          {almacenStats.map((stat, index) => (
            <div key={index} className="stat-card" style={{ '--accent-color': stat.color }}>
              <div className="stat-icon">{stat.icon}</div>
              <div className="stat-info">
                <h3>{stat.value}</h3>
                <p>{stat.label}</p>
              </div>
            </div>
          ))}
        </section>

        <section className="recent-activity">
          <div className="card-header">
            <h2>Reposición de Inventario Reciente</h2>
            <div className="header-btns">
               <button className="view-all-btn">Generar Reporte</button>
            </div>
          </div>
          
          <div className="table-spacing"> {/* Contenedor para el espacio que pediste */}
            <table className="styled-table">
              <thead>
                <tr>
                  <th>Código SKU</th>
                  <th>Medicamento</th>
                  <th>Proveedor</th>
                  <th>Cant. Ingresada</th>
                  <th>Vencimiento</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td>ALM-992</td>
                  <td>Naproxeno 550mg</td>
                  <td>Droguería Inti</td>
                  <td>500 u.</td>
                  <td><span className="badge success">Oct 2027</span></td>
                </tr>
                <tr>
                  <td>ALM-441</td>
                  <td>Inhalador Salbutamol</td>
                  <td>Genfar</td>
                  <td>20 u.</td>
                  <td><span className="badge warning">Ago 2026</span></td>
                </tr>
                <tr>
                  <td>ALM-102</td>
                  <td>Alcohol en Gel 1L</td>
                  <td>Química Suiza</td>
                  <td>100 u.</td>
                  <td><span className="badge success">Ene 2028</span></td>
                </tr>
              </tbody>
            </table>
          </div>
        </section>
      </main>
    </div>
  );
};

export default AlmacenDashboard;
