import { createSlice } from "@reduxjs/toolkit";
import { RequestStatus } from "@shared/models";
import { initialState } from "./auth.state";
import { login, logout, switchRole } from "./auth.thunk";

const authSlice = createSlice({
    name: "auth",
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(login.pending, (state) => {
                state.status = RequestStatus.PENDING;
                state.error = null;
            })
            .addCase(login.fulfilled, (state, action) => {
                state.status = RequestStatus.SUCCEEDED;
                state.user = action.payload.user;
                state.role = action.payload.user.role;
                state.error = null;
            })
            .addCase(login.rejected, (state, action) => {
                state.status = RequestStatus.FAILED;
                state.error = action.payload ?? action.error.message ?? null;
            })
            .addCase(switchRole.pending, (state) => {
                state.status = RequestStatus.PENDING;
                state.error = null;
            })
            .addCase(switchRole.fulfilled, (state, action) => {
                state.status = RequestStatus.SUCCEEDED;
                state.user = action.payload.user;
                state.role = action.payload.user.role;
                state.error = null;
            })
            .addCase(switchRole.rejected, (state, action) => {
                state.status = RequestStatus.FAILED;
                state.error = action.payload ?? action.error.message ?? null;
            })
            .addCase(logout.pending, (state) => {
                state.status = RequestStatus.PENDING;
                state.error = null;
            })
            .addCase(logout.fulfilled, (state) => {
                state.status = RequestStatus.SUCCEEDED;
                state.user = null;
                state.role = null;
            })
            .addCase(logout.rejected, (state, action) => {
                state.status = RequestStatus.FAILED;
                state.error = action.payload ?? action.error.message ?? null;
            });
    }
})
export default authSlice.reducer;
