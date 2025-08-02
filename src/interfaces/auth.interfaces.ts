export interface LoginFormData {
  email: string;
  password: string;
}

export interface AuthState {
  isAuthenticated: boolean;
  userEmail: string | null;
  error: string | null;
}
