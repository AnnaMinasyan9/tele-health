import AsyncStorage from "@react-native-async-storage/async-storage";
import { MOCK_SESSION_KEY } from "@shared/configs";
import { InternalAxiosRequestConfig } from "axios";
import { generateResponse } from "../helpers";
import { STATUS_CODES } from "../status-codes";

export const handleAuthLogout = async (
  config: InternalAxiosRequestConfig
) => {
  await AsyncStorage.removeItem(MOCK_SESSION_KEY);

  return generateResponse(config, STATUS_CODES.OK, { success: true });
};
