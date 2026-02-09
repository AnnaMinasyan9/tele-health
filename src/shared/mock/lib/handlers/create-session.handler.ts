import { CreateSessionPayload, Session } from "@shared/models";
import { InternalAxiosRequestConfig } from "axios";
import { MockDB } from "../../models/db";
import { generateResponse, nextFreeDay, parseRequestData } from "../helpers";
import { STATUS_CODES } from "../status-codes";

export const handleCreateSession = async (db: MockDB, config: InternalAxiosRequestConfig) => {
    const { location, durationMinutes, doctorId, patientId } = parseRequestData<CreateSessionPayload>(config.data);

    const newSession: Session = {
        id: Math.random().toString(36).substring(2, 15),
        doctorId,
        patientId,
        location: location ?? "online",
        durationMinutes: durationMinutes ?? 30,
        startAt: nextFreeDay(db, doctorId, 365).toISOString(),
        sessionDetails: {
            patientName: db.patients.find((p) => p.id === patientId)?.fullName ?? "",
            doctorName: db.doctors.find((d) => d.id === doctorId)?.fullName ?? ""
        }
    };
    db.sessions.push(newSession);
    return generateResponse(config, STATUS_CODES.CREATED, newSession);
};