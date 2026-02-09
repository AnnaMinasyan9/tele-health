export enum UserRole {
  Doctor = "doctor",
  Patient = "patient",
}

export interface User {
  id: string;
  username: string;
  fullName: string;
  email: string;
  phone: string;
  avatarUrl: string;
  role: UserRole;
}

export interface Doctor extends User {
  specialty: string;
  patientsIds: Array<string>;
}

export interface Patient extends User {
  doctorId: string;
}