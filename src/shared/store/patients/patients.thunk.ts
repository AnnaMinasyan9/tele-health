import { createAsyncThunk } from "@reduxjs/toolkit";
import { mockAPIServer } from "@shared/mock";
import { API_ROUTES } from "@shared/mock/lib/routes";
import type { Patient } from "@shared/models";
import axios from "axios";

export const getPatientsByDoctorId = createAsyncThunk<
  Patient[],
  string,
  { rejectValue: string }
>("patients/getPatientsByDoctorId", async (doctorId, { rejectWithValue, fulfillWithValue }) => {
  try {
    const response = await mockAPIServer.get<Patient[]>(
      API_ROUTES.PATIENTS_BY_DOCTOR_ID.replace(":doctorId", doctorId),
    );
    return fulfillWithValue(response.data);
  } catch (err: unknown) {
    if (axios.isAxiosError(err)) {
      return rejectWithValue(err.response?.data?.message ?? "Unknown error");
    }
    return rejectWithValue("Unknown error");
  }
});
