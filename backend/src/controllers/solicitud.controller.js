const solicitudService = require('../services/solicitud.service');

const crearSolicitud = async (req, res) => {
  try {
    const { nombre, email, password } = req.body;

    if (!nombre || !email || !password) {
      return res.status(400).json({
        message: 'Nombre, correo y contraseña son obligatorios',
      });
    }

    await solicitudService.crearSolicitud({
      nombre,
      email,
      password,
    });

    return res.status(201).json({
      message: 'Solicitud enviada correctamente',
    });
  } catch (error) {
    return res.status(500).json({
      message: error.message || 'Error al crear la solicitud',
    });
  }
};

const listarPendientes = async (req, res) => {
  try {
    const solicitudes = await solicitudService.listarPendientes();

    return res.json(solicitudes);
  } catch (error) {
    return res.status(500).json({
      message: error.message || 'Error al listar solicitudes',
    });
  }
};

const aprobarSolicitud = async (req, res) => {
  try {
    const { id } = req.params;
    const { rolId } = req.body;

    await solicitudService.aprobarSolicitud({
      usuarioId: Number(id),
      rolId: Number(rolId),
    });

    return res.json({
      message: 'Usuario aprobado correctamente',
    });
  } catch (error) {
    return res.status(500).json({
      message: error.message || 'Error al aprobar solicitud',
    });
  }
};

const rechazarSolicitud = async (req, res) => {
  try {
    const { id } = req.params;

    await solicitudService.rechazarSolicitud(Number(id));

    return res.json({
      message: 'Solicitud rechazada correctamente',
    });
  } catch (error) {
    return res.status(500).json({
      message: error.message || 'Error al rechazar solicitud',
    });
  }
};

module.exports = {
  crearSolicitud,
  listarPendientes,
  aprobarSolicitud,
  rechazarSolicitud,
};