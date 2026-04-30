import '../../../styles/Dashboard.css';
import { useNavigate } from 'react-router-dom';
import { useEffect } from 'react';

const AlmacenDashboard = () => {

  const navigate = useNavigate();

  useEffect(() => {

    const session = JSON.parse(
      localStorage.getItem('session')
    );

    if (!session) {
      navigate('/');
      return;
    }

    if (session.rol !== 'ALMACENERO') {
      navigate('/');
    }

  }, []);

  const handleLogout = () => {

    localStorage.removeItem('session');

    navigate('/');

  };

  return (
    <div className="dashboard-container">

      <aside className="sidebar almacen-sidebar">

        <h2>ERP Almacén</h2>

        <ul>
          <li>Inventario</li>
          <li onClick={() => navigate('/profile')}>
            Mi Perfil
          </li>
          <li>Ingresos</li>
          <li>Inventario</li>
        </ul>

      </aside>

      <main className="dashboard-content">

        <div className="topbar">

          <h1>Almacenero</h1>

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

export default AlmacenDashboard;