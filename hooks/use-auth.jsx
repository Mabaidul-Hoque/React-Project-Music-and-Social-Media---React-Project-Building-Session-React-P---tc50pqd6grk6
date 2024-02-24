import { useEffect, useState } from "react";

export default function useAuth() {
  const [token, setToken] = useState("");
  const updateToken = (token) => setToken(token);
  useEffect(() => {
    setToken(typeof window !== "undefined" && localStorage.getItem("token"));
  }, []);
  return {
    token,
    updateToken,
  };
}
