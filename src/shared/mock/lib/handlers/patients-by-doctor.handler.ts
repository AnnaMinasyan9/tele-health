import { InternalAxiosRequestConfig } from "axios";
import { MockDB } from "../../models/db";
import { generateResponse } from "../helpers";
import { STATUS_CODES } from "../status-codes";

function normalizeQuery(value: unknown): string {
  if (typeof value !== "string") return "";
  return value.trim().toLowerCase();
}

function sleep(ms: number) {
  return new Promise<void>((resolve) => setTimeout(resolve, ms));
}

export const handlePatientsByDoctorId = async (
  db: MockDB,
  config: InternalAxiosRequestConfig
) => {
  const url = config.url ?? "";
  const [path, queryString = ""] = url.split("?");

  const match = path.match(/^\/patients\/([^/]+)\/patients$/);
  const doctorId = match?.[1];

  const searchParams = new URLSearchParams(queryString);

  const queryRaw = config.params?.search ?? searchParams.get("search") ?? "";

  const query = normalizeQuery(queryRaw);


  const patients = db.patients
    .filter((patient) => patient.doctorId === doctorId)
    .filter((patient) => !query || patient.fullName.toLowerCase().includes(query));
  if (query) {
    await sleep(4000);
  }

  return generateResponse(config, STATUS_CODES.OK, patients);
};
