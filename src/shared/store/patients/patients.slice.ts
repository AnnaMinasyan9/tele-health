import { createSlice } from "@reduxjs/toolkit";
import { RequestStatus } from "@shared/models";
import { initialState } from "./patients.state";
import { getPatientsByDoctorId } from "./patients.thunk";

const patientsSlice = createSlice({
  name: "patients",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(getPatientsByDoctorId.pending, (state) => {
        state.status = RequestStatus.PENDING;
        state.error = null;
      })
      .addCase(getPatientsByDoctorId.fulfilled, (state, action) => {
        state.status = RequestStatus.SUCCEEDED;
        state.error = null;
        const { doctorId } = action.meta.arg;
        state.doctorPatients[doctorId] = action.payload;
      })
      .addCase(getPatientsByDoctorId.rejected, (state, action) => {
        state.status = RequestStatus.FAILED;
        state.error = action.payload ?? action.error.message ?? "Unknown error";
      });
  },
});

export default patientsSlice.reducer;
