import { createAsyncThunk } from "@reduxjs/toolkit";
import { DEMO_CREDENTIALS_BY_ROLE } from "@shared/configs";
import { mockAPIServer } from "@shared/mock";
import { API_ROUTES } from "@shared/mock/lib/routes";
import type { Credential, LoginResponse } from "@shared/models";
import { UserRole } from "@shared/models";
import axios from "axios";

export const login = createAsyncThunk<
  LoginResponse,
  Credential,
  { rejectValue: string }
>("auth/login", async (payload, { rejectWithValue, fulfillWithValue }) => {
  try {
    const response = await mockAPIServer.post<LoginResponse>(
      API_ROUTES.AUTH_LOGIN,
      payload
    );
    return fulfillWithValue(response.data);
  } catch (err: unknown) {
    if (axios.isAxiosError(err)) {
        return rejectWithValue(err.response?.data?.message ?? "Unknown error");
    } 
    return rejectWithValue("Unknown error");
  }
});

export const logout = createAsyncThunk<
  void,
  void,
  { rejectValue: string }
>("auth/logout", async (_, { rejectWithValue }) => {
  try {
    await mockAPIServer.post<void>(API_ROUTES.AUTH_LOGOUT);
  } catch (_) {
    return rejectWithValue("Unknown error");
  }
});

export const switchRole = createAsyncThunk<
  LoginResponse,
  UserRole,
  { rejectValue: string }
>("auth/switchRole", async (role, { rejectWithValue, fulfillWithValue }) => {
  try {
    const credentials = DEMO_CREDENTIALS_BY_ROLE[role];
    const response = await mockAPIServer.post<LoginResponse>(
      API_ROUTES.AUTH_LOGIN,
      credentials
    );
    return fulfillWithValue(response.data);
  } catch (err: unknown) {
    if (axios.isAxiosError(err)) {
      return rejectWithValue(err.response?.data?.message ?? "Unknown error");
    }
    return rejectWithValue("Unknown error");
  }
});
