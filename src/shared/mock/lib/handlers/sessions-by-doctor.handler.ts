
import { InternalAxiosRequestConfig } from "axios";
import { MockDB } from "../../models/db";
import { generateResponse } from "../helpers";
import { STATUS_CODES } from "../status-codes";

export const handleSessionsByDoctorId = async (db: MockDB, config: InternalAxiosRequestConfig) => {
    const url = config.url ?? "";
    const match = url.match(/^\/sessions\/doctor\/([^/]+)$/) ?? [];
    const doctorId = match[1];
    const sessions = db.sessions.filter((session) => session.doctorId === doctorId);

    return generateResponse(config, STATUS_CODES.OK, sessions);
};