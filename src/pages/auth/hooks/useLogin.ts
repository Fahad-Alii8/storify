import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-hot-toast";
import type { LoginFormData } from "../../../interfaces/auth.interfaces";

export const useLogin = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const navigate = useNavigate();

  const login = (formData: LoginFormData) => {
    setLoading(true);
    setError(null);

    setTimeout(() => {
      if (
        formData.email === "admin@example.com" &&
        formData.password === "admin123"
      ) {
        localStorage.setItem("isAuthenticated", "true");
        localStorage.setItem("userEmail", formData.email);
        toast.success("Login successful ✅");
        navigate("/dashboard");
      } else {
        const errorMsg = "Invalid email or password";
        setError(errorMsg);
        toast.error(errorMsg);
      }
      setLoading(false);
    }, 1000);
  };

  return { login, loading, error };
};
