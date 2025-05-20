import type React from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { MapPin, Mail, Phone } from "lucide-react"

export default function ContactPage() {
  return (
    <div className="container py-12">
      <div className="max-w-4xl mx-auto">
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold mb-4">Contact Us</h1>
          <p className="text-gray-600 max-w-2xl mx-auto">
            We're here to help! Reach out to our team for any questions or concerns about our services.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-12">
          <Card>
            <CardHeader>
              <CardTitle>WhatsApp Support</CardTitle>
              <CardDescription>Chat with our support team directly</CardDescription>
            </CardHeader>
            <CardContent className="flex flex-col items-center">
              <div className="bg-[#25D366] rounded-full p-4 mb-4">
                <WhatsAppIcon className="h-8 w-8 text-white" />
              </div>
              <p className="text-lg font-bold mb-2">+63 961-631-2656</p>
              <p className="text-gray-600 text-center mb-4">
                Our support team is available via WhatsApp for quick assistance
              </p>
              <Button asChild className="bg-[#25D366] hover:bg-[#128C7E]">
                <a
                  href="https://wa.me/639616312656"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-2"
                >
                  <WhatsAppIcon className="h-4 w-4" />
                  Chat with Us
                </a>
              </Button>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Other Contact Methods</CardTitle>
              <CardDescription>Get in touch with us</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="flex items-start gap-4 mb-4">
                <Phone className="h-5 w-5 text-[#c9002f] mt-1" />
                <div>
                  <p className="font-medium">Phone</p>
                  <p className="text-gray-600">+63 931-789-7660</p>
                </div>
              </div>
              <div className="flex items-start gap-4 mb-4">
                <Mail className="h-5 w-5 text-[#c9002f] mt-1" />
                <div>
                  <p className="font-medium">Email</p>
                  <p className="text-gray-600">customercare@lbcexpress.com</p>
                </div>
              </div>
              <div className="flex items-start gap-4">
                <MapPin className="h-5 w-5 text-[#c9002f] mt-1" />
                <div>
                  <p className="font-medium">Address</p>
                  <p className="text-gray-600">
                    LBC Express, Inc. LBC Building, 1240 J.P. Rizal Avenue, Makati City, Philippines
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        <div className="bg-gray-100 rounded-lg p-8 text-center">
          <h2 className="text-2xl font-bold mb-4">Need Immediate Assistance?</h2>
          <p className="text-gray-600 mb-6">
            Our WhatsApp support line is the fastest way to get help with your shipping needs.
          </p>
          <Button asChild size="lg" className="bg-[#25D366] hover:bg-[#128C7E]">
            <a
              href="https://wa.me/639616312656"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-2"
            >
              <WhatsAppIcon className="h-5 w-5" />
              Message +63 961-631-2656 on WhatsApp
            </a>
          </Button>
        </div>
      </div>
    </div>
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
