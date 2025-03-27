import type React from "react"
import type { Metadata } from "next"
import { Inter } from "next/font/google"
import "./globals.css"
import Navbar from "./navigation/Navbar";
import { Toaster } from "@/components/ui/toaster"
import Footer from "./footer/page";


const inter = Inter({ subsets: ["latin"] })

export const metadata: Metadata = {
  title: "دار تسنيم",
  description: "Tableau de bord d'administration pour restaurant marocain"
    
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="fr">
      <body className={inter.className}>
      <Navbar/>
        {children}
        <Toaster />
        <Footer/>
      </body>
    </html>
  )
}



import './globals.css'