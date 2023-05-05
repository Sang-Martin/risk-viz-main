
import "./globals.css";
import { Inter } from "next/font/google";
import { AppProvider } from "./contexts/app";

const inter = Inter({ subsets: ["latin"] });

export const metadata = {
  title: "Map",
  description: "Generated by create next app",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className="flex flex-col gap-4">
        <AppProvider>{children}</AppProvider>
      </body>
    </html>
  );
}
