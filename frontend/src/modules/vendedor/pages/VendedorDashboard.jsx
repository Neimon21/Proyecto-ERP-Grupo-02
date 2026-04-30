import '../../../styles/Dashboard.css';
import { useNavigate } from 'react-router-dom';
import { useEffect } from 'react';

const VendedorDashboard = () => {

  const navigate = useNavigate();

  useEffect(() => {

    const session = JSON.parse(
      localStorage.getItem('session')
    );

    if (!session) {
      navigate('/');
      return;
    }

    if (session.rol !== 'VENDEDOR') {
      navigate('/');
    }

  }, []);

  const handleLogout = () => {
    localStorage.removeItem('session');
    navigate('/');
  };

  return (
    <div className="dashboard-container">

      <aside className="sidebar vendedor-sidebar">
        <h2>ERP Ventas</h2>
        <ul>
          <li>Nueva Venta</li>
          <li onClick={() => navigate('/profile')}>
            Mi Perfil
          </li>
          <li>Productos</li>
          <li>Clientes</li>
        </ul>
      </aside>

      <main className="dashboard-content">
        <div className="topbar">
          <h1>Vendedor</h1>
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

export default VendedorDashboard;