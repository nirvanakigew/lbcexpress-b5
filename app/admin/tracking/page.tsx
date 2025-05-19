"use client"

import type React from "react"

import { useState, useEffect } from "react"
import { useRouter } from "next/navigation"
import { AdminHeader } from "@/components/admin/admin-header"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Textarea } from "@/components/ui/textarea"
import { TrackingTimeline } from "@/components/tracking-timeline"
import { ORDER_STATUSES } from "@/lib/utils"
import { Package, Search, Plus } from "lucide-react"
import { supabase } from "@/lib/supabase/client"
import type { Order, TrackingHistory } from "@/types"
import { toast } from "@/components/ui/use-toast"
import { DeliveryAnimation } from "@/components/delivery-animation"
import { AnimatedProductImage } from "@/components/animated-product-image"
import { AnimatedStatusIcon } from "@/components/animated-status-icon"

export default function AdminTrackingPage() {
  const [trackingNumber, setTrackingNumber] = useState("")
  const [isSearching, setIsSearching] = useState(false)
  const [order, setOrder] = useState<Order | null>(null)
  const [trackingHistory, setTrackingHistory] = useState<TrackingHistory[]>([])
  const [newStatus, setNewStatus] = useState("")
  const [newLocation, setNewLocation] = useState("")
  const [newDescription, setNewDescription] = useState("")
  const [isSubmitting, setIsSubmitting] = useState(false)
  const router = useRouter()

  useEffect(() => {
    // Check if admin is logged in
    const admin = localStorage.getItem("admin")
    if (!admin) {
      router.push("/admin")
      return
    }
  }, [router])

  const handleSearch = async (e: React.FormEvent) => {
    e.preventDefault()

    if (!trackingNumber) {
      toast({
        title: "Error",
        description: "Please enter a tracking number",
        variant: "destructive",
      })
      return
    }

    setIsSearching(true)

    try {
      // Get order by tracking number
      const { data: orderData, error: orderError } = await supabase
        .from("orders")
        .select("*")
        .eq("tracking_number", trackingNumber)
        .single()

      if (orderError) throw orderError

      setOrder(orderData)
      setNewStatus(orderData.status) // Set current status as default

      // Get tracking history
      const { data: historyData, error: historyError } = await supabase
        .from("tracking_history")
        .select("*")
        .eq("order_id", orderData.id)
        .order("timestamp", { ascending: false })

      if (historyError) throw historyError

      setTrackingHistory(historyData || [])
    } catch (error) {
      console.error("Error searching order:", error)
      toast({
        title: "Error",
        description: "No shipment found with this tracking number",
        variant: "destructive",
      })
      setOrder(null)
      setTrackingHistory([])
    } finally {
      setIsSearching(false)
    }
  }

  const handleAddTrackingUpdate = async (e: React.FormEvent) => {
    e.preventDefault()

    if (!order) return

    if (!newStatus) {
      toast({
        title: "Error",
        description: "Status is required",
        variant: "destructive",
      })
      return
    }

    setIsSubmitting(true)

    try {
      // Add new tracking history entry
      const { data: historyData, error: historyError } = await supabase
        .from("tracking_history")
        .insert([
          {
            order_id: order.id,
            status: newStatus,
            location: newLocation || null,
            description: newDescription || null,
          },
        ])
        .select()

      if (historyError) throw historyError

      // Update order status
      const { data: orderData, error: orderError } = await supabase
        .from("orders")
        .update({
          status: newStatus,
          updated_at: new Date().toISOString(),
        })
        .eq("id", order.id)
        .select()

      if (orderError) throw orderError

      // Update local state
      if (orderData && orderData.length > 0) {
        setOrder(orderData[0])
      }

      if (historyData && historyData.length > 0) {
        setTrackingHistory([historyData[0], ...trackingHistory])
      }

      // Reset form
      setNewLocation("")
      setNewDescription("")

      toast({
        title: "Success",
        description: "Tracking information updated successfully",
      })
    } catch (error) {
      console.error("Error updating tracking:", error)
      toast({
        title: "Error",
        description: "Failed to update tracking information",
        variant: "destructive",
      })
    } finally {
      setIsSubmitting(false)
    }
  }

  const getStatusColor = (status: string) => {
    switch (status.toLowerCase()) {
      case "delivered":
        return "bg-green-100 text-green-800"
      case "in transit":
        return "bg-blue-100 text-blue-800"
      case "out for delivery":
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
    <>
      <AdminHeader />
      <div className="container py-6">
        <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-6">
          <div>
            <h1 className="text-2xl font-bold">Tracking Management</h1>
            <p className="text-muted-foreground">Update tracking information for shipments</p>
          </div>
        </div>

        <Card className="mb-6">
          <CardHeader>
            <CardTitle>Search Shipment</CardTitle>
            <CardDescription>Enter a tracking number to find a shipment</CardDescription>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSearch} className="flex flex-col sm:flex-row gap-4">
              <div className="relative flex-1">
                <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
                <Input
                  type="text"
                  placeholder="Enter tracking number (e.g., LBC26372)"
                  className="pl-8"
                  value={trackingNumber}
                  onChange={(e) => setTrackingNumber(e.target.value)}
                />
              </div>
              <Button type="submit" disabled={isSearching} className="bg-[#c9002f] hover:bg-[#a30026]">
                {isSearching ? "Searching..." : "Search"}
              </Button>
            </form>
          </CardContent>
        </Card>

        {order && (
          <div className="space-y-6">
            <Card className="mb-6">
              <CardHeader>
                <div className="flex flex-col md:flex-row md:justify-between md:items-center gap-4">
                  <div>
                    <CardTitle className="text-2xl">Order Details</CardTitle>
                    <CardDescription>
                      Tracking Number: <span className="font-medium">{order.tracking_number}</span>
                    </CardDescription>
                  </div>
                  <div
                    className={`px-4 py-2 rounded-full text-sm font-medium flex items-center gap-2 ${getStatusColor(order.status)}`}
                  >
                    <AnimatedStatusIcon status={order.status} size="sm" />
                    {order.status}
                  </div>
                </div>
              </CardHeader>
              <CardContent>
                {/* Add delivery animation */}
                <DeliveryAnimation method={order.shipping_method} status={order.status} />

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-4">
                    <div>
                      <h3 className="text-sm font-medium text-gray-500 mb-1">Shipment Information</h3>
                      <div className="flex items-start gap-4 mb-4">
                        <AnimatedProductImage productName={order.product_name} className="w-24 h-24" />
                        <div className="space-y-2">
                          <div className="flex items-start">
                            <Package className="mr-2 h-5 w-5 text-[#c9002f] mt-0.5" />
                            <div>
                              <p className="font-medium">{order.product_name}</p>
                              <p className="text-sm text-gray-600">
                                {order.package_description || "No description provided"}
                              </p>
                            </div>
                          </div>
                          {/* Rest of the shipment information */}
                        </div>
                      </div>
                    </div>
                    {/* Rest of the content */}
                  </div>
                  {/* Rest of the content */}
                  <div>
                    <h3 className="text-sm font-medium text-gray-500 mb-1">Current Status</h3>
                    <p className="font-medium">{order.status}</p>
                    <p className="text-sm text-gray-600">Last Updated: {new Date(order.updated_at).toLocaleString()}</p>
                  </div>
                  <div>
                    <h3 className="text-sm font-medium text-gray-500 mb-1">Delivery</h3>
                    <p className="font-medium">
                      {order.delivery_date
                        ? `Expected: ${new Date(order.delivery_date).toLocaleDateString()}`
                        : "No delivery date set"}
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Add Tracking Update</CardTitle>
                <CardDescription>Update the status and location of this shipment</CardDescription>
              </CardHeader>
              <CardContent>
                <form onSubmit={handleAddTrackingUpdate} className="space-y-4">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <label htmlFor="status" className="text-sm font-medium">
                        Status *
                      </label>
                      <Select value={newStatus} onValueChange={setNewStatus} required>
                        <SelectTrigger id="status">
                          <SelectValue placeholder="Select status" />
                        </SelectTrigger>
                        <SelectContent>
                          {ORDER_STATUSES.map((status) => (
                            <SelectItem key={status} value={status}>
                              <div className="flex items-center gap-2">
                                <AnimatedStatusIcon status={status} size="sm" />
                                {status}
                              </div>
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </div>
                    <div className="space-y-2">
                      <label htmlFor="location" className="text-sm font-medium">
                        Location
                      </label>
                      <Input
                        id="location"
                        value={newLocation}
                        onChange={(e) => setNewLocation(e.target.value)}
                        placeholder="e.g., Manila Sorting Facility"
                      />
                    </div>
                  </div>
                  <div className="space-y-2">
                    <label htmlFor="description" className="text-sm font-medium">
                      Description
                    </label>
                    <Textarea
                      id="description"
                      value={newDescription}
                      onChange={(e) => setNewDescription(e.target.value)}
                      placeholder="Additional details about this update"
                      rows={3}
                    />
                  </div>
                  <Button type="submit" className="bg-[#c9002f] hover:bg-[#a30026]" disabled={isSubmitting}>
                    {isSubmitting ? (
                      <>
                        <div className="mr-2 h-4 w-4 animate-spin rounded-full border-2 border-white border-t-transparent"></div>
                        Updating...
                      </>
                    ) : (
                      <>
                        <Plus className="mr-2 h-4 w-4" />
                        Add Update
                      </>
                    )}
                  </Button>
                </form>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Tracking History</CardTitle>
                <CardDescription>Complete history of tracking updates for this shipment</CardDescription>
              </CardHeader>
              <CardContent>
                {trackingHistory.length > 0 ? (
                  <TrackingTimeline history={trackingHistory} />
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

        {!order && !isSearching && trackingNumber && (
          <div className="text-center py-8 text-gray-500">
            <Package className="mx-auto h-12 w-12 text-gray-400 mb-4" />
            <p>No shipment found with tracking number: {trackingNumber}</p>
            <p className="mt-2">Please check the tracking number and try again.</p>
          </div>
        )}

        {!order && !trackingNumber && (
          <div className="text-center py-8 text-gray-500">
            <Package className="mx-auto h-12 w-12 text-gray-400 mb-4" />
            <p>Enter a tracking number to view and update shipment information.</p>
          </div>
        )}
      </div>
    </>
  )
}
