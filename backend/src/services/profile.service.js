const bcrypt = require('bcryptjs');
const profileRepository = require('../repositories/profile.repository');

const obtenerPerfil = async (usuarioId) => {
  return await profileRepository.obtenerPerfil(usuarioId);
};

const actualizarPerfil = async ({ usuarioId, nombre, email, password }) => {
  let passwordHash = null;

  if (password && password.trim() !== '') {
    passwordHash = await bcrypt.hash(password, 10);
  }

  return await profileRepository.actualizarPerfil({
    usuarioId,
    nombre,
    email,
    passwordHash,
  });
};

module.exports = {
  obtenerPerfil,
  actualizarPerfil,
};