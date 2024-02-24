"use client";
import React, { createContext, useState } from "react";
export const TokenContext = createContext();

const AuthProvider = ({ children }) => {
  const [token, setToken] = useState(
    typeof window !== "undefined" && localStorage.getItem("token")
  );
  return (
    <TokenContext.Provider value={{ token, setToken }}>
      {children}
    </TokenContext.Provider>
  );
};

export default AuthProvider;
