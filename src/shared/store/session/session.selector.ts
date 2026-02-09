import { createSelector } from "@reduxjs/toolkit";
import { RequestStatus, type Session } from "@shared/models";
import type { RootState } from "../store";

export const EMPTY_SESSIONS: Session[] = [];

export const selectSessionsByPatientId = (state: RootState, patientId?: string) => {
  if (!patientId) return EMPTY_SESSIONS;
  return state.sessions.patientSessions[patientId] ?? EMPTY_SESSIONS;
};
export const selectDoctorSessions = (state: RootState, doctorId?: string) => {
  if (!doctorId) return EMPTY_SESSIONS;
  return state.sessions.doctorSessions[doctorId] ?? EMPTY_SESSIONS;
};
export const selectSessionsByDoctorAndPatientId = createSelector(
  [
    (state: RootState, doctorId?: string) => selectDoctorSessions(state, doctorId),
    (_state: RootState, _doctorId?: string, patientId?: string) => patientId,
  ],
  (doctorSessions, patientId) => {
    if (!patientId) return EMPTY_SESSIONS;

    const filtered = doctorSessions.filter((s) => s.patientId === patientId);
    return filtered.length ? filtered : EMPTY_SESSIONS;
  }
);
export const selectIsSessionCreating = (state: RootState) => state.sessions.createSessionStatus === RequestStatus.PENDING;
