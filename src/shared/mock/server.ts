import axios, { AxiosAdapter } from "axios";

import { Doctor, Patient } from "@shared/models";
import credentialsJson from "./db/credentials.json";
import doctorsJson from "./db/doctors.json";
import patientsJson from "./db/patients.json";
import { API_ROUTES, generateResponse, STATUS_CODES, VALIDATION_MESSAGES } from "./lib";
import { handleAuthLogin, handleAuthLogout, handlePatientsByDoctorId } from "./lib/handlers";
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

    case /^\/patients\/[^/]+\/patients$/.test(url):
      return handlePatientsByDoctorId(db, config);

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
