import { Credential, Doctor, Patient } from "@shared/models";

export interface MockDB {
    credentials: Array<Credential>;
    doctors: Array<Doctor>;
    patients: Array<Patient>;
}