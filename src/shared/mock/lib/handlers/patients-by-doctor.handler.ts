import { InternalAxiosRequestConfig } from "axios";
import { MockDB } from "../../models/db";
import { generateResponse } from "../helpers";
import { STATUS_CODES } from "../status-codes";

export const handlePatientsByDoctorId = async (
  db: MockDB,
  config: InternalAxiosRequestConfig
) => {
  const url = config.url ?? "";

  const match = url.match(/^\/patients\/([^/]+)\/patients$/) ?? [];

  const doctorId = match[1];

  const patients = db.patients.filter(
    (patient) => patient.doctorId === doctorId
  );

  return generateResponse(config, STATUS_CODES.OK, patients);
};
