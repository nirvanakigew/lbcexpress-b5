"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card, CardContent } from "@/components/ui/card"
import { TrackingTimeline } from "@/components/tracking-timeline"
import { formatDate } from "@/lib/utils"
import { Package } from "lucide-react"
import type { TrackingInfo } from "@/types"
import { supabase } from "@/lib/supabase/client"

export default function ShipmentTracker() {
  const [trackingNumber, setTrackingNumber] = useState("")
  const [isLoading, setIsLoading] = useState(false)
  const [trackingInfo, setTrackingInfo] = useState<TrackingInfo | null>(null)
  const [error, setError] = useState<string | null>(null)

  const handleTrack = async () => {
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
    <div className="space-y-6">
      <div className="flex flex-col space-y-2 sm:flex-row sm:space-x-2 sm:space-y-0">
        <Input
          placeholder="Enter tracking number (e.g., LBC26372)"
          value={trackingNumber}
          onChange={(e) => setTrackingNumber(e.target.value)}
          className="sm:flex-1"
        />
        <Button
          onClick={handleTrack}
          disabled={isLoading || !trackingNumber}
          className="bg-[#c9002f] hover:bg-[#a30026]"
        >
          {isLoading ? "Tracking..." : "Track Shipment"}
        </Button>
      </div>

      {error && (
        <div className="text-red-600 flex items-center">
          <Package className="mr-2 h-5 w-5" />
          <p>{error}</p>
        </div>
      )}

      {trackingInfo && (
        <Card>
          <CardContent className="pt-6">
            <div className="mb-6 grid gap-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-muted-foreground">Tracking Number</p>
                  <p className="font-medium">{trackingInfo.order.tracking_number}</p>
                </div>
                <div
                  className={`px-3 py-1 rounded-full text-sm font-medium ${getStatusColor(trackingInfo.order.status)}`}
                >
                  {trackingInfo.order.status}
                </div>
              </div>
              <div className="grid gap-4 sm:grid-cols-2">
                <div>
                  <p className="text-sm font-medium text-muted-foreground">From</p>
                  <p className="font-medium">{trackingInfo.order.sender_name}</p>
                  <p className="text-sm text-gray-600">{trackingInfo.order.sender_address}</p>
                </div>
                <div>
                  <p className="text-sm font-medium text-muted-foreground">To</p>
                  <p className="font-medium">{trackingInfo.order.recipient_name}</p>
                  <p className="text-sm text-gray-600">{trackingInfo.order.recipient_address}</p>
                </div>
              </div>
              <div>
                <p className="text-sm font-medium text-muted-foreground">Estimated Delivery</p>
                <p className="font-medium">
                  {trackingInfo.order.delivery_date ? formatDate(trackingInfo.order.delivery_date) : "Not available"}
                </p>
              </div>
            </div>

            <div className="border-t pt-6">
              <h3 className="font-medium mb-4">Tracking History</h3>
              {trackingInfo.history.length > 0 ? (
                <TrackingTimeline history={trackingInfo.history} />
              ) : (
                <div className="text-center py-4 text-gray-500">
                  <p>No tracking updates available yet.</p>
                </div>
              )}
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  )
}
