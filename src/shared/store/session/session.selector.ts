import { type Session } from "@shared/models";
import type { RootState } from "../store";

export const EMPTY_SESSIONS: Session[] = [];

export const selectSessionsByPatientId = (state: RootState, patientId?: string) => {
  if (!patientId) return EMPTY_SESSIONS;
  return state.sessions.patientSessions[patientId] ?? EMPTY_SESSIONS;
};
