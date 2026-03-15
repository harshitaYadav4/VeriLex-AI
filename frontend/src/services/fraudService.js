import { request } from "./apiClient";

export async function checkFraud({ amount, location, device_type }) {
  return request("/api/fraud-check", {
    method: "POST",
    body: { amount, location, device_type },
  });
}

