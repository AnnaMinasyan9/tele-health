import axios, { AxiosAdapter } from "axios";

import { Doctor, Patient } from "@shared/models";
import credentialsJson from "./db/credentials.json";
import doctorsJson from "./db/doctors.json";
import patientsJson from "./db/patients.json";
import { handleAuthLogin } from "./lib/handlers/login.handler";
import { handleAuthLogout } from "./lib/handlers/logout.handler";
import { generateResponse } from "./lib/helpers";
import { VALIDATION_MESSAGES } from "./lib/messages";
import { API_ROUTES } from "./lib/routes";
import { STATUS_CODES } from "./lib/status-codes";
import { MockDB } from "./models/db";

const db: MockDB = {
  credentials: credentialsJson,
  doctors: doctorsJson as Array<Doctor>,
  patients: patientsJson as Array<Patient>,
};

const adapter: AxiosAdapter = async (config) => {
  const url = config.url || "";

  switch (true) {
    case url === API_ROUTES.AUTH_LOGIN:
      return handleAuthLogin(db, config);

    case url === API_ROUTES.AUTH_LOGOUT:
      return handleAuthLogout(config);

    default:
      return generateResponse(config, STATUS_CODES.NOT_FOUND, {
        message: VALIDATION_MESSAGES.NOT_FOUND,
      });
  }
};

export const mockAPIServer = axios.create({
  baseURL: "/api",
  adapter,
});
