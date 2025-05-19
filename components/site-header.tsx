import Link from "next/link"
import { LBCLogo } from "@/components/ui/lbc-logo"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Search, Package, Menu, Phone, MapPin } from "lucide-react"
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
            <Link href="/contact">
              <Phone className="mr-2 h-4 w-4" />
              Contact
            </Link>
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
              <Link href="/contact" className="font-medium hover:text-[#c9002f]">
                Contact
              </Link>
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
