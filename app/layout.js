"use client";

import "./globals.css";

import { createContext, useState } from "react";
import { Header } from "@/components/header";
import { Box, Stack } from "@mui/material";
import MusicDataProvider from "@/context/MusicDataProvider";

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
            <footer>
              <Stack>
                Lorem ipsum dolor sit amet, consectetur adipisicing elit. Quos
                dolores harum laborum sapiente, tempora natus, omnis dolorum
                repellendus rerum vero eos quia voluptates pariatur totam
                quaerat, quo soluta unde dolore iure qui? Pariatur voluptatum
                expedita eum modi tempore. Similique laboriosam iusto,
                necessitatibus nulla tenetur porro. Doloribus quisquam soluta
                voluptatum voluptatibus maxime optio illo? Explicabo alias sit
                obcaecati, vero error, harum possimus, ea earum repellat eos
                impedit? Vitae aspernatur aliquam ut ea voluptates esse porro
                tenetur in architecto consequatur excepturi, repellendus culpa.
                Vero quas explicabo aspernatur nostrum temporibus incidunt fugit
                eius odio impedit quaerat, quidem iste quisquam dicta alias
                deleniti minima praesentium quia corporis beatae deserunt!
                Incidunt quisquam perferendis neque, quam, accusantium harum
                dolorum non necessitatibus nobis nisi corporis dignissimos!
                Consequuntur exercitationem ad earum veniam obcaecati officiis
                dolorum quae et pariatur non. Nulla dolore expedita ut dolorum
                animi, cupiditate esse non blanditiis fuga voluptates architecto
                consequuntur, consectetur illum omnis accusantium quas iste
                magnam. Doloribus, qui! Enim minima dolores ipsum illum nostrum
                nulla nam magnam. Neque deserunt, repellat hic similique vero
                accusamus, dolorum est et ipsa, earum optio quis eligendi cum
                eum necessitatibus! Impedit mollitia, in aspernatur beatae
                voluptate laudantium ex doloremque quo sint ut accusamus
                quisquam delectus laborum a, dolor itaque?
              </Stack>
            </footer>
          </TokenContext.Provider>
        </MusicDataProvider>
      </body>
    </html>
  );
}
