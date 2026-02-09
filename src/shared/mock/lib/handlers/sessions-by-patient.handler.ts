import { MockDB } from "@shared/mock/models/db";
import { InternalAxiosRequestConfig } from "axios";
import { generateResponse } from "../helpers";
import { STATUS_CODES } from "../status-codes";

export const handleSessionsByPatientId = async (db: MockDB, config: InternalAxiosRequestConfig) => {
    const url = config.url ?? "";
    const match = url.match(/^\/sessions\/patient\/([^/]+)$/) ?? [];
    const patientId = match[1];
    const sessions = db.sessions.filter((session) => session.patientId === patientId);

    return generateResponse(config, STATUS_CODES.OK, sessions);
};