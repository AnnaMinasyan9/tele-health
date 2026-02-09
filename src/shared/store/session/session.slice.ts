import { createSlice } from "@reduxjs/toolkit";
import { RequestStatus } from "@shared/models";
import { initialState } from "./session.state";
import { getSessionsByPatientId } from "./session.thunk";

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
    }
})

export default sessionSlice.reducer;
