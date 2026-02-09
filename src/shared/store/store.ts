import { configureStore } from "@reduxjs/toolkit";
import authReducer from "./auth/auth.slice";
import doctorReducer from "./doctor/doctor.slice";
import patientsReducer from "./patients/patients.slice";
import sessionReducer from "./session/session.slice";

export const appStore = configureStore({
    reducer: {
        auth: authReducer,
        patients: patientsReducer,
        doctor: doctorReducer,
        sessions: sessionReducer,
    }
});

export type RootState = ReturnType<typeof appStore.getState>;
export type AppDispatch = typeof appStore.dispatch;
