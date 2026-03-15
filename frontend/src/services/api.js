const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || "http://localhost:8000";

async function handleResponse(res) {
  const contentType = res.headers.get("content-type") || "";
  const isJson = contentType.includes("application/json");
  const data = isJson ? await res.json() : await res.text();

  if (!res.ok) {
    const message =
      (isJson && (data.detail || data.message)) ||
      (typeof data === "string" ? data : null) ||
      "Request failed";
    const error = new Error(message);
    error.status = res.status;
    error.body = data;
    throw error;
  }

  return data;
}

export async function apiRequest(path, { method = "GET", headers, body } = {}) {
  const url = `${API_BASE_URL}${path}`;
  const finalHeaders = {
    "Content-Type": "application/json",
    ...(headers || {}),
  };
  const opts = {
    method,
    headers: finalHeaders,
    body: body ? JSON.stringify(body) : undefined,
  };

  try {
    const res = await fetch(url, opts);
    return await handleResponse(res);
  } catch (err) {
    if (err instanceof TypeError) {
      throw new Error(
        `Unable to reach backend at ${url}. Is the FastAPI server running and CORS configured?`
      );
    }
    throw err;
  }
}