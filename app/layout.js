import "./globals.css";
import { Header } from "@/components/header";
import MusicDataProvider from "@/context/MusicDataProvider";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Footer from "@/components/footer/Footer";
import AuthProvider from "@/context/AuthProvider";

export default function RootLayout({ children }) {
  return (
    <html>
      <body>
        <AuthProvider>
          <MusicDataProvider>
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
          </MusicDataProvider>
        </AuthProvider>
      </body>
    </html>
  );
}
