"use client"

import type React from "react"

import { useState, useEffect } from "react"
import { useRouter } from "next/navigation"
import { AdminHeader } from "@/components/admin/admin-header"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { TrackingTimeline } from "@/components/tracking-timeline"
import { formatDate, formatDateTime, ORDER_STATUSES } from "@/lib/utils"
import {
  Package,
  Truck,
  MapPin,
  Calendar,
  User,
  Phone,
  FileText,
  ArrowLeft,
  Plus,
  Trash2,
  AlertTriangle,
} from "lucide-react"
import { supabase } from "@/lib/supabase/client"
import type { Order, TrackingHistory } from "@/types"
import Link from "next/link"
import { toast } from "@/components/ui/use-toast"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"

export default function AdminOrderDetailPage({ params }: { params: { id: string } }) {
  const [isLoading, setIsLoading] = useState(true)
  const [order, setOrder] = useState<Order | null>(null)
  const [trackingHistory, setTrackingHistory] = useState<TrackingHistory[]>([])
  const [newStatus, setNewStatus] = useState("")
  const [newLocation, setNewLocation] = useState("")
  const [newDescription, setNewDescription] = useState("")
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [showDeleteDialog, setShowDeleteDialog] = useState(false)
  const [isDeleting, setIsDeleting] = useState(false)
  const router = useRouter()

  useEffect(() => {
    // Check if admin is logged in
    const admin = localStorage.getItem("admin")
    if (!admin) {
      router.push("/admin")
      return
    }

    fetchOrderDetails()
  }, [router, params.id])

  const fetchOrderDetails = async () => {
    setIsLoading(true)
    try {
      // Get order details
      const { data: orderData, error: orderError } = await supabase
        .from("orders")
        .select("*")
        .eq("id", params.id)
        .single()

      if (orderError) throw orderError

      setOrder(orderData)
      setNewStatus(orderData.status) // Set current status as default

      // Get tracking history
      const { data: historyData, error: historyError } = await supabase
        .from("tracking_history")
        .select("*")
        .eq("order_id", params.id)
        .order("timestamp", { ascending: false })

      if (historyError) throw historyError

      setTrackingHistory(historyData || [])
    } catch (error) {
      console.error("Error fetching order details:", error)
      toast({
        title: "Error",
        description: "Failed to load order details",
        variant: "destructive",
      })
    } finally {
      setIsLoading(false)
    }
  }

  const handleAddTrackingUpdate = async (e: React.FormEvent) => {
    e.preventDefault()

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
            order_id: params.id,
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
        .eq("id", params.id)
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

  const handleDeleteOrder = async () => {
    if (!order) return

    setIsDeleting(true)
    try {
      // First delete tracking history
      const { error: trackingError } = await supabase.from("tracking_history").delete().eq("order_id", params.id)

      if (trackingError) throw trackingError

      // Then delete the order
      const { error: orderError } = await supabase.from("orders").delete().eq("id", params.id)

      if (orderError) throw orderError

      toast({
        title: "Order deleted",
        description: `Order ${order.tracking_number} has been deleted successfully.`,
      })

      // Redirect to orders page
      router.push("/admin/orders")
    } catch (error) {
      console.error("Error deleting order:", error)
      toast({
        title: "Error",
        description: "Failed to delete order. Please try again.",
        variant: "destructive",
      })
      setIsDeleting(false)
      setShowDeleteDialog(false)
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
    <>
      <AdminHeader />
      <div className="container py-6">
        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center">
            <Button variant="outline" size="sm" asChild className="mr-4">
              <Link href="/admin/orders">
                <ArrowLeft className="mr-2 h-4 w-4" />
                Back to Orders
              </Link>
            </Button>
            <h1 className="text-2xl font-bold">Order Details</h1>
          </div>
          {order && (
            <Button
              variant="destructive"
              size="sm"
              onClick={() => setShowDeleteDialog(true)}
              className="bg-red-600 hover:bg-red-700"
            >
              <Trash2 className="mr-2 h-4 w-4" />
              Delete Order
            </Button>
          )}
        </div>

        {isLoading ? (
          <div className="flex justify-center py-8">
            <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-[#c9002f]"></div>
          </div>
        ) : order ? (
          <div className="space-y-6">
            <Card>
              <CardHeader>
                <div className="flex flex-col md:flex-row md:justify-between md:items-center gap-4">
                  <div>
                    <CardTitle className="text-2xl">Order Information</CardTitle>
                    <CardDescription>
                      Tracking Number: <span className="font-medium">{order.tracking_number}</span>
                    </CardDescription>
                  </div>
                  <div className={`px-4 py-2 rounded-full text-sm font-medium ${getStatusColor(order.status)}`}>
                    {order.status}
                  </div>
                </div>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-4">
                    <div>
                      <h3 className="text-sm font-medium text-gray-500 mb-1">Shipment Information</h3>
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
                        <div className="flex items-center">
                          <Truck className="mr-2 h-5 w-5 text-[#c9002f]" />
                          <div>
                            <p className="font-medium">{order.shipping_method}</p>
                            <p className="text-sm text-gray-600">{order.shipping_company}</p>
                          </div>
                        </div>
                        <div className="flex items-center">
                          <Calendar className="mr-2 h-5 w-5 text-[#c9002f]" />
                          <div>
                            <p className="font-medium">
                              {order.delivery_date
                                ? `Expected Delivery: ${formatDate(order.delivery_date)}`
                                : "Delivery Date: Not available"}
                            </p>
                            <p className="text-sm text-gray-600">Created: {formatDateTime(order.created_at)}</p>
                          </div>
                        </div>
                      </div>
                    </div>
                    <div>
                      <h3 className="text-sm font-medium text-gray-500 mb-1">Sender Information</h3>
                      <div className="space-y-2">
                        <div className="flex items-start">
                          <User className="mr-2 h-5 w-5 text-[#c9002f] mt-0.5" />
                          <div>
                            <p className="font-medium">{order.sender_name}</p>
                          </div>
                        </div>
                        <div className="flex items-start">
                          <Phone className="mr-2 h-5 w-5 text-[#c9002f] mt-0.5" />
                          <div>
                            <p className="font-medium">{order.sender_phone}</p>
                          </div>
                        </div>
                        <div className="flex items-start">
                          <MapPin className="mr-2 h-5 w-5 text-[#c9002f] mt-0.5" />
                          <div>
                            <p className="font-medium">{order.sender_address}</p>
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
                            <p className="font-medium">{order.recipient_name}</p>
                          </div>
                        </div>
                        <div className="flex items-start">
                          <Phone className="mr-2 h-5 w-5 text-[#c9002f] mt-0.5" />
                          <div>
                            <p className="font-medium">{order.recipient_phone}</p>
                          </div>
                        </div>
                        <div className="flex items-start">
                          <MapPin className="mr-2 h-5 w-5 text-[#c9002f] mt-0.5" />
                          <div>
                            <p className="font-medium">{order.recipient_address}</p>
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
                            <p className="font-medium">Weight: {order.weight} kg</p>
                            {order.dimensions && (
                              <p className="text-sm text-gray-600">Dimensions: {order.dimensions}</p>
                            )}
                          </div>
                        </div>
                        <div className="flex items-center">
                          <FileText className="mr-2 h-5 w-5 text-[#c9002f]" />
                          <div>
                            <p className="font-medium">
                              Value: {order.currency} {order.package_value?.toFixed(2) || "N/A"}
                            </p>
                            <p className="text-sm text-gray-600">
                              Shipping Cost: {order.currency} {order.shipping_cost.toFixed(2)}
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
                              {status}
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
        ) : (
          <div className="text-center py-8 text-gray-500">
            <Package className="mx-auto h-12 w-12 text-gray-400 mb-4" />
            <p>Order not found</p>
            <Button asChild className="mt-4">
              <Link href="/admin/orders">Back to Orders</Link>
            </Button>
          </div>
        )}
      </div>

      {/* Delete Confirmation Dialog */}
      <Dialog open={showDeleteDialog} onOpenChange={setShowDeleteDialog}>
        <DialogContent className="sm:max-w-md">
          <DialogHeader>
            <DialogTitle className="flex items-center gap-2">
              <AlertTriangle className="h-5 w-5 text-red-500" />
              Confirm Deletion
            </DialogTitle>
            <DialogDescription>
              Are you sure you want to delete order <span className="font-bold">{order?.tracking_number}</span>? This
              action cannot be undone and will permanently remove the order and all its tracking history.
            </DialogDescription>
          </DialogHeader>
          <DialogFooter className="flex flex-col sm:flex-row sm:justify-end gap-2">
            <Button variant="outline" onClick={() => setShowDeleteDialog(false)} disabled={isDeleting}>
              Cancel
            </Button>
            <Button
              variant="destructive"
              onClick={handleDeleteOrder}
              disabled={isDeleting}
              className="bg-red-600 hover:bg-red-700"
            >
              {isDeleting ? (
                <>
                  <div className="mr-2 h-4 w-4 animate-spin rounded-full border-2 border-white border-t-transparent"></div>
                  Deleting...
                </>
              ) : (
                <>
                  <Trash2 className="mr-2 h-4 w-4" />
                  Delete Order
                </>
              )}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </>
  )
}
