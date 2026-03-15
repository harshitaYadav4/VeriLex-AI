/**
 * Central API service – all frontend requests go through this layer.
 * Uses VITE_API_BASE_URL and attaches JWT from localStorage when present.
 */

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || "http://localhost:8000";

function getStoredToken() {
  if (typeof window === "undefined") return null;
  return localStorage.getItem("token");
}

async function handleResponse(res) {
  const contentType = res.headers.get("content-type") || "";
  const isJson = contentType.includes("application/json");
  const data = isJson ? await res.json() : await res.text();

  if (!res.ok) {
    const message =
      (isJson && (data.detail || data.message)) ||
      (typeof data === "string" ? data : null) ||
      "Request failed";
    const error = new Error(Array.isArray(data.detail) ? data.detail.map((d) => d.msg || d).join(", ") : message);
    error.status = res.status;
    error.body = data;
    throw error;
  }

  return data;
}

/**
 * @param {string} path - API path (e.g. "/create-order")
 * @param {{ method?: string; headers?: Record<string, string>; body?: object }} options
 * @returns {Promise<any>}
 */
export async function request(path, { method = "GET", headers = {}, body } = {}) {
  const url = `${API_BASE_URL}${path}`;
  const token = getStoredToken();
  const finalHeaders = {
    "Content-Type": "application/json",
    ...headers,
  };
  if (token) {
    finalHeaders.Authorization = `Bearer ${token}`;
  }

  try {
    const res = await fetch(url, {
      method,
      headers: finalHeaders,
      body: body ? JSON.stringify(body) : undefined,
    });
    return await handleResponse(res);
  } catch (err) {
    if (err instanceof TypeError) {
      throw new Error(
        `Unable to reach backend at ${url}. Ensure the FastAPI server is running and CORS is configured.`
      );
    }
    throw err;
  }
}

export { API_BASE_URL };
