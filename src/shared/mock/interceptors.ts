import type { AxiosInstance, InternalAxiosRequestConfig } from "axios";

type MockInterceptorMeta = {
  requestId: string;
  startedAt: number;
};

function createRequestId(): string {
  return `${Date.now()}-${Math.random().toString(16).slice(2)}`;
}

/**
 * Showcase-only interceptor. Adds a couple of headers + logs request metadata.
 */
export function attachMockRequestInterceptor(client: AxiosInstance) {
  client.interceptors.request.use((config: InternalAxiosRequestConfig) => {
    const cfg = config as InternalAxiosRequestConfig & { metadata?: MockInterceptorMeta };
    const requestId = createRequestId();

    cfg.metadata = { requestId, startedAt: Date.now() };
    cfg.headers = cfg.headers ?? {};
    (cfg.headers as Record<string, unknown>)["x-mock-interceptor"] = "1";
    (cfg.headers as Record<string, unknown>)["x-mock-request-id"] = requestId;

    const method = cfg.method?.toUpperCase() ?? "GET";
    const fullUrl = `${cfg.baseURL ?? ""}${cfg.url ?? ""}`;
    console.debug(`[mock][request] ${requestId} ${method} ${fullUrl}`, {
      params: cfg.params,
    });

    return cfg;
  });
}

