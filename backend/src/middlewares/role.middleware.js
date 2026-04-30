const roleMiddleware = (...allowedRoles) => {
  return (req, res, next) => {
    const userRole = req.user?.Rol || req.user?.rol;

    if (!userRole) {
      return res.status(403).json({
        message: "Rol no disponible",
      });
    }

    if (!allowedRoles.includes(userRole)) {
      return res.status(403).json({
        message: "No tienes permisos para esta acción",
      });
    }

    next();
  };
};

module.exports = roleMiddleware;