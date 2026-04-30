import { useState } from "react";

import LoginInput from "./LoginInput";
import { useAuth } from "../hooks/useAuth";

const LoginForm = () => {
  const { loginUser, loading } = useAuth();

  const [form, setForm] = useState({
    email: "",
    password: "",
  });

  const handleChange = (e) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    await loginUser(form);
  };

  return (
    <form onSubmit={handleSubmit}>
      <LoginInput
        type="email"
        name="email"
        placeholder="Correo"
        value={form.email}
        onChange={handleChange}
      />

      <LoginInput
        type="password"
        name="password"
        placeholder="Contraseña"
        value={form.password}
        onChange={handleChange}
      />

      <button type="submit">
        {loading ? "Ingresando..." : "Ingresar"}
      </button>
    </form>
  );
};

export default LoginForm;