import AsyncStorage from "@react-native-async-storage/async-storage";
import { createAsyncThunk } from "@reduxjs/toolkit";
import { mockAPIServer } from "@shared/mock";
import { API_ROUTES } from "@shared/mock/lib/routes";
import type { Credential, LoginResponse, User } from "@shared/models";
import axios from "axios";
import { AUTH_STORAGE_KEY } from "./auth.storage";

export const hydrateAuth = createAsyncThunk<
  User | null,
  void,
  { rejectValue: string }
>("auth/hydrate", async (_, { rejectWithValue, fulfillWithValue }) => {
  try {
    const raw = await AsyncStorage.getItem(AUTH_STORAGE_KEY);
    if (!raw) return fulfillWithValue(null);

    const user = JSON.parse(raw) as User;
    return fulfillWithValue(user);
  } catch (_) {
    return rejectWithValue("Failed to restore session");
  }
});

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