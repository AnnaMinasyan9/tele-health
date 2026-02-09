import { Doctor } from "@shared/models";
import { RootState } from "../store";

const EMPTY_DOCTOR: Doctor | null = null;

export const selectDoctor= (state: RootState): Doctor | null => {
    return state.doctor.doctor ?? EMPTY_DOCTOR;
};

