import { InternalAxiosRequestConfig } from "axios";
import { MockDB } from "../../models/db";
import { generateResponse, getSearchQuery, sleep } from "../helpers";
import { STATUS_CODES } from "../status-codes";

export const handlePatientsByDoctorId = async (
  db: MockDB,
  config: InternalAxiosRequestConfig
) => {
  const url = config.url ?? "";
  const [path] = url.split("?");

  const match = path.match(/^\/patients\/([^/]+)\/patients$/);
  const doctorId = match?.[1];
  const query = getSearchQuery(config);


  const patients = db.patients
    .filter((patient) => patient.doctorId === doctorId)
    .filter((patient) => !query || patient.fullName.toLowerCase().includes(query));
  if (query) {
    await sleep(400);
  }

  return generateResponse(config, STATUS_CODES.OK, patients);
};
