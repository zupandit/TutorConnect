import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import Navbar from "./components/Navbar";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata = {
  title: "TutorConnect",
  description: "Make lessons easy",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body  className={`${geistSans.variable} ${geistMono.variable} antialiased`}>
        <header>
          <Navbar/>
        </header>
        <main>{children}</main>
        <footer className="absolute bottom-0">
          <p>© {new Date().getFullYear()} TutorConnect by Zaid Nissar</p>
        </footer>
      </body>
    </html>
  );
}