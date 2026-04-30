const service = require("../services/categoria.service");

const listar = async (req, res) => {
  try {
    const data = await service.listar();
    res.json(data);
  } catch (error) {
    res.status(500).json({ message: "Error al listar categorias", error: error.message });
  }
};

const obtenerPorId = async (req, res) => {
  try {
    const data = await service.obtenerPorId(req.params.id);
    if (!data) {
      return res.status(404).json({ message: "Categoria no encontrada" });
    }
    res.json(data);
  } catch (error) {
    res.status(500).json({ message: "Error al obtener categoria", error: error.message });
  }
};

const crear = async (req, res) => {
  try {
    const data = await service.crear(req.body);
    res.status(201).json(data);
  } catch (error) {
    res.status(400).json({ message: "Error al crear categoria", error: error.message });
  }
};

const actualizar = async (req, res) => {
  try {
    const data = await service.actualizar(req.params.id, req.body);
    res.json(data);
  } catch (error) {
    res.status(400).json({ message: "Error al actualizar categoria", error: error.message });
  }
};

const eliminar = async (req, res) => {
  try {
    const data = await service.eliminar(req.params.id);
    res.json(data);
  } catch (error) {
    res.status(400).json({ message: "Error al eliminar categoria", error: error.message });
  }
};

module.exports = { listar, obtenerPorId, crear, actualizar, eliminar };