import { InternalAxiosRequestConfig } from "axios";
import { MockDB } from "../../models/db";
import { generateResponse } from "../helpers";
import { STATUS_CODES } from "../status-codes";

export const handleDoctorById = async (db: MockDB, config: InternalAxiosRequestConfig) => {
    const url = config.url ?? "";
    const match = url.match(/^\/doctors\/([^/]+)$/) ?? [];
    const doctorId = match[1];
    const doctor = db.doctors.find((doctor) => doctor.id === doctorId);
    
    return generateResponse(config, STATUS_CODES.OK, doctor);
};