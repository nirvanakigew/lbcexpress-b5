import type React from "react"
import type { Metadata } from "next"
import { AdminHeader } from "@/components/admin/admin-header"
import { Toaster } from "@/components/ui/toaster"

export const metadata: Metadata = {
  title: "Admin Dashboard - LBC Express",
  description: "Manage shipments and tracking information",
}

export default function AdminLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <div className="flex min-h-screen flex-col">
      <AdminHeader />
      <main className="flex-1">{children}</main>
      <Toaster />
    </div>
  )
}
