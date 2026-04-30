import '../../../styles/Dashboard.css';
import { useNavigate } from 'react-router-dom';

const AdminDashboard = () => {

  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem('session');
    navigate('/');
  };

  return (
    <div className="dashboard-container">

      <aside className="sidebar">
        <h2>ERP Admin</h2>
        <ul>
          <li>Dashboard</li>
          <li onClick={() => navigate('/profile')}>
            Mi Perfil
          </li>
          <li onClick={()=> navigate('/admin/solicitudes')}>
            Solicitud de Usuarios</li>
          <li>Ventas</li>
          <li>Inventario</li>
          <li>Reportes</li>
        </ul>

      </aside>

      <main className="dashboard-content">

        <div className="topbar">
          <div>
            <h1>Administrador</h1>
            <span className="welcome-text">
              Bienvenido al panel administrativo
            </span>
          </div>

          <div className="topbar-actions">
            <button
              className="profile-btn"
              onClick={() => navigate('/profile')}
            >
              Mi Perfil
            </button>
            <button
              className="logout-btn"
              onClick={handleLogout}
            >
              Cerrar Sesión
            </button>
          </div>
        </div>
      </main>
    </div>
  );
};

export default AdminDashboard;