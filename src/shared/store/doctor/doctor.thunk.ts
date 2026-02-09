import { createAsyncThunk } from "@reduxjs/toolkit";
import { mockAPIServer } from "@shared/mock";
import { API_ROUTES } from "@shared/mock/lib/routes";
import { Doctor } from "@shared/models";
import axios from "axios";

export const getDoctorById = createAsyncThunk<
    Doctor,
    string,
    { rejectValue: string }
>("doctor/getDoctorById", async (id, { rejectWithValue, fulfillWithValue }) => {
    try {
        const response = await mockAPIServer.get<Doctor>(API_ROUTES.DOCTOR_BY_ID.replace(":doctorId", id));
        return fulfillWithValue(response.data);
    } catch (err: unknown) {
        if (axios.isAxiosError(err)) {
            return rejectWithValue(err.response?.data?.message ?? "Unknown error");
        }
        return rejectWithValue("Unknown error");
    }
});