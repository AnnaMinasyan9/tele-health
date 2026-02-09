import { RequestStatus, User, UserRole } from "@shared/models";

export interface AuthState {
  user: User | null;
  role: UserRole | null;
  status: RequestStatus;
  error: string | null;
}

export const initialState: AuthState = {
    user: null,
    role: null,
    status: RequestStatus.IDLE,
    error: null,
};
