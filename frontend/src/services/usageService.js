import { request } from "./apiClient";

export async function getUsageAnalytics() {
  return request("/analytics/usage");
}

export async function getApiKeys() {
  return request("/api-keys");
}

export async function generateApiKey() {
  return request("/api-keys/generate", {
    method: "POST",
  });
}

