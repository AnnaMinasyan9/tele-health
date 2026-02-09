import { createSlice } from "@reduxjs/toolkit";
import { RequestStatus } from "@shared/models";
import { initialState } from "./session.state";
import { getSessionsByDoctorId, getSessionsByPatientId } from "./session.thunk";

export const sessionSlice = createSlice({
    name: "session",
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(getSessionsByPatientId.pending, (state) => {
                state.patientSessionsStatus = RequestStatus.PENDING;
                state.patientSessionsError = null;
            })
            .addCase(getSessionsByPatientId.fulfilled, (state, action) => {
                state.patientSessionsStatus = RequestStatus.SUCCEEDED;
                state.patientSessionsError = null;
                state.patientSessions[action.meta.arg] = action.payload;
            })
            .addCase(getSessionsByPatientId.rejected, (state, action) => {
                state.patientSessionsStatus = RequestStatus.FAILED;
                state.patientSessionsError = action.payload ?? action.error.message ?? "Unknown error";
            })
            .addCase(getSessionsByDoctorId.pending, (state) => {
                state.doctorSessionsStatus = RequestStatus.PENDING;
                state.doctorSessionsError = null;
            })
            .addCase(getSessionsByDoctorId.fulfilled, (state, action) => {
                state.doctorSessionsStatus = RequestStatus.SUCCEEDED;
                state.doctorSessionsError = null;
                state.doctorSessions[action.meta.arg] = action.payload;
            })
            .addCase(getSessionsByDoctorId.rejected, (state, action) => {
                state.doctorSessionsStatus = RequestStatus.FAILED;
                state.doctorSessionsError = action.payload ?? action.error.message ?? "Unknown error";
            })
    }
})

export default sessionSlice.reducer;
