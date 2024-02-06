import { useEffect, useState } from "react";

export default function useAuth() {
  const [token, setToken] = useState("");
  const updateToken = (token) => setToken(token);
  useEffect(() => {
    setToken(localStorage.getItem("token"));
  }, []);
  return {
    token,
    updateToken,
  };
}
