import type React from "react"
import Link from "next/link"
import { LBCLogo } from "@/components/ui/lbc-logo"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Search, Package, Menu, MapPin } from "lucide-react"
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet"

export function SiteHeader() {
  return (
    <header className="sticky top-0 z-50 w-full border-b bg-white">
      <div className="bg-[#c9002f] text-white py-1 px-4 text-center text-sm">
        We are happy to announce our new lead times. Learn more.
      </div>
      <div className="container flex h-16 items-center justify-between">
        <div className="flex items-center gap-6">
          <Link href="/" className="flex items-center">
            <LBCLogo />
          </Link>
          <div className="hidden md:flex items-center gap-6">
            <Link href="/" className="font-medium hover:text-[#c9002f]">
              Home
            </Link>
            <Link href="/track" className="font-medium hover:text-[#c9002f]">
              Track
            </Link>
            <Link href="/services" className="font-medium hover:text-[#c9002f]">
              Services
            </Link>
            <Link href="/about" className="font-medium hover:text-[#c9002f]">
              About
            </Link>
            <Link href="/contact" className="font-medium hover:text-[#c9002f]">
              Contact
            </Link>
          </div>
        </div>
        <div className="hidden md:flex items-center gap-4">
          <div className="relative">
            <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
            <Input type="search" placeholder="Track your package" className="w-[200px] pl-8 rounded-full" />
          </div>
          <Button asChild variant="ghost">
            <Link href="/track">
              <Package className="mr-2 h-4 w-4" />
              Track
            </Link>
          </Button>
          <Button asChild variant="ghost">
            <Link href="/branch-locator">
              <MapPin className="mr-2 h-4 w-4" />
              Branches
            </Link>
          </Button>
          <Button asChild variant="ghost">
            <a href="https://wa.me/639616312656" target="_blank" rel="noopener noreferrer">
              <WhatsAppIcon className="mr-2 h-4 w-4" />
              Contact
            </a>
          </Button>
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
              <Link href="/" className="font-medium hover:text-[#c9002f]">
                Home
              </Link>
              <Link href="/track" className="font-medium hover:text-[#c9002f]">
                Track
              </Link>
              <Link href="/services" className="font-medium hover:text-[#c9002f]">
                Services
              </Link>
              <Link href="/about" className="font-medium hover:text-[#c9002f]">
                About
              </Link>
              <a
                href="https://wa.me/639616312656"
                target="_blank"
                rel="noopener noreferrer"
                className="font-medium hover:text-[#c9002f] flex items-center gap-2"
              >
                <WhatsAppIcon className="h-4 w-4" />
                Contact (+63 961-631-2656)
              </a>
              <Link href="/branch-locator" className="font-medium hover:text-[#c9002f]">
                Branch Locator
              </Link>
            </div>
          </SheetContent>
        </Sheet>
      </div>
    </header>
  )
}

// WhatsApp Icon Component
function WhatsAppIcon(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      {...props}
    >
      <path d="M3 21l1.65-3.8a9 9 0 1 1 3.4 2.9L3 21" />
      <path d="M9 10a.5.5 0 0 0 1 0V9a.5.5 0 0 0-1 0v1Z" />
      <path d="M14 10a.5.5 0 0 0 1 0V9a.5.5 0 0 0-1 0v1Z" />
      <path d="M9.5 13.5c.5 1 1.5 1 2.5 1s2-.5 2.5-1" />
    </svg>
  )
}
