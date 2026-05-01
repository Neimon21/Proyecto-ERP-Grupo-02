import '../../../styles/Dashboard.css';
import { useNavigate } from 'react-router-dom';
import { useEffect, useState } from 'react';

const VendedorDashboard = () => {
  const navigate = useNavigate();
  // Estado para manejar los datos de la sesión actual
  const [sessionData, setSessionData] = useState({ usuario: '', rol: '' });

  useEffect(() => {
    // 1. Recuperar la sesión del localStorage
    const session = JSON.parse(localStorage.getItem('session'));

    // 2. Seguridad: Si no hay sesión, al login
    if (!session) {
      navigate('/');
      return;
    }

    // 3. Seguridad: Si el rol no es VENDEDOR, fuera (Punto 4 del Sprint)
    if (session.rol !== 'VENDEDOR') {
      navigate('/');
      return;
    }

    // 4. Cargar los datos en el estado para el saludo
    setSessionData({
      usuario: session.usuario, // Aquí vendrá "vendedor1", "vendedor2", etc.
      rol: session.rol        // Aquí vendrá "VENDEDOR"
    });
  }, [navigate]);

  const handleLogout = () => {
    localStorage.removeItem('session');
    navigate('/');
  };

  // Datos para las tarjetas de métricas
  const ventasStats = [
    { label: 'Mis Ventas hoy', value: 'S/ 450.20', icon: '🛒', color: '#4CAF50' },
    { label: 'Boletas Emitidas', value: '18', icon: '📄', color: '#2196F3' },
    { label: 'Clientes Atendidos', value: '12', icon: '🤝', color: '#9C27B0' },
    { label: 'Meta Diaria', value: '75%', icon: '🎯', color: '#FF9800' },
  ];

  return (
    <div className="dashboard-container">
      {/* Sidebar con opciones para el Vendedor */}
      <aside className="sidebar vendedor-sidebar">
        <div className="sidebar-header">
          <h2>FARMACIA VENTAS</h2>
        </div>
        <nav>
          <ul>
            <li className="active">⚡ Nueva Venta (POS)</li>
            <li onClick={() => navigate('/profile')}>👤 Mi Perfil</li>
            <li>📑 Historial de Boletas</li>
            <li>🔍 Buscar Medicamento</li>
            <li>👥 Mis Clientes</li>
            <li>💰 Corte de Caja</li>
          </ul>
        </nav>
      </aside>

      <main className="dashboard-content">
        <header className="topbar">
          <div>
            <h1>Módulo de Ventas</h1>
            {/* SALUDO PERSONALIZADO CON EL USERNAME ESPECÍFICO */}
            <span className="welcome-text">
              Hola, <strong>{sessionData.usuario}</strong>. Bienvenida/o a tu turno.
            </span>
          </div>

          <div className="topbar-actions">
            {/* BADGE CON EL ROL */}
            <span className="user-role-badge">{sessionData.rol}</span>
            
            <button className="profile-btn" onClick={() => navigate('/profile')}>
              Mi Perfil
            </button>
            <button className="logout-btn" onClick={handleLogout}>
              Cerrar Sesión
            </button>
          </div>
        </header>

        {/* Sección de Tarjetas de Estadísticas */}
        <section className="stats-grid">
          {ventasStats.map((stat, index) => (
            <div 
              key={index} 
              className="stat-card" 
              style={{ '--accent-color': stat.color }}
            >
              <div className="stat-icon">{stat.icon}</div>
              <div className="stat-info">
                <h3>{stat.value}</h3>
                <p>{stat.label}</p>
              </div>
            </div>
          ))}
        </section>

        {/* Sección de Actividad Reciente */}
        <section className="recent-activity">
          <div className="card-header">
            <h2>Mis Últimas Operaciones</h2>
            <button className="view-all-btn">+ Nueva Venta</button>
          </div>
          
          <div className="table-spacing" style={{ marginTop: '20px' }}>
            <table className="styled-table">
              <thead>
                <tr>
                  <th>Hora</th>
                  <th>Nro. Documento</th>
                  <th>Método Pago</th>
                  <th>Total</th>
                  <th>Acción</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td>09:45 AM</td>
                  <td>B001-00045</td>
                  <td>Efectivo</td>
                  <td>S/ 12.50</td>
                  <td><button className="table-btn">Reimprimir</button></td>
                </tr>
                <tr>
                  <td>10:12 AM</td>
                  <td>B001-00046</td>
                  <td>Yape / Plin</td>
                  <td>S/ 85.00</td>
                  <td><button className="table-btn">Reimprimir</button></td>
                </tr>
                <tr>
                  <td>11:05 AM</td>
                  <td>B001-00047</td>
                  <td>Tarjeta</td>
                  <td>S/ 156.90</td>
                  <td><button className="table-btn">Reimprimir</button></td>
                </tr>
              </tbody>
            </table>
          </div>
        </section>
      </main>
    </div>
  );
};

export default VendedorDashboard;
