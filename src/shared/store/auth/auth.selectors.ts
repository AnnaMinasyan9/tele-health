import { RootState } from "../store";

export const selectCurrentUser = (state: RootState) => state.auth.user;
export const selectIsLoggedIn = (state: RootState) => !!state.auth.user;
export const selectCurrentUserRole = (state: RootState) => state.auth.role;