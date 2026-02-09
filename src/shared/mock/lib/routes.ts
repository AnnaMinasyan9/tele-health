export const API_ROUTES = {
  AUTH_LOGIN: "/auth/login",
  AUTH_LOGOUT: "/auth/logout",
  PATIENTS_BY_DOCTOR_ID: "/patients/:doctorId/patients",
  DOCTOR_BY_ID: "/doctors/:doctorId",
  SESSIONS_BY_PATIENT_ID: "/sessions/patient/:patientId",
} as const;