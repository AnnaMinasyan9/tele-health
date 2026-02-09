export interface Session {
    id: string;
    doctorId: string;
    patientId: string;
    location: string;
    durationMinutes: number;
    startAt: string;
    sessionDetails: {
        patientName: string;
        doctorName: string;
    };
}
export interface CreateSessionPayload {
    doctorId: string;
    patientId: string;
    location: string;
    durationMinutes: number;
};
