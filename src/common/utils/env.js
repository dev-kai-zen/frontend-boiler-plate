// Centralized access to Vite env vars.
const getEnv = () => {
  const runtimeApiUrl =
    typeof window !== "undefined" ? window.__ENV__?.API_URL : undefined;
  const runtimeGoogleClientId =
    typeof window !== "undefined" ? window.__ENV__?.GOOGLE_CLIENT_ID : undefined;

  const apiBaseUrl =
    runtimeApiUrl ||
    import.meta.env.VITE_API_URL ||
    "http://localhost:3000";
  const googleClientId =
    runtimeGoogleClientId || import.meta.env.VITE_GOOGLE_CLIENT_ID || "";

  // Vite provides `MODE` ("development" | "production" | custom) to the client.
  const nodeEnv = import.meta.env.MODE || "development";

  // Return parsed env values.
  return {
    apiBaseUrl,
    googleClientId,
    nodeEnv,
  };
};

export { getEnv };
