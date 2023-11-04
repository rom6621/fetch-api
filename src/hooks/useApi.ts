import { useState } from "react";

export const useApi = () => {
  const [result, setResult] = useState("");
  const [error, setError] = useState("");

  const fetchApi = async (
    url: string,
    idToken?: string,
    accessToken?: string
  ) => {
    setResult("");
    setError("");
    try {
      const headers: HeadersInit = {};
      if (idToken !== undefined) {
        headers["Authorization"] = `Bearer ${idToken}`;
      }
      if (accessToken !== undefined) {
        headers["Access-Token"] = accessToken;
      }
      const response = await fetch(url, {
        method: "GET",
        headers: headers,
      });
      const result = await response.json();
      setResult(JSON.stringify(result, null, 2));
    } catch (error: any) {
      if (error instanceof Error) {
        setError(error.message);
      }
    }
  };

  return { result, error, fetchApi };
};
