import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import '../pages/SolicitudesPage.css';

const API_URL = 'http://localhost:3001/api/solicitudes';

const AdminSolicitudesPage = () => {
  const navigate = useNavigate();

  const [solicitudes, setSolicitudes] = useState([]);
  const [rolesSeleccionados, setRolesSeleccionados] = useState({});
  const [loading, setLoading] = useState(true);

  const cargarSolicitudes = async () => {
    try {
      const response = await fetch(`${API_URL}/pendientes`);
      const data = await response.json();

      if (!response.ok) {
        alert(data.message || 'Error al cargar solicitudes');
        return;
      }

      setSolicitudes(data);
    } catch (error) {
      alert('No se pudo conectar con el servidor');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    cargarSolicitudes();
  }, []);

  const cambiarRol = (usuarioId, rolId) => {
    setRolesSeleccionados({
      ...rolesSeleccionados,
      [usuarioId]: rolId,
    });
  };

  const aprobarSolicitud = async (usuarioId) => {
    const rolId = rolesSeleccionados[usuarioId];

    if (!rolId) {
      alert('Debe seleccionar un rol antes de aprobar');
      return;
    }

    try {
      const response = await fetch(`${API_URL}/${usuarioId}/aprobar`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ rolId }),
      });

      const data = await response.json();

      if (!response.ok) {
        alert(data.message || 'Error al aprobar solicitud');
        return;
      }

      alert('Usuario aprobado correctamente');
      cargarSolicitudes();
    } catch (error) {
      alert('No se pudo conectar con el servidor');
    }
  };

  const rechazarSolicitud = async (usuarioId) => {
    const confirmar = window.confirm(
      '¿Seguro que deseas rechazar esta solicitud?'
    );

    if (!confirmar) return;

    try {
      const response = await fetch(`${API_URL}/${usuarioId}/rechazar`, {
        method: 'DELETE',
      });

      const data = await response.json();

      if (!response.ok) {
        alert(data.message || 'Error al rechazar solicitud');
        return;
      }

      alert('Solicitud rechazada');
      cargarSolicitudes();
    } catch (error) {
      alert('No se pudo conectar con el servidor');
    }
  };

  return (
    <div className="admin-page">
      <div className="admin-card">
        <div className="admin-header">
          <button
            className="btn-back"
            onClick={() => navigate('/admin')}
          >
            ←
          </button>

          <h2 className="admin-title">
            Solicitudes de registro
          </h2>
        </div>

        {loading ? (
          <div className="empty-state">
            Cargando solicitudes...
          </div>
        ) : solicitudes.length === 0 ? (
          <div className="empty-state">
            No hay solicitudes pendientes
          </div>
        ) : (
          <table className="admin-table">
            <thead>
              <tr>
                <th>Nombre</th>
                <th>Correo</th>
                <th>Rol</th>
                <th>Acciones</th>
              </tr>
            </thead>

            <tbody>
              {solicitudes.map((solicitud) => (
                <tr key={solicitud.UsuarioId}>
                  <td>{solicitud.Nombre}</td>
                  <td>{solicitud.Email}</td>

                  <td>
                    <select
                      value={
                        rolesSeleccionados[solicitud.UsuarioId] || ''
                      }
                      onChange={(e) =>
                        cambiarRol(
                          solicitud.UsuarioId,
                          e.target.value
                        )
                      }
                      className="role-select"
                    >
                      <option value="">Seleccione rol</option>
                      <option value="1">Administrador</option>
                      <option value="2">Vendedor</option>
                      <option value="3">Almacenero</option>
                    </select>
                  </td>

                  <td>
                    <div className="actions">
                      <button
                        className="btn btn-approve"
                        onClick={() =>
                          aprobarSolicitud(solicitud.UsuarioId)
                        }
                      >
                        Aprobar
                      </button>

                      <button
                        className="btn btn-reject"
                        onClick={() =>
                          rechazarSolicitud(solicitud.UsuarioId)
                        }
                      >
                        Rechazar
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>
    </div>
  );
};

export default AdminSolicitudesPage;