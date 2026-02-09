import { Credential, UserRole } from "../models";

export const DEMO_CREDENTIALS_BY_ROLE: Record<UserRole, Credential> = {
    [UserRole.Doctor]: { username: "dr.john.smith", password: "doctor" },
    [UserRole.Patient]: { username: "anna.brown", password: "patient" },
};
