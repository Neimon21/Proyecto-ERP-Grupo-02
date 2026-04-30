const { sql, poolPromise } = require('../config/db');

const obtenerPerfil = async (usuarioId) => {
  const pool = await poolPromise;

  const result = await pool
    .request()
    .input('UsuarioId', sql.Int, usuarioId)
    .query(`
      SELECT
        u.UsuarioId,
        u.Nombre,
        u.Usuario AS Email,
        u.Estado,
        r.Nombre AS Rol
      FROM Usuario u
      LEFT JOIN Rol r ON r.RolId = u.RolId
      WHERE u.UsuarioId = @UsuarioId
    `);

  return result.recordset[0];
};

const actualizarPerfil = async ({
  usuarioId,
  nombre,
  email,
  passwordHash,
}) => {
  const pool = await poolPromise;

  const request = pool
    .request()
    .input('UsuarioId', sql.Int, usuarioId)
    .input('Nombre', sql.VarChar, nombre)
    .input('Usuario', sql.VarChar, email);

  let query = `
    UPDATE Usuario
    SET
      Nombre = @Nombre,
      Usuario = @Usuario
  `;

  if (passwordHash) {
    request.input('Hashcode', sql.VarChar, passwordHash);

    query += `,
      Hashcode = @Hashcode
    `;
  }

  query += `
    WHERE UsuarioId = @UsuarioId
  `;

  await request.query(query);
};

module.exports = {
  obtenerPerfil,
  actualizarPerfil,
};