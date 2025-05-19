"use client"

import Link from "next/link"
import { LBCLogo } from "@/components/ui/lbc-logo"
import { Button } from "@/components/ui/button"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet"
import { Settings, LogOut, Menu, User } from "lucide-react"
import { useRouter } from "next/navigation"
import { useState, useEffect } from "react"
import type { AdminUser } from "@/types"

export function AdminHeader() {
  const [admin, setAdmin] = useState<AdminUser | null>(null)
  const router = useRouter()

  useEffect(() => {
    // Get admin info from localStorage
    const adminData = localStorage.getItem("admin")
    if (adminData) {
      setAdmin(JSON.parse(adminData))
    } else {
      // Redirect to login if not logged in
      router.push("/admin")
    }
  }, [router])

  const handleLogout = () => {
    localStorage.removeItem("admin")
    router.push("/admin")
  }

  return (
    <header className="sticky top-0 z-50 w-full border-b bg-white">
      <div className="bg-[#c9002f] text-white py-1 px-4 text-center text-sm">Admin Dashboard</div>
      <div className="container flex h-16 items-center justify-between">
        <div className="flex items-center gap-6">
          <Link href="/admin/dashboard" className="flex items-center">
            <LBCLogo />
            <span className="ml-2 font-semibold">Admin</span>
          </Link>
          <div className="hidden md:flex items-center gap-6">
            <Link href="/admin/dashboard" className="font-medium hover:text-[#c9002f]">
              Dashboard
            </Link>
            <Link href="/admin/orders" className="font-medium hover:text-[#c9002f]">
              Orders
            </Link>
            <Link href="/admin/tracking" className="font-medium hover:text-[#c9002f]">
              Tracking
            </Link>
            <Link href="/admin/users" className="font-medium hover:text-[#c9002f]">
              Users
            </Link>
            <Link href="/admin/settings" className="font-medium hover:text-[#c9002f]">
              Settings
            </Link>
          </div>
        </div>
        <div className="hidden md:flex items-center gap-4">
          {admin && (
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="outline" className="gap-2">
                  <User className="h-4 w-4" />
                  {admin.name}
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end">
                <DropdownMenuItem>
                  <User className="mr-2 h-4 w-4" />
                  <span>Profile</span>
                </DropdownMenuItem>
                <DropdownMenuItem>
                  <Settings className="mr-2 h-4 w-4" />
                  <span>Settings</span>
                </DropdownMenuItem>
                <DropdownMenuSeparator />
                <DropdownMenuItem onClick={handleLogout}>
                  <LogOut className="mr-2 h-4 w-4" />
                  <span>Log out</span>
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          )}
        </div>
        <Sheet>
          <SheetTrigger asChild className="md:hidden">
            <Button variant="outline" size="icon">
              <Menu className="h-5 w-5" />
              <span className="sr-only">Toggle menu</span>
            </Button>
          </SheetTrigger>
          <SheetContent side="right">
            <div className="flex flex-col gap-4 mt-8">
              <Link href="/admin/dashboard" className="font-medium hover:text-[#c9002f]">
                Dashboard
              </Link>
              <Link href="/admin/orders" className="font-medium hover:text-[#c9002f]">
                Orders
              </Link>
              <Link href="/admin/tracking" className="font-medium hover:text-[#c9002f]">
                Tracking
              </Link>
              <Link href="/admin/users" className="font-medium hover:text-[#c9002f]">
                Users
              </Link>
              <Link href="/admin/settings" className="font-medium hover:text-[#c9002f]">
                Settings
              </Link>
              <Button variant="outline" onClick={handleLogout} className="mt-4">
                <LogOut className="mr-2 h-4 w-4" />
                Log out
              </Button>
            </div>
          </SheetContent>
        </Sheet>
      </div>
    </header>
  )
}
