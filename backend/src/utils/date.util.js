const getCurrentDate = () => {
  return new Date();
};

const formatDate = (date) => {
  return new Date(date).toISOString();
};

module.exports = {
  getCurrentDate,
  formatDate,
};