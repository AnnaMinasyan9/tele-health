import { User, UserRole } from "./user";

export interface Credential {
  username: string;
  password: string;
}

export interface AuthSession {
  id: string;
  role: UserRole;
}

export interface LoginResponse {
  user: User;
}