import { RequestStatus } from "@shared/models";
import { Session } from "@shared/models/session";

export interface SessionState {
    doctorSessions: Record<string, Array<Session>>;
    patientSessions: Record<string, Array<Session>>;
    patientSessionsStatus: RequestStatus;
    patientSessionsError: string | null;
}

export const initialState: SessionState = {
    doctorSessions: {},
    patientSessions: {},
    patientSessionsStatus: RequestStatus.IDLE,
    patientSessionsError: null,
};