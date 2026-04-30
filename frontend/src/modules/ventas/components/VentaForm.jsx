import { useState } from 'react';

const VentaForm = ({ onSubmit }) => {
  const [form, setForm] = useState({
    clienteId: '',
    total: '',
  });

  const handleChange = (e) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    await onSubmit({
      ...form,
      total: Number(form.total),
    });

    setForm({
      clienteId: '',
      total: '',
    });
  };

  return (
    <form onSubmit={handleSubmit}>
      <input
        name="clienteId"
        placeholder="ID del cliente"
        value={form.clienteId}
        onChange={handleChange}
      />

      <input
        name="total"
        placeholder="Total"
        type="number"
        value={form.total}
        onChange={handleChange}
      />

      <button type="submit">Registrar venta</button>
    </form>
  );
};

export default VentaForm;