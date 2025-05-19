import { LBCLogo } from "@/components/ui/lbc-logo"
import Link from "next/link"
import { Facebook, Twitter, Instagram, Youtube, Mail, Phone, MapPin } from "lucide-react"

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
                <Phone size={16} className="text-[#c9002f]" />
                <span className="text-gray-600">+63 2 8858-5999</span>
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
