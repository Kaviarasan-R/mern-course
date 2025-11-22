export interface LoginPayload {
  email: string;
  password: string;
}

export interface RegisterPayload {
  name: string;
  username: string;
  email: string;
  password: string;
}

export interface AuthResponse {
  token: string;
  id?: string;
  user?: {
    id: string;
    name: string;
    email: string;
    username: string;
  };
}

export interface AuthState {
  token: string | null;
  user: {
    id: string;
    name: string;
    email: string;
    username: string;
  } | null;
  status: "idle" | "loading" | "succeeded" | "failed";
  error: string | null;
}
