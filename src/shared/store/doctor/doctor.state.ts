import { Doctor, RequestStatus } from "@shared/models";

export interface DoctorState {
    doctor: Doctor | null;
    status: RequestStatus;
    error: string | null;
}

export const initialState: DoctorState = {
    doctor: null,
    status: RequestStatus.IDLE,
    error: null,
};