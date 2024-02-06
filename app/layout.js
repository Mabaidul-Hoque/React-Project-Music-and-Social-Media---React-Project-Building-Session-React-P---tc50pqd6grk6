"use client";

import "./globals.css";

import { createContext, useState } from "react";
import { Header } from "@/components/header";

export const TokenContext = createContext();

export default function RootLayout({ children }) {
  const [token, setToken] = useState(localStorage.getItem("token"));
  return (
    <html>
      <body>
        <TokenContext.Provider value={{ token, setToken }}>
          <div style={style.navbar_section}>
            <Header />
          </div>
          <div style={style.main_section}>{children}</div>
        </TokenContext.Provider>
      </body>
    </html>
  );
}

const style = {
  // navbar_section: {
  //   width: "100%",
  //   padding: "0 20px",
  // },
  main_section: {
    width: "90%",
    margin: "0 auto",
  },
};
