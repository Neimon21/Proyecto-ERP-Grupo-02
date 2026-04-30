import { useEffect, useState } from 'react';
import { createVenta, getVentas } from '../services/ventas.service';

export const useVentas = () => {
  const [ventas, setVentas] = useState([]);
  const [loading, setLoading] = useState(true);

  const cargarVentas = async () => {
    try {
      setLoading(true);
      const { data } = await getVentas();
      setVentas(data.data || data);
    } catch (error) {
      console.error('Error cargando ventas:', error);
    } finally {
      setLoading(false);
    }
  };

  const registrarVenta = async (venta) => {
    await createVenta(venta);
    await cargarVentas();
  };

  useEffect(() => {
    cargarVentas();
  }, []);

  return {
    ventas,
    loading,
    cargarVentas,
    registrarVenta,
  };
};