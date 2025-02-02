

import type { Metadata } from "next";
import localFont from "next/font/local";
import "./globals.css";
import "@/styles/mabry_pro_styles.css";
import "@/styles/nohemi_font_styles.css";
import SetTheme from "@/components/setTheme";
import { Poppins } from 'next/font/google';

const geistSans = localFont({
  src: "./fonts/GeistVF.woff",
  variable: "--font-geist-sans",
  weight: "100 900",
});
const geistMono = localFont({
  src: "./fonts/GeistMonoVF.woff",
  variable: "--font-geist-mono",
  weight: "100 900",
});


const poppins = Poppins({
  subsets: ['latin'],
  weight: ['400', '500'], 
  display: 'swap',   
});


export const metadata: Metadata = {
  title: "AATU - Department of Student Affairs",
  description: "For the best student experience",
};

export default function RootLayout({
  children, 
}: Readonly<{
  children: React.ReactNode;
}>) {

  return (
    <html lang="en">
      <body className={`${geistSans.variable} ${geistMono.variable}  ${poppins.className}`}>
        <SetTheme />
        {children}
      </body>
    </html>
  );
}
