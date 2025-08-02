import type { LoginFormData } from "../interfaces/auth.interfaces";

export const validateEmail = (email: string): boolean => {
  const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return re.test(email);
};

export const validatePassword = (password: string): boolean => {
  return password.length >= 6;
};

export const validateLoginForm = (
  formData: LoginFormData
): { valid: boolean; errors: Partial<LoginFormData> } => {
  const errors: Partial<LoginFormData> = {};

  if (!formData.email) {
    errors.email = "Email is required";
  } else if (!validateEmail(formData.email)) {
    errors.email = "Please enter a valid email";
  }

  if (!formData.password) {
    errors.password = "Password is required";
  } else if (!validatePassword(formData.password)) {
    errors.password = "Password must be at least 6 characters";
  }

  return {
    valid: Object.keys(errors).length === 0,
    errors,
  };
};
