"use client";

import "./globals.css";

import { createContext, useState } from "react";
import { Header } from "@/components/header";
import { Box, Stack } from "@mui/material";
import MusicDataProvider from "@/context/MusicDataProvider";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Footer from "@/components/footer/Footer";

export const TokenContext = createContext();

export default function RootLayout({ children }) {
  const [token, setToken] = useState(localStorage.getItem("token"));
  return (
    <html>
      <body>
        <MusicDataProvider>
          <TokenContext.Provider value={{ token, setToken }}>
            <nav
              style={{
                backgroundColor: "black",
                height: "80px",
              }}
            >
              <Header />
            </nav>
            <main>{children}</main>

            <Footer />
            <ToastContainer />
          </TokenContext.Provider>
        </MusicDataProvider>
      </body>
    </html>
  );
}
