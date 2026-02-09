import { RequestStatus, type Patient } from "@shared/models";
import type { RootState } from "../store";

const EMPTY_PATIENTS: Patient[] = [];
const EMPTY_PATIENT: Patient | null = null;

export const selectDoctorPatients = (state: RootState, doctorId?: string): Patient[] => {
  if (!doctorId) return EMPTY_PATIENTS;
  return state.patients.doctorPatients[doctorId] ?? EMPTY_PATIENTS;
};

export const selectDoctorPatientById = (
  state: RootState,
  doctorId?: string,
  patientId?: string
): Patient | null => {
  if (!doctorId || !patientId) return EMPTY_PATIENT;

  const patients = selectDoctorPatients(state, doctorId);
  return patients.find((patient) => patient.id === patientId) ?? EMPTY_PATIENT;
};

export const selectIsPatientsLoading = (state: RootState) => state.patients.status === RequestStatus.PENDING;
