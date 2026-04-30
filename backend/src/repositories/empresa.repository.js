const { pool } = require("../config/db");

const listar = async () => {
  const connection = await pool;

  const result = await connection
    .request()
    .query("SELECT * FROM Empresa");

  return result.recordset;
};

const obtenerPorId = async (id) => {
  const connection = await pool;

  const result = await connection
    .request()
    .input("EmpresaId", id)
    .query("SELECT * FROM Empresa WHERE EmpresaId = @EmpresaId");

  return result.recordset[0];
};

const crear = async (data) => {
  const connection = await pool;

  await connection
    .request()
    .input("EmpresaId", data.EmpresaId)
    .input("EmpresaDescripcion", data.EmpresaDescripcion)
    .input("EmpresaRUC", data.EmpresaRUC)
    .input("EmpresaDireccion", data.EmpresaDireccion)
    .input("EmpresaTelefono", data.EmpresaTelefono)
    .input("EmpresaEstado", data.EmpresaEstado ?? true)
    .query(`
      INSERT INTO Empresa (
        EmpresaId,
        EmpresaDescripcion,
        EmpresaRUC,
        EmpresaDireccion,
        EmpresaTelefono,
        EmpresaEstado
      )
      VALUES (
        @EmpresaId,
        @EmpresaDescripcion,
        @EmpresaRUC,
        @EmpresaDireccion,
        @EmpresaTelefono,
        @EmpresaEstado
      )
    `);

  return { message: "Empresa creada correctamente" };
};

const actualizar = async (id, data) => {
  const connection = await pool;

  await connection
    .request()
    .input("EmpresaId", id)
    .input("EmpresaDescripcion", data.EmpresaDescripcion)
    .input("EmpresaRUC", data.EmpresaRUC)
    .input("EmpresaDireccion", data.EmpresaDireccion)
    .input("EmpresaTelefono", data.EmpresaTelefono)
    .input("EmpresaEstado", data.EmpresaEstado)
    .query(`
      UPDATE Empresa
      SET
        EmpresaDescripcion = @EmpresaDescripcion,
        EmpresaRUC = @EmpresaRUC,
        EmpresaDireccion = @EmpresaDireccion,
        EmpresaTelefono = @EmpresaTelefono,
        EmpresaEstado = @EmpresaEstado
      WHERE EmpresaId = @EmpresaId
    `);

  return { message: "Empresa actualizada correctamente" };
};

const eliminar = async (id) => {
  const connection = await pool;

  await connection
    .request()
    .input("EmpresaId", id)
    .query("DELETE FROM Empresa WHERE EmpresaId = @EmpresaId");

  return { message: "Empresa eliminada correctamente" };
};

module.exports = {
  listar,
  obtenerPorId,
  crear,
  actualizar,
  eliminar,
};