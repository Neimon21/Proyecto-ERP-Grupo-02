import api from '../../../services/api';

export const getVentas = () => api.get('/ventas');

export const getVentaById = (id) => api.get(`/ventas/${id}`);

export const createVenta = (data) => api.post('/ventas', data);

export const updateVenta = (id, data) => api.put(`/ventas/${id}`, data);

export const deleteVenta = (id) => api.delete(`/ventas/${id}`);