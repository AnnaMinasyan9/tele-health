import { Patient, RequestStatus } from "@shared/models";

export interface PatientsState {
    doctorPatients: Record<string, Array<Patient>>;
    status: RequestStatus;
    error: string | null;
}

export const initialState: PatientsState = {
    doctorPatients: {},
    status: RequestStatus.IDLE,
    error: null,
};