const bcrypt = require('bcryptjs');
const solicitudRepository = require('../repositories/solicitud.repository');

const crearSolicitud = async ({ nombre, email, password }) => {
  const existe = await solicitudRepository.buscarPorCorreo(email);

  if (existe) {
    throw new Error('El usuario ya existe');
  }

  const passwordHash = await bcrypt.hash(password, 10);

  return await solicitudRepository.crearSolicitud({
    nombre,
    email,
    passwordHash,
  });
};

const listarPendientes = async () => {
  return await solicitudRepository.listarPendientes();
};

const aprobarSolicitud = async ({ usuarioId, rolId }) => {
  if (!rolId) {
    throw new Error('Debe seleccionar un rol');
  }

  return await solicitudRepository.aprobar({
    usuarioId,
    rolId,
  });
};

const rechazarSolicitud = async (usuarioId) => {
  return await solicitudRepository.rechazar(usuarioId);
};

module.exports = {
  crearSolicitud,
  listarPendientes,
  aprobarSolicitud,
  rechazarSolicitud,
};