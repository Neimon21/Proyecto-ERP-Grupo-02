const { sql, poolPromise } = require('../config/db');

const buscarPorCorreo = async (email) => {
  const pool = await poolPromise;

  const result = await pool
    .request()
    .input('Usuario', sql.VarChar, email)
    .query(`
      SELECT *
      FROM Usuario
      WHERE Usuario = @Usuario
    `);

  return result.recordset[0];
};

const crearSolicitud = async ({ nombre, email, passwordHash }) => {
  const pool = await poolPromise;

  await pool
    .request()
    .input('Nombre', sql.VarChar, nombre)
    .input('Usuario', sql.VarChar, email)
    .input('Hashcode', sql.VarChar, passwordHash)
    .input('Estado', sql.Bit, 0)
    .query(`
      INSERT INTO Usuario
      (
        EmpleadoId,
        Nombre,
        Usuario,
        Hashcode,
        Estado,
        RolId
      )
      VALUES
      (
        NULL,
        @Nombre,  
        @Usuario,
        @Hashcode,
        @Estado,
        NULL
      )
    `);
};

const listarPendientes = async () => {
  const pool = await poolPromise;

  const result = await pool.request().query(`
    SELECT 
      UsuarioId,
      Nombre,
      Usuario AS Email,
      RolId,
      Estado
    FROM Usuario
    WHERE Estado = 0
      AND RolId IS NULL
  `);

  return result.recordset;
};

const aprobar = async ({ usuarioId, rolId }) => {
  const pool = await poolPromise;

  await pool
    .request()
    .input('UsuarioId', sql.Int, usuarioId)
    .input('RolId', sql.Int, rolId)
    .query(`
      UPDATE Usuario
      SET 
        Estado = 1,
        RolId = @RolId
      WHERE UsuarioId = @UsuarioId
    `);
};

const rechazar = async (usuarioId) => {
  const pool = await poolPromise;

  await pool
    .request()
    .input('UsuarioId', sql.Int, usuarioId)
    .query(`
      DELETE FROM Usuario
      WHERE UsuarioId = @UsuarioId
        AND Estado = 0
    `);
};

module.exports = {
  buscarPorCorreo,
  crearSolicitud,
  listarPendientes,
  aprobar,
  rechazar,
};