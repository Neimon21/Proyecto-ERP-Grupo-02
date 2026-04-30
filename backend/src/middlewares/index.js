module.exports = {
  errorMiddleware: require("./error.middleware"),
  notFoundMiddleware: require("./notFound.middleware"),
  validateFields: require("./validateFields.middleware"),
  validateId: require("./validateId.middleware"),
  authMiddleware: require("./auth.middleware"),
  roleMiddleware: require("./role.middleware"),
  loggerMiddleware: require("./logger.middleware"),
};