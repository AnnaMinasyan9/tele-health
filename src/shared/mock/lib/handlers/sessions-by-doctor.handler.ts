
import { InternalAxiosRequestConfig } from "axios";
import { MockDB } from "../../models/db";
import { generateResponse, getSearchQuery, sleep } from "../helpers";
import { STATUS_CODES } from "../status-codes";

export const handleSessionsByDoctorId = async (db: MockDB, config: InternalAxiosRequestConfig) => {
    const url = config.url ?? "";
    const [path] = url.split("?");

    const match = path.match(/^\/sessions\/doctor\/([^/]+)$/);
    const doctorId = match?.[1];

    const query = getSearchQuery(config);

    const sessions = db.sessions
        .filter(
            (session) =>
                session.doctorId === doctorId &&
                (!query ||
                    session.sessionDetails?.patientName
                        ?.toLowerCase()
                        ?.includes(query))
        );

    if (query) {
        await sleep(400);
    }

    return generateResponse(config, STATUS_CODES.OK, sessions);
};