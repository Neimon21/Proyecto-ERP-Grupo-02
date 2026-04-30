import './LoginPage.css';
import { useNavigate } from 'react-router-dom';
import { useState } from 'react';

const LoginPage = () => {

  const navigate = useNavigate();

  const [form, setForm] = useState({
    email: '',
    password: '',
  });

  const handleChange = (e) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value,
    });
  };

  const handleLogin = async (e) => {
  e.preventDefault();

  try {
    const response = await fetch('http://localhost:3001/api/login', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        email: form.email,
        password: form.password,
      }),
    });

    const data = await response.json();

    if (!response.ok) {
      alert(data.message || 'Correo o contraseña incorrectos');
      return;
    }

    localStorage.setItem('user', JSON.stringify(data.usuario));

    localStorage.setItem(
      'session',
      JSON.stringify({
        UsuarioId: data.usuario.UsuarioId,
        email: data.usuario.Usuario,
        rol: data.usuario.Rol,
        RolId: data.usuario.RolId,
      })
    );

    if (data.usuario.Rol === 'ADMINISTRADOR') {
      navigate('/admin');
    } else if (data.usuario.Rol === 'VENDEDOR') {
      navigate('/vendedor');
    } else if (data.usuario.Rol === 'ALMACENERO') {
      navigate('/almacen');
    } else {
      alert('Rol no válido');
    }
  } catch (error) {
    alert('No se pudo conectar con el servidor');
  }
};

  return (
    <div className="login-page">

      <div className="background-circle circle-1"></div>
      <div className="background-circle circle-2"></div>

      <div className="login-container">

        <div className="login-left">

          <span className="system-badge">
            FARMACIA ERP
          </span>

          <h1>
            Inicia sesion
          </h1>

          <div className="features">

            <div className="feature-card">
              <h3>Huacho</h3>
            </div>

            <div className="feature-card">
              <h3>Caja 1</h3>
            </div>

          </div>

        </div>

        <div className="login-right">

          <div className="login-box">

            <form onSubmit={handleLogin}>

              <div className="input-group">

                <label>
                  Correo Electrónico
                </label>

                <input
                  type="email"
                  name="email"
                  value={form.email}
                  placeholder="correo@empresa.com"
                  onChange={handleChange}
                />

              </div>

              <div className="input-group">

                <label>
                  Contraseña
                </label>

                <input
                  type="password"
                  name="password"
                  value={form.password}
                  placeholder="••••••••"
                  onChange={handleChange}
                />

              </div>

              <div className="login-options">

                <label>
                  <input type="checkbox" />
                  Recordarme
                </label>

                <a href="/">
                  ¿Olvidaste tu contraseña?
                </a>

              </div>

              <button type="submit">
                Ingresar
              </button>

              <p className="register-link">

                ¿No tienes cuenta?

                <span onClick={() => navigate('/register')}>
                  Registrarse
                </span>

              </p>

            </form>

          </div>

        </div>

      </div>

    </div>
  );
};

export default LoginPage;