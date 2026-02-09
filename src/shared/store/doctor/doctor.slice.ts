import { createSlice } from "@reduxjs/toolkit";
import { RequestStatus } from "@shared/models";
import { initialState } from "./doctor.state";
import { getDoctorById } from "./doctor.thunk";

export const doctorSlice = createSlice({
    name: "doctor",
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(getDoctorById.pending, (state) => {
                state.status = RequestStatus.PENDING;
                state.error = null;
            })
            .addCase(getDoctorById.fulfilled, (state, action) => {
                state.status = RequestStatus.SUCCEEDED;
                state.error = null;
                state.doctor = action.payload;
            })
            .addCase(getDoctorById.rejected, (state, action) => {
                state.status = RequestStatus.FAILED;
                state.error = action.payload ?? action.error.message ?? "Unknown error";
            })
    }
});

export default doctorSlice.reducer;