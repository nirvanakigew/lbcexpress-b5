import type React from "react"
import type { Metadata } from "next"
import { Inter } from "next/font/google"
import "./globals.css"
import { SiteHeader } from "@/components/site-header"
import { SiteFooter } from "@/components/site-footer"
import { Toaster } from "@/components/ui/toaster"

const inter = Inter({ subsets: ["latin"] })

export const metadata: Metadata = {
  title: "LBC Express - Shipping Management System",
  description: "Track your packages and manage shipments with LBC Express",
  icons: {
    icon: "/favicon.ico",
  },
  openGraph: {
    type: "website",
    locale: "en_US",
    url: "https://lbcexpress.com",
    title: "LBC Express - Shipping Management System",
    description: "Track your packages and manage shipments with LBC Express",
    siteName: "LBC Express",
    images: [
      {
        url: "/lbc-logo.png",
        width: 100,
        height: 100,
        alt: "LBC Express Logo",
      },
    ],
  },
  twitter: {
    card: "summary",
    title: "LBC Express - Shipping Management System",
    description: "Track your packages and manage shipments with LBC Express",
    images: ["/lbc-logo.png"],
  },
    generator: 'v0.dev'
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <div className="flex min-h-screen flex-col">
          <SiteHeader />
          <main className="flex-1">{children}</main>
          <SiteFooter />
        </div>
        <Toaster />
      </body>
    </html>
  )
}
