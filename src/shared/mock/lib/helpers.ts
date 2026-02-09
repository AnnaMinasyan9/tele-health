import type { AxiosResponse, InternalAxiosRequestConfig } from "axios";

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