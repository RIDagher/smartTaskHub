// src/services/apiClient.js

// Single, hook-free API helper you can call from anywhere.
// Reads token at call time, merges headers safely, and handles JSON/204 responses.

export async function apiFetch(path, options = {}) {
  const token = localStorage.getItem("token");
  console.log("[apiFetch]", path, "token?", !!token); // <-- TEMP

  const headers = {
    "Content-Type": "application/json",
    ...(options.headers || {}),
    ...(token ? { Authorization: `Bearer ${token}` } : {}),
  };

  const res = await fetch(`/api${path}`, {
    ...options,
    headers,
  });

  // 204 No Content
  if (res.status === 204) return null;

  let data = null;
  try {
    data = await res.json();
  } catch {
    // Non‑JSON responses won’t crash — data stays null
  }

  if (!res.ok) {
    // Surface a meaningful error message
    const message = data?.message || `Request failed (${res.status})`;
    throw new Error(message);
  }

  return data;
}