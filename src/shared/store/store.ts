import AsyncStorage from "@react-native-async-storage/async-storage";
import { configureStore, createListenerMiddleware } from "@reduxjs/toolkit";
import authReducer from "./auth/auth.slice";
import { AUTH_STORAGE_KEY } from "./auth/auth.storage";
import { login, logout } from "./auth/auth.thunk";
import patientsReducer from "./patients/patients.slice";

const listenerMiddleware = createListenerMiddleware();

listenerMiddleware.startListening({
    actionCreator: login.fulfilled,
    effect: async (action) => {
        await AsyncStorage.setItem(
            AUTH_STORAGE_KEY,
            JSON.stringify(action.payload.user)
        );
    },
});

listenerMiddleware.startListening({
    actionCreator: logout.fulfilled,
    effect: async () => {
        await AsyncStorage.removeItem(AUTH_STORAGE_KEY);
    },
});

export const appStore = configureStore({
    reducer: {
        auth: authReducer,
        patients: patientsReducer,
    },
    middleware: (getDefaultMiddleware) =>
        getDefaultMiddleware().prepend(listenerMiddleware.middleware),
});

export type RootState = ReturnType<typeof appStore.getState>;
export type AppDispatch = typeof appStore.dispatch;
