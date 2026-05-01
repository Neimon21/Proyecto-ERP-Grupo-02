import '../../../styles/Dashboard.css';
import { useNavigate } from 'react-router-dom';

const AdminDashboard = () => {
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem('session');
    navigate('/');
  };

  // Datos simulados para llenar la vista
  const stats = [
    { label: 'Ventas del Día', value: 'S/ 1,250.00', icon: '💰' },
    { label: 'Pedidos Pendientes', value: '12', icon: '📦'},
    { label: 'Productos bajo Stock', value: '5', icon: '⚠️'},
    { label: 'Usuarios Activos', value: '4', icon: '👥' },
  ];

  return (
    <div className="dashboard-container">
      <aside className="sidebar">
        <div className="sidebar-header">
          <h2>FARMACIA ERP ADMIN</h2>
        </div>
        <nav>
          <ul>
            <li className="active">📊 Dashboard</li>
            <li onClick={() => navigate('/profile')}>👤 Mi Perfil</li>
            <li onClick={()=> navigate('/admin/solicitudes')}>
            👤 Solicitud de Usuarios</li>
            <li>👥 Gestión de Usuarios</li>
            <li>💊 Inventario / Productos</li>
            <li>🛒 Ventas</li>
            <li>📈 Reportes Globales</li>
            <li>⚙️ Configuración</li>
          </ul>
        </nav>
      </aside>

      <main className="dashboard-content">
        <header className="topbar">
          <div>
            <h1>Panel Administrativo</h1>
            <span className="welcome-text">Gestión general de la sede Huacho</span>
          </div>

          <div className="topbar-actions">
            <button className="profile-btn" onClick={() => navigate('/profile')}>Mi Perfil</button>
            <button className="logout-btn" onClick={handleLogout}>Cerrar Sesión</button>
          </div>
        </header>

        {/* --- NUEVA SECCIÓN DE ESTADÍSTICAS --- */}
        <section className="stats-grid">
          {stats.map((stat, index) => (
            <div key={index} className="stat-card">
              <div className="stat-icon" style={{ backgroundColor: stat.color }}>{stat.icon}</div>
              <div className="stat-info">
                <h3>{stat.value}</h3>
                <p>{stat.label}</p>
              </div>
            </div>
          ))}
        </section>

        {/* --- NUEVA SECCIÓN DE TABLA / RESUMEN --- */}
        <section className="recent-activity">
          <div className="card-header">
            <h2>Últimas Ventas Realizadas</h2>
            <button className="view-all-btn">Ver todo</button>
          </div>
          <table className="styled-table">
            <thead>
              <tr>
                <th>ID</th>
                <th>Cliente</th>
                <th>Producto</th>
                <th>Total</th>
                <th>Estado</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>#1024</td>
                <td>Juan Pérez</td>
                <td>Paracetamol 500mg</td>
                <td>S/ 15.00</td>
                <td><span className="badge success">Completado</span></td>
              </tr>
              <tr>
                <td>#1025</td>
                <td>María López</td>
                <td>Amoxicilina 250mg</td>
                <td>S/ 45.50</td>
                <td><span className="badge success">Completado</span></td>
              </tr>
              <tr>
                <td>#1026</td>
                <td>Carlos Ruíz</td>
                <td>Vitamina C Forte</td>
                <td>S/ 120.00</td>
                <td><span className="badge warning">Pendiente</span></td>
              </tr>
            </tbody>
          </table>
        </section>
      </main>
    </div>
  );
};

export default AdminDashboard;