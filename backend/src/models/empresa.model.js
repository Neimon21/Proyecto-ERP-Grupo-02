const crearEmpresaModel = (data = {}) => ({
  EmpresaId: data.EmpresaId || null,
  EmpresaDescripcion: data.EmpresaDescripcion || "",
  EmpresaRUC: data.EmpresaRUC || "",
  EmpresaDireccion: data.EmpresaDireccion || "",
  EmpresaTelefono: data.EmpresaTelefono || "",
  EmpresaEstado: data.EmpresaEstado ?? true,
});

module.exports = {
  crearEmpresaModel,
};