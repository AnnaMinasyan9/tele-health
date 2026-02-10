import { createAsyncThunk } from "@reduxjs/toolkit";
import { API_ROUTES } from "@shared/mock/lib/routes";
import { mockAPIServer } from "@shared/mock/server";
import { CreateSessionPayload, Session } from "@shared/models";
import axios from "axios";

export const getSessionsByPatientId = createAsyncThunk<
    Session[],
    string,
    { rejectValue: string }
>("session/getSessionsByPatientId", async (patientId, { rejectWithValue, fulfillWithValue }) => {
    try {
        const response = await mockAPIServer.get<Session[]>(API_ROUTES.SESSIONS_BY_PATIENT_ID.replace(":patientId", patientId));
        return fulfillWithValue(response.data);
    } catch (err: unknown) {
        if (axios.isAxiosError(err)) {
            return rejectWithValue(err.response?.data?.message ?? "Unknown error");
        }
        return rejectWithValue("Unknown error");
    }
});
export const getSessionsByDoctorId = createAsyncThunk<
    Session[],
    { doctorId: string; search?: string },
    { rejectValue: string }
>("session/getSessionsByDoctorId", async (arg, { rejectWithValue, fulfillWithValue }) => {
    try {
        const { doctorId, search } = arg;
        const response = await mockAPIServer.get<Session[]>(
            API_ROUTES.SESSIONS_BY_DOCTOR_ID.replace(":doctorId", doctorId),
            search ? { params: { search } } : undefined
        );
        return fulfillWithValue(response.data);
    } catch (err: unknown) {
        if (axios.isAxiosError(err)) {
            return rejectWithValue(err.response?.data?.message ?? "Unknown error");
        }
        return rejectWithValue("Unknown error");
    }
});
export const createSession = createAsyncThunk<
    Session,
    CreateSessionPayload,
    { rejectValue: string }
>("session/createSession", async (payload, { rejectWithValue, fulfillWithValue }) => {
    try {
        const response = await mockAPIServer.post<Session>(API_ROUTES.CREATE_SESSION, payload);
        return fulfillWithValue(response.data);
    } catch (err: unknown) {
        if (axios.isAxiosError(err)) {
            return rejectWithValue(err.response?.data?.message ?? "Unknown error");
        }
        return rejectWithValue("Unknown error");
    }
});