"use client";

import "./globals.css";

import { createContext, useState } from "react";
import { Header } from "@/components/header";
import { Box } from "@mui/material";

export const TokenContext = createContext();

export default function RootLayout({ children }) {
  const [token, setToken] = useState(localStorage.getItem("token"));
  return (
    <html>
      <body>
        <TokenContext.Provider value={{ token, setToken }}>
          <div>
            <Header />
          </div>
          <Box>{children}</Box>
        </TokenContext.Provider>
      </body>
    </html>
  );
}
