const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;

async function handleResponse(response) {
  const contentType = response.headers.get("content-type") || "";
  const isJson = contentType.includes("application/json");
  const data = isJson ? await response.json() : await response.text();

  if (!response.ok) {
    const message =
      (isJson && data?.message) ||
      (typeof data === "string" ? data : null) ||
      "Request failed";
    const error = new Error(message);
    error.status = response.status;
    error.data = data;
    throw error;
  }

  return data;
}

export async function request(path, { method = "GET", headers, body } = {}) {
  if (!API_BASE_URL) {
    throw new Error(
      "VITE_API_BASE_URL is not set. Define it in your frontend .env file."
    );
  }

  const token =
    typeof window !== "undefined" ? localStorage.getItem("token") : null;

  const url = `${API_BASE_URL}${path}`;

  const finalHeaders = {
    "Content-Type": "application/json",
    ...(headers || {}),
  };

  if (token) {
    finalHeaders.Authorization = `Bearer ${token}`;
  }

  try {
    const response = await fetch(url, {
      method,
      headers: finalHeaders,
      body: body ? JSON.stringify(body) : undefined,
    });

    return await handleResponse(response);
  } catch (err) {
    // Network / CORS / DNS / connection errors – browser reports TypeError("Failed to fetch")
    if (err instanceof TypeError) {
      const details =
        typeof window !== "undefined"
          ? `Cannot reach API at ${url}. Check that the FastAPI server is running, the URL is correct, and CORS allows requests from this origin.`
          : "Network request failed.";
      throw new Error(details);
    }
    throw err;
  }
}