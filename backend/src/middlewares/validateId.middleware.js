const validateId = (req, res, next) => {
  const { id } = req.params;

  if (!id || String(id).trim() === "") {
    return res.status(400).json({
      message: "Id inválido",
    });
  }

  next();
};

module.exports = validateId;