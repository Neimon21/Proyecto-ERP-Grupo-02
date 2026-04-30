const validateFields = (requiredFields = []) => {
  return (req, res, next) => {
    const missingFields = requiredFields.filter(
      (field) =>
        req.body[field] === undefined ||
        req.body[field] === null ||
        req.body[field] === ""
    );

    if (missingFields.length > 0) {
      return res.status(400).json({
        message: "Faltan campos requeridos",
        missingFields,
      });
    }

    next();
  };
};

module.exports = validateFields;