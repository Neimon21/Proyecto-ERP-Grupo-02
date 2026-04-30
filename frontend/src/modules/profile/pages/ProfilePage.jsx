import './ProfilePage.css';
import { useState, useEffect } from 'react';

const API_URL = 'http://localhost:3001/api/profile';

const ProfilePage = () => {
  const [user, setUser] = useState({
    usuarioId: '',
    email: '',
    password: '',
    nombre: '',
    rol: '',
  });

  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const savedUser = JSON.parse(localStorage.getItem('user'));

    if (!savedUser?.UsuarioId && !savedUser?.usuarioId) {
      alert('No hay usuario en sesión');
      setLoading(false);
      return;
    }

    const usuarioId = savedUser.UsuarioId || savedUser.usuarioId;

    const cargarPerfil = async () => {
      try {
        const response = await fetch(`${API_URL}/${usuarioId}`);
        const data = await response.json();

        if (!response.ok) {
          alert(data.message || 'Error al cargar perfil');
          return;
        }

        setUser({
          usuarioId: data.UsuarioId,
          nombre: data.Nombre || '',
          email: data.Email || '',
          password: '',
          rol: data.Rol || '',
        });
      } catch (error) {
        alert('No se pudo conectar con el servidor');
      } finally {
        setLoading(false);
      }
    };

    cargarPerfil();
  }, []);

  const handleChange = (e) => {
    setUser({
      ...user,
      [e.target.name]: e.target.value,
    });
  };

  const handleSave = async (e) => {
    e.preventDefault();

    try {
      const response = await fetch(`${API_URL}/${user.usuarioId}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          nombre: user.nombre,
          email: user.email,
          password: user.password,
        }),
      });

      const data = await response.json();

      if (!response.ok) {
        alert(data.message || 'Error al actualizar perfil');
        return;
      }

      const savedUser = JSON.parse(localStorage.getItem('user')) || {};

      localStorage.setItem('user', JSON.stringify({
        UsuarioId: data.usuario.UsuarioId,
        Nombre: data.usuario.Nombre,
        Usuario: data.usuario.Usuario,
        Rol: data.usuario.Rol,
        RolId: data.usuario.RolId,
      }));

      alert('Información actualizada');
      setUser({ ...user, password: '' });
    } catch (error) {
      alert('No se pudo conectar con el servidor');
    }
  };

  if (loading) {
    return (
      <div className="profile-page">
        <div className="profile-card">
          <h1>Cargando perfil...</h1>
        </div>
      </div>
    );
  }

  return (
    <div className="profile-page">
      <div className="profile-card">
        <h1>Editar Información</h1>

        <form onSubmit={handleSave}>
          <div className="input-group">
            <label>Nombre</label>

            <input
              type="text"
              name="nombre"
              value={user.nombre}
              onChange={handleChange}
              placeholder="Ingrese nombre"
              required
            />
          </div>

          <div className="input-group">
            <label>Correo</label>

            <input
              type="email"
              name="email"
              value={user.email}
              onChange={handleChange}
              placeholder="correo@empresa.com"
              required
            />
          </div>

          <div className="input-group">
            <label>Nueva Contraseña</label>

            <input
              type="password"
              name="password"
              value={user.password}
              onChange={handleChange}
              placeholder="Dejar vacío para no cambiar"
            />
          </div>

          <div className="input-group">
            <label>Rol</label>

            <input
              type="text"
              value={user.rol}
              disabled
            />
          </div>

          <button type="submit">
            Guardar Cambios
          </button>
        </form>
      </div>
    </div>
  );
};

export default ProfilePage;