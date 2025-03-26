import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { AppProvider } from "./Components/context";
import { MenuProvider } from './context/MenuContext'



const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata = {
  title: "AlgoRoot Frontent App",
  description: "AlgoRoot Frontend App",
  image: "/algoroot.png",
};

export default function RootLayout({ children }) {

  return (
    <html lang="en">
      <link rel="icon" type="image/png" href="/algoroot.png" />
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased `}
      >
  <AppProvider><MenuProvider>{children}</MenuProvider></AppProvider>
      </body>
    </html>
  );
}
