import type React from "react"
import { LBCLogo } from "@/components/ui/lbc-logo"
import Link from "next/link"
import { Facebook, Twitter, Instagram, Youtube, Mail, MapPin, Phone } from "lucide-react"

export function SiteFooter() {
  return (
    <footer className="bg-gray-100 border-t">
      <div className="container py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div className="space-y-4">
            <LBCLogo />
            <p className="text-sm text-gray-600">
              LBC Express is the Philippines' market leader in payments, logistics, and remittance.
            </p>
            <div className="flex space-x-4">
              <Link href="#" className="text-gray-600 hover:text-[#c9002f]">
                <Facebook size={20} />
                <span className="sr-only">Facebook</span>
              </Link>
              <Link href="#" className="text-gray-600 hover:text-[#c9002f]">
                <Twitter size={20} />
                <span className="sr-only">Twitter</span>
              </Link>
              <Link href="#" className="text-gray-600 hover:text-[#c9002f]">
                <Instagram size={20} />
                <span className="sr-only">Instagram</span>
              </Link>
              <Link href="#" className="text-gray-600 hover:text-[#c9002f]">
                <Youtube size={20} />
                <span className="sr-only">YouTube</span>
              </Link>
            </div>
          </div>
          <div>
            <h3 className="font-bold text-lg mb-4">Quick Links</h3>
            <ul className="space-y-2">
              <li>
                <Link href="/track" className="text-gray-600 hover:text-[#c9002f]">
                  Track Package
                </Link>
              </li>
              <li>
                <Link href="/services" className="text-gray-600 hover:text-[#c9002f]">
                  Services
                </Link>
              </li>
              <li>
                <Link href="/locations" className="text-gray-600 hover:text-[#c9002f]">
                  Locations
                </Link>
              </li>
              <li>
                <Link href="/rates" className="text-gray-600 hover:text-[#c9002f]">
                  Shipping Rates
                </Link>
              </li>
            </ul>
          </div>
          <div>
            <h3 className="font-bold text-lg mb-4">Services</h3>
            <ul className="space-y-2">
              <li>
                <Link href="/services/domestic" className="text-gray-600 hover:text-[#c9002f]">
                  Domestic Shipping
                </Link>
              </li>
              <li>
                <Link href="/services/international" className="text-gray-600 hover:text-[#c9002f]">
                  International Shipping
                </Link>
              </li>
              <li>
                <Link href="/services/corporate" className="text-gray-600 hover:text-[#c9002f]">
                  Corporate Solutions
                </Link>
              </li>
              <li>
                <Link href="/services/ecommerce" className="text-gray-600 hover:text-[#c9002f]">
                  E-Commerce
                </Link>
              </li>
            </ul>
          </div>
          <div>
            <h3 className="font-bold text-lg mb-4">Contact Us</h3>
            <ul className="space-y-2">
              <li className="flex items-center gap-2">
                <a
                  href="https://wa.me/639616312656"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-2 text-gray-600 hover:text-[#25D366]"
                >
                  <WhatsAppIcon size={16} className="text-[#25D366]" />
                  <span>+63 961-631-2656</span>
                </a>
              </li>
              <li className="flex items-center gap-2">
                <Phone size={16} className="text-[#c9002f]" />
                <span className="text-gray-600">+63 931-789-7660</span>
              </li>
              <li className="flex items-center gap-2">
                <Mail size={16} className="text-[#c9002f]" />
                <span className="text-gray-600">customercare@lbcexpress.com</span>
              </li>
              <li className="flex items-start gap-2">
                <MapPin size={16} className="text-[#c9002f] mt-1" />
                <span className="text-gray-600">
                  LBC Express, Inc. LBC Building, 1240 J.P. Rizal Avenue, Makati City, Philippines
                </span>
              </li>
            </ul>
          </div>
        </div>
      </div>
      <div className="bg-[#c9002f] text-white py-4">
        <div className="container text-center text-sm">
          <p>&copy; {new Date().getFullYear()} LBC Express. All rights reserved.</p>
        </div>
      </div>
    </footer>
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
