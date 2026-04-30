const bcrypt = require('bcryptjs');
const { sql, poolPromise } = require('../config/db');

const login = async (req, res) => {
  try {
    const { email, password } = req.body;

    const pool = await poolPromise;

    const result = await pool
      .request()
      .input('Usuario', sql.VarChar, email)
      .query(`
        SELECT 
          u.UsuarioId,
          u.Nombre,
          u.Usuario,
          u.Hashcode,
          u.Estado,
          u.RolId,
          r.Nombre AS Rol
        FROM Usuario u
        LEFT JOIN Rol r ON r.RolId = u.RolId
        WHERE u.Usuario = @Usuario
      `);

    const usuario = result.recordset[0];

    if (!usuario) {
      return res.status(400).json({
        message: 'Usuario no encontrado',
      });
    }

    if (usuario.Estado === 0) {
      return res.status(400).json({
        message: 'Usuario pendiente de aprobación',
      });
    }

    const match = await bcrypt.compare(password, usuario.Hashcode);

    if (!match) {
      return res.status(400).json({
        message: 'Contraseña incorrecta',
      });
    }

    return res.json({
      message: 'Login correcto',
      usuario: {
        UsuarioId: usuario.UsuarioId,
        Nombre: usuario.Nombre,
        Usuario: usuario.Usuario,
        Rol: usuario.Rol,
        RolId: usuario.RolId,
      },
    });

  } catch (error) {
    return res.status(500).json({
      message: 'Error en login',
    });
  }
};

module.exports = {
  login,
};