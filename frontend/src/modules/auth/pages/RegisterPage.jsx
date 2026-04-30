import './LoginPage.css';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const RegisterPage = () => {
  const navigate = useNavigate();

  const [form, setForm] = useState({
    nombre: '',
    email: '',
    password: '',
  });

  const handleChange = (e) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value,
    });
  };

  const handleRegister = async (e) => {
    e.preventDefault();

    try {
      const response = await fetch('http://localhost:3001/api/solicitudes', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(form),
      });

      const data = await response.json();

      if (!response.ok) {
        alert(data.message || 'Error al enviar la solicitud');
        return;
      }

      alert('Solicitud enviada. Un administrador debe aprobar tu cuenta.');

      navigate('/');
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
            Solicitar acceso
          </h1>
        </div>

        <div className="login-right">

          <div className="login-box">

            <form onSubmit={handleRegister}>

              <div className="input-group">
                <label>Nombre</label>

                <input
                  type="text"
                  name="nombre"
                  placeholder="Nombre completo"
                  value={form.nombre}
                  onChange={handleChange}
                  required
                />
              </div>

              <div className="input-group">
                <label>Correo</label>

                <input
                  type="email"
                  name="email"
                  placeholder="correo@empresa.com"
                  value={form.email}
                  onChange={handleChange}
                  required
                />
              </div>

              <div className="input-group">
                <label>Contraseña</label>

                <input
                  type="password"
                  name="password"
                  placeholder="********"
                  value={form.password}
                  onChange={handleChange}
                  required
                />
              </div>

              <button type="submit">
                Enviar solicitud
              </button>

            </form>

          </div>

        </div>

      </div>

    </div>
  );
};

export default RegisterPage;