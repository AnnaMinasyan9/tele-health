import type { AxiosResponse, InternalAxiosRequestConfig } from "axios";
import { MockDB } from "../models/db";

export const generateResponse = <T>(
  config: InternalAxiosRequestConfig,
  status: number,
  data: T
): Promise<AxiosResponse<T>> => {
  const response: AxiosResponse<T> = {
    data,
    status,
    statusText: status >= 400 ? "Error" : "Success",
    headers: {},
    config,
  };

  if (status >= 400) {
    return Promise.reject({
      response,
      isAxiosError: true,
    });
  }

  return Promise.resolve(response);
};

export const parseRequestData = <T>(data: string): T => {
  try {
    return JSON.parse(data) as T;
  } catch (error) {
    throw new Error("Invalid request body");
  }
};

const toDate = (value: string | Date): Date =>
  value instanceof Date ? value : new Date(value);

const isSameDay = (a: Date, b: Date): boolean =>
  a.getFullYear() === b.getFullYear() &&
  a.getMonth() === b.getMonth() &&
  a.getDate() === b.getDate();

const startOfDay = (date: Date): Date => {
  const d = new Date(date);
  d.setHours(0, 0, 0, 0);
  return d;
};

export const nextFreeDay = (db: MockDB, doctorId: string, maxDays = 365): Date => {
  const now = new Date();
  const today = startOfDay(now);

  for (let i = 1; i <= maxDays; i++) {
    const day = new Date(today);
    day.setDate(day.getDate() + i);

    const hasSession = db.sessions.some(
      (session) =>
        session.doctorId === doctorId &&
        session.startAt &&
        isSameDay(toDate(session.startAt), day)
    );

    if (!hasSession) {
      const scheduledAt = new Date(day);
      scheduledAt.setHours(
        now.getHours(),
        now.getMinutes(),
        now.getSeconds(),
        now.getMilliseconds()
      );
      return scheduledAt;
    }
  }

  throw new Error(`No free day found for doctor ${doctorId}`);
};

export function normalizeQuery(value: unknown): string {
  if (typeof value !== "string") return "";
  return value.trim().toLowerCase();
}

export function sleep(ms: number) {
  return new Promise<void>((resolve) => setTimeout(resolve, ms));
}

export function getSearchQuery(config: InternalAxiosRequestConfig): string {
  const url = config.url ?? "";
  const [_, queryString = ""] = url.split("?");

  const searchParams = new URLSearchParams(queryString);
  const queryRaw = config.params?.search ?? searchParams.get("search") ?? "";

  return normalizeQuery(queryRaw);
}
