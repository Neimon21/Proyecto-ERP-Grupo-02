const profileService = require('../services/profile.service');

const obtenerPerfil = async (req, res) => {
  try {
    const { id } = req.params;

    const perfil = await profileService.obtenerPerfil(Number(id));

    if (!perfil) {
      return res.status(404).json({
        message: 'Usuario no encontrado',
      });
    }

    return res.json(perfil);
  } catch (error) {
    return res.status(500).json({
      message: error.message || 'Error al obtener perfil',
    });
  }
};

const actualizarPerfil = async (req, res) => {
  try {
    const { id } = req.params;
    const { nombre, email, password } = req.body;

    await profileService.actualizarPerfil({
      usuarioId: Number(id),
      nombre,
      email,
      password,
    });

    return res.json({
      message: 'Perfil actualizado correctamente',
    });
  } catch (error) {
    return res.status(500).json({
      message: error.message || 'Error al actualizar perfil',
    });
  }
};

module.exports = {
  obtenerPerfil,
  actualizarPerfil,
};