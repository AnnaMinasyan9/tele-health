import { createAsyncThunk } from "@reduxjs/toolkit";
import { mockAPIServer } from "@shared/mock";
import { API_ROUTES } from "@shared/mock/lib/routes";
import type { Patient } from "@shared/models";
import axios from "axios";

export const getPatientsByDoctorId = createAsyncThunk<
  Patient[],
  { doctorId: string; search?: string },
  { rejectValue: string }
>(
  "patients/getPatientsByDoctorId",
  async (arg, { rejectWithValue, fulfillWithValue }) => {
  try {
    const { doctorId, search } = arg;
    const response = await mockAPIServer.get<Patient[]>(
      API_ROUTES.PATIENTS_BY_DOCTOR_ID.replace(":doctorId", doctorId),
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
