const { pool } = require("../config/db");

const listar = async () => {
  const connection = await pool;

  const result = await connection
    .request()
    .query("SELECT * FROM Categoria");

  return result.recordset;
};

const obtenerPorId = async (id) => {
  const connection = await pool;

  const result = await connection
    .request()
    .input("id", id)
    .query("SELECT * FROM Categoria WHERE CategoriaId = @id");

  return result.recordset[0];
};

const crear = async (data) => {
  const connection = await pool;

  const result = await connection
    .request()
    .input("Nombre", data.Nombre)
    .input("Descripcion", data.Descripcion)
    .query(`
      INSERT INTO Categoria (Nombre, Descripcion, Estado)
      VALUES (@Nombre, @Descripcion, 1);

      SELECT SCOPE_IDENTITY() AS id;
    `);

  return result.recordset[0];
};

const actualizar = async (id, data) => {
  const connection = await pool;

  await connection
    .request()
    .input("id", id)
    .input("Nombre", data.Nombre)
    .input("Descripcion", data.Descripcion)
    .query(`
      UPDATE Categoria
      SET Nombre = @Nombre,
          Descripcion = @Descripcion
      WHERE CategoriaId = @id
    `);

  return { message: "Categoria actualizada" };
};

const eliminar = async (id) => {
  const connection = await pool;

  await connection
    .request()
    .input("id", id)
    .query("DELETE FROM Categoria WHERE CategoriaId = @id");

  return { message: "Categoria eliminada" };
};

module.exports = {
  listar,
  obtenerPorId,
  crear,
  actualizar,
  eliminar,
};