import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Search, ChevronRight, Package, Truck, Globe, CreditCard, ShoppingBag, MapPin, ArrowRight } from "lucide-react"

export default function Home() {
  return (
    <div className="bg-white">
      {/* Hero Section */}
      <section className="relative">
        <div className="relative">
          <img src="/images/lbc-hero.png" alt="LBC Express Hero" className="w-full h-[600px] object-cover" />
          <div className="absolute inset-0 bg-black/40"></div>
        </div>
        <div className="absolute inset-0 flex items-center">
          <div className="container mx-auto px-4">
            <div className="max-w-xl text-white">
              <h1 className="text-4xl md:text-5xl font-bold mb-4">Move that online business forward!</h1>
              <p className="text-lg md:text-xl mb-8">Deliver your packages safely and on time with LBC Express.</p>
              <div className="flex flex-wrap gap-4">
                <Button className="bg-[#c9002f] hover:bg-[#a30026] text-white">Ship Now</Button>
                <Button variant="outline" className="border-white text-white hover:bg-white/10">
                  Learn More
                </Button>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Tracking Section */}
      <section className="py-12 bg-white">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto bg-white rounded-lg shadow-lg -mt-20 relative z-10 p-8">
            <h2 className="text-2xl font-bold mb-6 text-center">Track Your Package</h2>
            <form className="flex flex-col md:flex-row gap-4">
              <div className="flex-1 relative">
                <Search className="absolute left-3 top-3 h-5 w-5 text-gray-400" />
                <Input type="text" placeholder="Enter your tracking number" className="pl-10 py-6 text-lg" />
              </div>
              <Button type="submit" className="bg-[#c9002f] hover:bg-[#a30026] text-white py-6 px-8">
                Track
              </Button>
            </form>
          </div>
        </div>
      </section>

      {/* Services Section */}
      <section className="py-16 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold mb-4">Our Services</h2>
            <p className="text-gray-600 max-w-2xl mx-auto">
              We offer a wide range of shipping and logistics solutions to meet your needs.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="bg-white p-8 rounded-lg shadow-md text-center hover:shadow-xl transition-shadow">
              <div className="w-16 h-16 bg-[#c9002f]/10 rounded-full flex items-center justify-center mx-auto mb-6">
                <Package className="h-8 w-8 text-[#c9002f]" />
              </div>
              <h3 className="text-xl font-bold mb-3">Domestic Shipping</h3>
              <p className="text-gray-600 mb-6">Fast and reliable shipping services within the Philippines.</p>
              <Link
                href="/services/domestic"
                className="text-[#c9002f] font-medium flex items-center justify-center gap-2 hover:underline"
              >
                Learn More <ChevronRight className="h-4 w-4" />
              </Link>
            </div>

            <div className="bg-white p-8 rounded-lg shadow-md text-center hover:shadow-xl transition-shadow">
              <div className="w-16 h-16 bg-[#c9002f]/10 rounded-full flex items-center justify-center mx-auto mb-6">
                <Globe className="h-8 w-8 text-[#c9002f]" />
              </div>
              <h3 className="text-xl font-bold mb-3">International Shipping</h3>
              <p className="text-gray-600 mb-6">Connect with over 150 countries worldwide with our global network.</p>
              <Link
                href="/services/international"
                className="text-[#c9002f] font-medium flex items-center justify-center gap-2 hover:underline"
              >
                Learn More <ChevronRight className="h-4 w-4" />
              </Link>
            </div>

            <div className="bg-white p-8 rounded-lg shadow-md text-center hover:shadow-xl transition-shadow">
              <div className="w-16 h-16 bg-[#c9002f]/10 rounded-full flex items-center justify-center mx-auto mb-6">
                <CreditCard className="h-8 w-8 text-[#c9002f]" />
              </div>
              <h3 className="text-xl font-bold mb-3">Bills Payment</h3>
              <p className="text-gray-600 mb-6">Pay your bills conveniently at any LBC branch nationwide.</p>
              <Link
                href="/services/bills-payment"
                className="text-[#c9002f] font-medium flex items-center justify-center gap-2 hover:underline"
              >
                Learn More <ChevronRight className="h-4 w-4" />
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Business Solutions Section */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold mb-4">Business Solutions</h2>
            <p className="text-gray-600 max-w-2xl mx-auto">Tailored logistics solutions to help your business grow.</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            <div className="border border-gray-200 rounded-lg p-6 text-center hover:border-[#c9002f] transition-colors">
              <div className="w-12 h-12 bg-[#c9002f]/10 rounded-full flex items-center justify-center mx-auto mb-4">
                <Truck className="h-6 w-6 text-[#c9002f]" />
              </div>
              <h3 className="text-lg font-bold mb-2">Corporate Logistics</h3>
              <p className="text-gray-600 text-sm">End-to-end logistics solutions for businesses of all sizes.</p>
            </div>

            <div className="border border-gray-200 rounded-lg p-6 text-center hover:border-[#c9002f] transition-colors">
              <div className="w-12 h-12 bg-[#c9002f]/10 rounded-full flex items-center justify-center mx-auto mb-4">
                <ShoppingBag className="h-6 w-6 text-[#c9002f]" />
              </div>
              <h3 className="text-lg font-bold mb-2">E-Commerce Solutions</h3>
              <p className="text-gray-600 text-sm">Specialized shipping services for online businesses.</p>
            </div>

            <div className="border border-gray-200 rounded-lg p-6 text-center hover:border-[#c9002f] transition-colors">
              <div className="w-12 h-12 bg-[#c9002f]/10 rounded-full flex items-center justify-center mx-auto mb-4">
                <Globe className="h-6 w-6 text-[#c9002f]" />
              </div>
              <h3 className="text-lg font-bold mb-2">Global Distribution</h3>
              <p className="text-gray-600 text-sm">Worldwide shipping and distribution network.</p>
            </div>

            <div className="border border-gray-200 rounded-lg p-6 text-center hover:border-[#c9002f] transition-colors">
              <div className="w-12 h-12 bg-[#c9002f]/10 rounded-full flex items-center justify-center mx-auto mb-4">
                <Package className="h-6 w-6 text-[#c9002f]" />
              </div>
              <h3 className="text-lg font-bold mb-2">Warehousing</h3>
              <p className="text-gray-600 text-sm">Secure storage and inventory management solutions.</p>
            </div>
          </div>

          <div className="text-center mt-10">
            <Button className="bg-[#c9002f] hover:bg-[#a30026] text-white">View All Solutions</Button>
          </div>
        </div>
      </section>

      {/* App Download Section */}
      <section className="py-16 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="text-3xl font-bold mb-4">Download the LBC Mobile App</h2>
              <p className="text-gray-600 mb-6">
                Track your packages, book pickups, and manage your shipments on the go with our mobile app.
              </p>
              <div className="flex flex-wrap gap-4">
                <Link href="#" className="inline-block">
                  <img src="/images/app-store.png" alt="Download on App Store" className="h-12" />
                </Link>
                <Link href="#" className="inline-block">
                  <img src="/images/google-play.png" alt="Get it on Google Play" className="h-12" />
                </Link>
              </div>
            </div>
            <div className="flex justify-center">
              <img src="/images/lbc-app.png" alt="LBC Mobile App" className="max-h-[500px]" />
            </div>
          </div>
        </div>
      </section>

      {/* Testimonials Section */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold mb-4">What Our Customers Say</h2>
            <p className="text-gray-600 max-w-2xl mx-auto">
              Don't just take our word for it. Here's what our customers have to say about our services.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="bg-white p-8 rounded-lg shadow-md">
              <div className="flex items-center text-yellow-400 mb-4">
                <svg className="w-5 h-5 fill-current" viewBox="0 0 24 24">
                  <path d="M12 17.27L18.18 21l-1.64-7.03L22 9.24l-7.19-.61L12 2 9.19 8.63 2 9.24l5.46 4.73L5.82 21z" />
                </svg>
                <svg className="w-5 h-5 fill-current" viewBox="0 0 24 24">
                  <path d="M12 17.27L18.18 21l-1.64-7.03L22 9.24l-7.19-.61L12 2 9.19 8.63 2 9.24l5.46 4.73L5.82 21z" />
                </svg>
                <svg className="w-5 h-5 fill-current" viewBox="0 0 24 24">
                  <path d="M12 17.27L18.18 21l-1.64-7.03L22 9.24l-7.19-.61L12 2 9.19 8.63 2 9.24l5.46 4.73L5.82 21z" />
                </svg>
                <svg className="w-5 h-5 fill-current" viewBox="0 0 24 24">
                  <path d="M12 17.27L18.18 21l-1.64-7.03L22 9.24l-7.19-.61L12 2 9.19 8.63 2 9.24l5.46 4.73L5.82 21z" />
                </svg>
                <svg className="w-5 h-5 fill-current" viewBox="0 0 24 24">
                  <path d="M12 17.27L18.18 21l-1.64-7.03L22 9.24l-7.19-.61L12 2 9.19 8.63 2 9.24l5.46 4.73L5.82 21z" />
                </svg>
              </div>
              <p className="text-gray-600 mb-6">
                "LBC Express has been my go-to shipping partner for my online business. Their service is reliable and my
                customers are always happy with the fast delivery."
              </p>
              <div className="flex items-center">
                <img src="/images/customer1.png" alt="Customer" className="w-12 h-12 rounded-full mr-4" />
                <div>
                  <h4 className="font-bold">Maria Santos</h4>
                  <p className="text-sm text-gray-500">Online Shop Owner</p>
                </div>
              </div>
            </div>

            <div className="bg-white p-8 rounded-lg shadow-md">
              <div className="flex items-center text-yellow-400 mb-4">
                <svg className="w-5 h-5 fill-current" viewBox="0 0 24 24">
                  <path d="M12 17.27L18.18 21l-1.64-7.03L22 9.24l-7.19-.61L12 2 9.19 8.63 2 9.24l5.46 4.73L5.82 21z" />
                </svg>
                <svg className="w-5 h-5 fill-current" viewBox="0 0 24 24">
                  <path d="M12 17.27L18.18 21l-1.64-7.03L22 9.24l-7.19-.61L12 2 9.19 8.63 2 9.24l5.46 4.73L5.82 21z" />
                </svg>
                <svg className="w-5 h-5 fill-current" viewBox="0 0 24 24">
                  <path d="M12 17.27L18.18 21l-1.64-7.03L22 9.24l-7.19-.61L12 2 9.19 8.63 2 9.24l5.46 4.73L5.82 21z" />
                </svg>
                <svg className="w-5 h-5 fill-current" viewBox="0 0 24 24">
                  <path d="M12 17.27L18.18 21l-1.64-7.03L22 9.24l-7.19-.61L12 2 9.19 8.63 2 9.24l5.46 4.73L5.82 21z" />
                </svg>
                <svg className="w-5 h-5 fill-current" viewBox="0 0 24 24">
                  <path d="M12 17.27L18.18 21l-1.64-7.03L22 9.24l-7.19-.61L12 2 9.19 8.63 2 9.24l5.46 4.73L5.82 21z" />
                </svg>
              </div>
              <p className="text-gray-600 mb-6">
                "I've been using LBC for international shipping for years. Their service is consistent and their
                tracking system is very accurate."
              </p>
              <div className="flex items-center">
                <img src="/images/customer2.png" alt="Customer" className="w-12 h-12 rounded-full mr-4" />
                <div>
                  <h4 className="font-bold">John Reyes</h4>
                  <p className="text-sm text-gray-500">Frequent Shipper</p>
                </div>
              </div>
            </div>

            <div className="bg-white p-8 rounded-lg shadow-md">
              <div className="flex items-center text-yellow-400 mb-4">
                <svg className="w-5 h-5 fill-current" viewBox="0 0 24 24">
                  <path d="M12 17.27L18.18 21l-1.64-7.03L22 9.24l-7.19-.61L12 2 9.19 8.63 2 9.24l5.46 4.73L5.82 21z" />
                </svg>
                <svg className="w-5 h-5 fill-current" viewBox="0 0 24 24">
                  <path d="M12 17.27L18.18 21l-1.64-7.03L22 9.24l-7.19-.61L12 2 9.19 8.63 2 9.24l5.46 4.73L5.82 21z" />
                </svg>
                <svg className="w-5 h-5 fill-current" viewBox="0 0 24 24">
                  <path d="M12 17.27L18.18 21l-1.64-7.03L22 9.24l-7.19-.61L12 2 9.19 8.63 2 9.24l5.46 4.73L5.82 21z" />
                </svg>
                <svg className="w-5 h-5 fill-current" viewBox="0 0 24 24">
                  <path d="M12 17.27L18.18 21l-1.64-7.03L22 9.24l-7.19-.61L12 2 9.19 8.63 2 9.24l5.46 4.73L5.82 21z" />
                </svg>
                <svg className="w-5 h-5 fill-current" viewBox="0 0 24 24">
                  <path d="M12 17.27L18.18 21l-1.64-7.03L22 9.24l-7.19-.61L12 2 9.19 8.63 2 9.24l5.46 4.73L5.82 21z" />
                </svg>
              </div>
              <p className="text-gray-600 mb-6">
                "The customer service at LBC is exceptional. They always go above and beyond to help with my shipping
                needs."
              </p>
              <div className="flex items-center">
                <img src="/images/customer3.png" alt="Customer" className="w-12 h-12 rounded-full mr-4" />
                <div>
                  <h4 className="font-bold">Anna Cruz</h4>
                  <p className="text-sm text-gray-500">Business Owner</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Branch Locator Section */}
      <section className="py-16 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="text-3xl font-bold mb-4">Find an LBC Branch Near You</h2>
              <p className="text-gray-600 mb-6">
                With over 1,000 branches nationwide, there's always an LBC Express near you.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 mb-6">
                <div className="flex-1">
                  <Input type="text" placeholder="Enter your location" className="w-full" />
                </div>
                <Button className="bg-[#c9002f] hover:bg-[#a30026] text-white">
                  <MapPin className="mr-2 h-4 w-4" />
                  Find Branches
                </Button>
              </div>
              <Link href="/branch-locator" className="text-[#c9002f] font-medium flex items-center hover:underline">
                View All Branches <ArrowRight className="ml-2 h-4 w-4" />
              </Link>
            </div>
            <div className="rounded-lg overflow-hidden shadow-lg">
              <img src="/images/lbc-branch-map.png" alt="LBC Branch Map" className="w-full h-[400px] object-cover" />
            </div>
          </div>
        </div>
      </section>

      {/* Call to Action Section */}
      <section className="py-16 bg-[#c9002f] text-white">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl font-bold mb-6">Ready to Ship with LBC Express?</h2>
          <p className="text-xl mb-8 max-w-2xl mx-auto">
            Experience fast, reliable, and secure shipping services for your personal and business needs.
          </p>
          <div className="flex flex-wrap justify-center gap-4">
            <Button className="bg-white text-[#c9002f] hover:bg-gray-100">Ship Now</Button>
            <Button variant="outline" className="border-white text-white hover:bg-white/10">
              Contact Us
            </Button>
          </div>
        </div>
      </section>
    </div>
  )
}
