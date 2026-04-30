const repository = require("../repositories/categoria.repository");

const listar = async () => {
  return await repository.listar();
};

const obtenerPorId = async (id) => {
  return await repository.obtenerPorId(id);
};

const crear = async (data) => {
  if (!data.Nombre) {
    throw new Error("Nombre requerido");
  }

  return await repository.crear(data);
};

const actualizar = async (id, data) => {
  return await repository.actualizar(id, data);
};

const eliminar = async (id) => {
  return await repository.eliminar(id);
};

module.exports = {
  listar,
  obtenerPorId,
  crear,
  actualizar,
  eliminar,
};