import React, { createContext, useState } from "react";

export const TokenContext = createContext();

const TokenContextProvider = ({ children }) => {
  const [token, setToken] = useState(localStorage.getItem("token"));

  return <TokenContext.Provider>{children}</TokenContext.Provider>;
};

export default TokenContextProvider;
