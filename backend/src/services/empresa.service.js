const repository = require("../repositories/empresa.repository");
const { crearEmpresaModel } = require("../models/empresa.model");

const listar = async () => {
  return await repository.listar();
};

const obtenerPorId = async (id) => {
  if (!id) {
    throw new Error("Id requerido");
  }

  const empresa = await repository.obtenerPorId(id);

  if (!empresa) {
    throw new Error("Empresa no encontrada");
  }

  return empresa;
};

const crear = async (data) => {
  const empresa = crearEmpresaModel(data);

  if (!empresa.EmpresaId) {
    throw new Error("EmpresaId es obligatorio");
  }

  if (!empresa.EmpresaRUC) {
    throw new Error("RUC es obligatorio");
  }

  return await repository.crear(empresa);
};

const actualizar = async (id, data) => {
  if (!id) {
    throw new Error("Id requerido");
  }

  return await repository.actualizar(id, data);
};

const eliminar = async (id) => {
  if (!id) {
    throw new Error("Id requerido");
  }

  return await repository.eliminar(id);
};

module.exports = {
  listar,
  obtenerPorId,
  crear,
  actualizar,
  eliminar,
};