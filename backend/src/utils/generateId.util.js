const generateId = (prefix = "") => {
  const random = Math.floor(Math.random() * 1000000);
  return `${prefix}${random}`;
};

module.exports = generateId;