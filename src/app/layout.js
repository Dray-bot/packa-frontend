import { ClerkProvider } from "@clerk/nextjs";
import { Poppins } from "next/font/google";
import "./globals.css";
import { Toaster } from "react-hot-toast";

const poppins = Poppins({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
});

export const metadata = {
  title: "Packa",
  description: "Delivery tracking platform",
};

export default function RootLayout({ children }) {
  return (
    <ClerkProvider>
      <html lang="en">
        <body className={poppins.className}>
          {children}

          {/* GLOBAL TOAST SYSTEM */}
          <Toaster position="top-right" />
        </body>
      </html>
    </ClerkProvider>
  );
}