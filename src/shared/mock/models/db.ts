import { Credential, Doctor, Patient, Session } from "@shared/models";

export interface MockDB {
    credentials: Array<Credential>;
    doctors: Array<Doctor>;
    patients: Array<Patient>;
    sessions: Array<Session>;
}