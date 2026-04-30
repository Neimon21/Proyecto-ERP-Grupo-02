import { useState } from "react";
import { login } from "../services/authService";

export const useAuth = () => {
  const [loading, setLoading] = useState(false);

  const loginUser = async (credentials) => {
    try {
      setLoading(true);

      const data = await login(credentials);

      localStorage.setItem("token", data.token);

      return data;
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

  return {
    loginUser,
    loading,
  };
};