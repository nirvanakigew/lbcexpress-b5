"use client"

import type React from "react"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { TrackingTimeline } from "@/components/tracking-timeline"
import { formatDate } from "@/lib/utils"
import { Package, Truck, MapPin, Calendar, User, Phone, FileText } from "lucide-react"
import type { TrackingInfo } from "@/types"
import { supabase } from "@/lib/supabase/client"
import { DeliveryAnimation } from "@/components/delivery-animation"
import { AnimatedProductImage } from "@/components/animated-product-image"
import { AnimatedStatusIcon } from "@/components/animated-status-icon"

export default function TrackPage() {
  const [trackingNumber, setTrackingNumber] = useState("")
  const [isLoading, setIsLoading] = useState(false)
  const [trackingInfo, setTrackingInfo] = useState<TrackingInfo | null>(null)
  const [error, setError] = useState<string | null>(null)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()

    if (!trackingNumber) {
      setError("Please enter a tracking number")
      return
    }

    setIsLoading(true)
    setError(null)

    try {
      // Get order by tracking number
      const { data: orderData, error: orderError } = await supabase
        .from("orders")
        .select("*")
        .eq("tracking_number", trackingNumber)
        .single()

      if (orderError) throw orderError
      if (!orderData) throw new Error("Order not found")

      // Get tracking history for the order
      const { data: historyData, error: historyError } = await supabase
        .from("tracking_history")
        .select("*")
        .eq("order_id", orderData.id)
        .order("timestamp", { ascending: false })

      if (historyError) throw historyError

      setTrackingInfo({
        order: orderData,
        history: historyData || [],
      })
    } catch (err) {
      console.error("Error fetching tracking info:", err)
      setError("No shipment found with this tracking number. Please check and try again.")
      setTrackingInfo(null)
    } finally {
      setIsLoading(false)
    }
  }

  const getStatusColor = (status: string) => {
    switch (status.toLowerCase()) {
      case "delivered":
        return "bg-green-100 text-green-800"
      case "in transit":
      case "out for delivery":
      case "package received":
        return "bg-blue-100 text-blue-800"
      case "on hold":
      case "delayed":
        return "bg-yellow-100 text-yellow-800"
      case "failed delivery":
      case "returned to sender":
        return "bg-red-100 text-red-800"
      default:
        return "bg-gray-100 text-gray-800"
    }
  }

  return (
    <div className="container py-12">
      <div className="max-w-4xl mx-auto">
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold mb-2">Track Your Shipment</h1>
          <p className="text-gray-600">Enter your tracking number to get real-time updates on your shipment.</p>
        </div>

        <Card className="mb-8">
          <CardContent className="pt-6">
            <form onSubmit={handleSubmit} className="flex flex-col sm:flex-row gap-4">
              <Input
                value={trackingNumber}
                onChange={(e) => setTrackingNumber(e.target.value)}
                placeholder="Enter tracking number (e.g., LBC26372)"
                className="flex-1"
              />
              <Button type="submit" disabled={isLoading} className="bg-[#c9002f] hover:bg-[#a30026]">
                {isLoading ? "Tracking..." : "Track Shipment"}
              </Button>
            </form>
          </CardContent>
        </Card>

        {error && (
          <Card className="border-red-200 mb-8">
            <CardContent className="pt-6">
              <div className="flex items-center text-red-600">
                <Package className="mr-2 h-5 w-5" />
                <p>{error}</p>
              </div>
            </CardContent>
          </Card>
        )}

        {trackingInfo && (
          <div className="space-y-8">
            <Card>
              <CardHeader>
                <div className="flex flex-col md:flex-row md:justify-between md:items-center gap-4">
                  <div>
                    <CardTitle className="text-2xl">Tracking Details</CardTitle>
                    <CardDescription>
                      Tracking Number: <span className="font-medium">{trackingInfo.order.tracking_number}</span>
                    </CardDescription>
                  </div>
                  <div
                    className={`px-4 py-2 rounded-full text-sm font-medium flex items-center gap-2 ${getStatusColor(
                      trackingInfo.order.status,
                    )}`}
                  >
                    <AnimatedStatusIcon status={trackingInfo.order.status} size="sm" />
                    {trackingInfo.order.status}
                  </div>
                </div>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-4">
                    <div>
                      <h3 className="text-sm font-medium text-gray-500 mb-1">Shipment Information</h3>
                      <div className="flex items-start gap-4 mb-4">
                        <AnimatedProductImage productName={trackingInfo.order.product_name} className="w-24 h-24" />
                        <div className="space-y-2">
                          <div className="flex items-start">
                            <Package className="mr-2 h-5 w-5 text-[#c9002f] mt-0.5" />
                            <div>
                              <p className="font-medium">{trackingInfo.order.product_name}</p>
                              <p className="text-sm text-gray-600">
                                {trackingInfo.order.package_description || "No description provided"}
                              </p>
                            </div>
                          </div>
                          <div className="flex items-center">
                            <Truck className="mr-2 h-5 w-5 text-[#c9002f]" />
                            <div>
                              <p className="font-medium">{trackingInfo.order.shipping_method}</p>
                              <p className="text-sm text-gray-600">{trackingInfo.order.shipping_company}</p>
                            </div>
                          </div>
                          <div className="flex items-center">
                            <Calendar className="mr-2 h-5 w-5 text-[#c9002f]" />
                            <div>
                              <p className="font-medium">
                                {trackingInfo.order.delivery_date
                                  ? `Expected Delivery: ${formatDate(trackingInfo.order.delivery_date)}`
                                  : "Delivery Date: Not available"}
                              </p>
                            </div>
                          </div>
                        </div>
                      </div>

                      {/* Add the delivery animation */}
                      <DeliveryAnimation
                        method={trackingInfo.order.shipping_method}
                        status={trackingInfo.order.status}
                      />
                    </div>
                    <div>
                      <h3 className="text-sm font-medium text-gray-500 mb-1">Sender Information</h3>
                      <div className="space-y-2">
                        <div className="flex items-start">
                          <User className="mr-2 h-5 w-5 text-[#c9002f] mt-0.5" />
                          <div>
                            <p className="font-medium">{trackingInfo.order.sender_name}</p>
                          </div>
                        </div>
                        <div className="flex items-start">
                          <Phone className="mr-2 h-5 w-5 text-[#c9002f] mt-0.5" />
                          <div>
                            <p className="font-medium">{trackingInfo.order.sender_phone}</p>
                          </div>
                        </div>
                        <div className="flex items-start">
                          <MapPin className="mr-2 h-5 w-5 text-[#c9002f] mt-0.5" />
                          <div>
                            <p className="font-medium">{trackingInfo.order.sender_address}</p>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="space-y-4">
                    <div>
                      <h3 className="text-sm font-medium text-gray-500 mb-1">Recipient Information</h3>
                      <div className="space-y-2">
                        <div className="flex items-start">
                          <User className="mr-2 h-5 w-5 text-[#c9002f] mt-0.5" />
                          <div>
                            <p className="font-medium">{trackingInfo.order.recipient_name}</p>
                          </div>
                        </div>
                        <div className="flex items-start">
                          <Phone className="mr-2 h-5 w-5 text-[#c9002f] mt-0.5" />
                          <div>
                            <p className="font-medium">{trackingInfo.order.recipient_phone}</p>
                          </div>
                        </div>
                        <div className="flex items-start">
                          <MapPin className="mr-2 h-5 w-5 text-[#c9002f] mt-0.5" />
                          <div>
                            <p className="font-medium">{trackingInfo.order.recipient_address}</p>
                          </div>
                        </div>
                      </div>
                    </div>
                    <div>
                      <h3 className="text-sm font-medium text-gray-500 mb-1">Package Details</h3>
                      <div className="space-y-2">
                        <div className="flex items-center">
                          <FileText className="mr-2 h-5 w-5 text-[#c9002f]" />
                          <div>
                            <p className="font-medium">Weight: {trackingInfo.order.weight} kg</p>
                            {trackingInfo.order.dimensions && (
                              <p className="text-sm text-gray-600">Dimensions: {trackingInfo.order.dimensions}</p>
                            )}
                          </div>
                        </div>
                        <div className="flex items-center">
                          <FileText className="mr-2 h-5 w-5 text-[#c9002f]" />
                          <div>
                            <p className="font-medium">
                              Value: {trackingInfo.order.currency}{" "}
                              {trackingInfo.order.package_value?.toFixed(2) || "N/A"}
                            </p>
                            <p className="text-sm text-gray-600">
                              Shipping Cost: {trackingInfo.order.currency} {trackingInfo.order.shipping_cost.toFixed(2)}
                            </p>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Tracking History</CardTitle>
                <CardDescription>Follow the journey of your package from sender to recipient</CardDescription>
              </CardHeader>
              <CardContent>
                {trackingInfo.history.length > 0 ? (
                  <TrackingTimeline history={trackingInfo.history} />
                ) : (
                  <div className="text-center py-8 text-gray-500">
                    <Package className="mx-auto h-12 w-12 text-gray-400 mb-4" />
                    <p>No tracking updates available yet.</p>
                  </div>
                )}
              </CardContent>
            </Card>
          </div>
        )}

        {!trackingInfo && !error && (
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-12">
            <Card>
              <CardContent className="pt-6">
                <div className="text-center">
                  <div className="mx-auto w-12 h-12 flex items-center justify-center rounded-full bg-[#c9002f]/10 text-[#c9002f] mb-4">
                    <Package className="h-6 w-6" />
                  </div>
                  <h3 className="text-lg font-medium mb-2">How to Track</h3>
                  <p className="text-gray-600 text-sm">
                    Enter your tracking number in the field above and click "Track Shipment" to see your package status.
                  </p>
                </div>
              </CardContent>
            </Card>
            <Card>
              <CardContent className="pt-6">
                <div className="text-center">
                  <div className="mx-auto w-12 h-12 flex items-center justify-center rounded-full bg-[#c9002f]/10 text-[#c9002f] mb-4">
                    <Truck className="h-6 w-6" />
                  </div>
                  <h3 className="text-lg font-medium mb-2">Delivery Status</h3>
                  <p className="text-gray-600 text-sm">
                    Track the real-time status of your package from pickup to delivery with detailed updates.
                  </p>
                </div>
              </CardContent>
            </Card>
            <Card>
              <CardContent className="pt-6">
                <div className="text-center">
                  <div className="mx-auto w-12 h-12 flex items-center justify-center rounded-full bg-[#c9002f]/10 text-[#c9002f] mb-4">
                    <MapPin className="h-6 w-6" />
                  </div>
                  <h3 className="text-lg font-medium mb-2">Location Updates</h3>
                  <p className="text-gray-600 text-sm">
                    See where your package has been and where it's headed next with our detailed tracking system.
                  </p>
                </div>
              </CardContent>
            </Card>
          </div>
        )}
      </div>
    </div>
  )
}
