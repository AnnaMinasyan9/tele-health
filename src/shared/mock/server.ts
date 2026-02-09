import axios, { AxiosAdapter } from "axios";

import { Doctor, Patient, Session } from "@shared/models";
import credentialsJson from "./db/credentials.json";
import doctorsJson from "./db/doctors.json";
import patientsJson from "./db/patients.json";
import sessionsJson from "./db/sessions.json";
import { API_ROUTES, generateResponse, STATUS_CODES, VALIDATION_MESSAGES } from "./lib";
import { handleAuthLogin, handleAuthLogout, handleCreateSession, handleDoctorById, handlePatientsByDoctorId, handleSessionsByDoctorId, handleSessionsByPatientId } from "./lib/handlers";
import { MockDB } from "./models/db";

const db: MockDB = {
  credentials: credentialsJson,
  doctors: doctorsJson as Array<Doctor>,
  patients: patientsJson as Array<Patient>,
  sessions: sessionsJson as Array<Session>,
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

    case /^\/doctors\/[^/]+$/.test(url):
      return handleDoctorById(db, config);

    case /^\/sessions\/patient\/[^/]+$/.test(url):
      return handleSessionsByPatientId(db, config);

    case /^\/sessions\/doctor\/[^/]+$/.test(url):
      return handleSessionsByDoctorId(db, config);

    case url === API_ROUTES.CREATE_SESSION:
      return handleCreateSession(db, config);

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
