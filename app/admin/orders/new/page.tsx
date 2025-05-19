"use client"

import type React from "react"

import { useState, useEffect } from "react"
import { useRouter } from "next/navigation"
import { AdminHeader } from "@/components/admin/admin-header"
import { Card, CardContent, CardDescription, CardHeader, CardTitle, CardFooter } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { generateTrackingNumber } from "@/lib/utils"
import { ArrowLeft } from "lucide-react"
import { supabase } from "@/lib/supabase/client"
import Link from "next/link"
import { toast } from "@/components/ui/use-toast"

export default function AdminNewOrderPage() {
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [trackingNumber, setTrackingNumber] = useState(generateTrackingNumber())
  const router = useRouter()

  useEffect(() => {
    // Check if admin is logged in
    const admin = localStorage.getItem("admin")
    if (!admin) {
      router.push("/admin")
      return
    }
  }, [router])

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    setIsSubmitting(true)

    try {
      const formData = new FormData(e.currentTarget)

      // Extract form values
      const productName = formData.get("productName") as string
      const weight = Number.parseFloat(formData.get("weight") as string)
      const dimensions = formData.get("dimensions") as string
      const packageValue = formData.get("packageValue")
        ? Number.parseFloat(formData.get("packageValue") as string)
        : null
      const packageDescription = formData.get("packageDescription") as string

      const shippingCompany = formData.get("shippingCompany") as string
      const shippingMethod = formData.get("shippingMethod") as string
      const deliveryDate = formData.get("deliveryDate") as string

      const recipientName = formData.get("recipientName") as string
      const recipientPhone = formData.get("recipientPhone") as string
      const recipientAddress = formData.get("recipientAddress") as string

      const senderName = formData.get("senderName") as string
      const senderPhone = formData.get("senderPhone") as string
      const senderAddress = formData.get("senderAddress") as string

      const officerName = formData.get("officerName") as string
      const officerId = formData.get("officerId") as string

      const currency = formData.get("currency") as string
      const shippingCost = Number.parseFloat(formData.get("shippingCost") as string)

      // Calculate total amount
      const totalAmount = shippingCost + (packageValue || 0)

      // Create order
      const { data, error } = await supabase
        .from("orders")
        .insert([
          {
            tracking_number: trackingNumber,
            status: "Pending",
            product_name: productName,
            weight,
            dimensions: dimensions || null,
            package_value: packageValue,
            package_description: packageDescription || null,
            shipping_company: shippingCompany,
            shipping_method: shippingMethod,
            delivery_date: deliveryDate || null,
            recipient_name: recipientName,
            recipient_phone: recipientPhone,
            recipient_address: recipientAddress,
            sender_name: senderName,
            sender_phone: senderPhone,
            sender_address: senderAddress,
            officer_name: officerName || null,
            officer_id: officerId || null,
            currency,
            shipping_cost: shippingCost,
            total_amount: totalAmount,
          },
        ])
        .select()

      if (error) throw error

      // Create initial tracking history entry
      if (data && data.length > 0) {
        const { error: trackingError } = await supabase.from("tracking_history").insert([
          {
            order_id: data[0].id,
            status: "Pending",
            location: "Order created",
            description: "Order has been created and is pending processing",
          },
        ])

        if (trackingError) throw trackingError

        toast({
          title: "Success",
          description: `Order created successfully with tracking number ${trackingNumber}`,
        })

        // Redirect to order details page
        router.push(`/admin/orders/${data[0].id}`)
      }
    } catch (error) {
      console.error("Error creating order:", error)
      toast({
        title: "Error",
        description: "Failed to create order. Please try again.",
        variant: "destructive",
      })
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <>
      <AdminHeader />
      <div className="container py-6">
        <div className="flex items-center mb-6">
          <Button variant="outline" size="sm" asChild className="mr-4">
            <Link href="/admin/orders">
              <ArrowLeft className="mr-2 h-4 w-4" />
              Back to Orders
            </Link>
          </Button>
          <h1 className="text-2xl font-bold">Create New Order</h1>
        </div>

        <Card>
          <CardHeader>
            <CardTitle>New Order Information</CardTitle>
            <CardDescription>
              Create a new shipment order with tracking number: <span className="font-medium">{trackingNumber}</span>
            </CardDescription>
          </CardHeader>
          <CardContent>
            <form id="newOrderForm" onSubmit={handleSubmit} className="space-y-6">
              <div>
                <h3 className="text-lg font-medium mb-4">Package Information</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <label htmlFor="productName" className="text-sm font-medium">
                      Product Name *
                    </label>
                    <Input
                      id="productName"
                      name="productName"
                      required
                      placeholder="e.g., Electronics, Documents, Clothing"
                    />
                  </div>
                  <div className="space-y-2">
                    <label htmlFor="weight" className="text-sm font-medium">
                      Weight (kg) *
                    </label>
                    <Input
                      id="weight"
                      name="weight"
                      type="number"
                      step="0.01"
                      min="0.01"
                      required
                      placeholder="e.g., 1.5"
                    />
                  </div>
                  <div className="space-y-2">
                    <label htmlFor="dimensions" className="text-sm font-medium">
                      Dimensions (cm)
                    </label>
                    <Input id="dimensions" name="dimensions" placeholder="e.g., 30x20x10" />
                  </div>
                  <div className="space-y-2">
                    <label htmlFor="packageValue" className="text-sm font-medium">
                      Package Value
                    </label>
                    <Input
                      id="packageValue"
                      name="packageValue"
                      type="number"
                      step="0.01"
                      min="0"
                      placeholder="e.g., 5000"
                    />
                  </div>
                </div>
                <div className="mt-4 space-y-2">
                  <label htmlFor="packageDescription" className="text-sm font-medium">
                    Package Description
                  </label>
                  <Textarea
                    id="packageDescription"
                    name="packageDescription"
                    placeholder="Describe the contents of the package"
                    rows={3}
                  />
                </div>
              </div>

              <div>
                <h3 className="text-lg font-medium mb-4">Shipping Information</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <label htmlFor="shippingCompany" className="text-sm font-medium">
                      Shipping Company *
                    </label>
                    <Input id="shippingCompany" name="shippingCompany" defaultValue="LBC Express" required />
                  </div>
                  <div className="space-y-2">
                    <label htmlFor="shippingMethod" className="text-sm font-medium">
                      Shipping Method *
                    </label>
                    <Select name="shippingMethod" defaultValue="Standard">
                      <SelectTrigger id="shippingMethod">
                        <SelectValue placeholder="Select shipping method" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="Standard">Standard</SelectItem>
                        <SelectItem value="Express">Express</SelectItem>
                        <SelectItem value="Same Day">Same Day</SelectItem>
                        <SelectItem value="International">International</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <div className="space-y-2">
                    <label htmlFor="deliveryDate" className="text-sm font-medium">
                      Expected Delivery Date
                    </label>
                    <Input id="deliveryDate" name="deliveryDate" type="date" />
                  </div>
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <h3 className="text-lg font-medium mb-4">Sender Information</h3>
                  <div className="space-y-4">
                    <div className="space-y-2">
                      <label htmlFor="senderName" className="text-sm font-medium">
                        Sender Name *
                      </label>
                      <Input id="senderName" name="senderName" required placeholder="Full name" />
                    </div>
                    <div className="space-y-2">
                      <label htmlFor="senderPhone" className="text-sm font-medium">
                        Sender Phone *
                      </label>
                      <Input id="senderPhone" name="senderPhone" required placeholder="Phone number" />
                    </div>
                    <div className="space-y-2">
                      <label htmlFor="senderAddress" className="text-sm font-medium">
                        Sender Address *
                      </label>
                      <Textarea
                        id="senderAddress"
                        name="senderAddress"
                        required
                        placeholder="Complete address"
                        rows={3}
                      />
                    </div>
                  </div>
                </div>

                <div>
                  <h3 className="text-lg font-medium mb-4">Recipient Information</h3>
                  <div className="space-y-4">
                    <div className="space-y-2">
                      <label htmlFor="recipientName" className="text-sm font-medium">
                        Recipient Name *
                      </label>
                      <Input id="recipientName" name="recipientName" required placeholder="Full name" />
                    </div>
                    <div className="space-y-2">
                      <label htmlFor="recipientPhone" className="text-sm font-medium">
                        Recipient Phone *
                      </label>
                      <Input id="recipientPhone" name="recipientPhone" required placeholder="Phone number" />
                    </div>
                    <div className="space-y-2">
                      <label htmlFor="recipientAddress" className="text-sm font-medium">
                        Recipient Address *
                      </label>
                      <Textarea
                        id="recipientAddress"
                        name="recipientAddress"
                        required
                        placeholder="Complete address"
                        rows={3}
                      />
                    </div>
                  </div>
                </div>
              </div>

              <div>
                <h3 className="text-lg font-medium mb-4">Additional Information</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <label htmlFor="officerName" className="text-sm font-medium">
                      Officer Name
                    </label>
                    <Input id="officerName" name="officerName" placeholder="Name of handling officer" />
                  </div>
                  <div className="space-y-2">
                    <label htmlFor="officerId" className="text-sm font-medium">
                      Officer ID
                    </label>
                    <Input id="officerId" name="officerId" placeholder="ID of handling officer" />
                  </div>
                  <div className="space-y-2">
                    <label htmlFor="currency" className="text-sm font-medium">
                      Currency *
                    </label>
                    <Select name="currency" defaultValue="PHP">
                      <SelectTrigger id="currency">
                        <SelectValue placeholder="Select currency" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="PHP">PHP</SelectItem>
                        <SelectItem value="USD">USD</SelectItem>
                        <SelectItem value="EUR">EUR</SelectItem>
                        <SelectItem value="JPY">JPY</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <div className="space-y-2">
                    <label htmlFor="shippingCost" className="text-sm font-medium">
                      Shipping Cost *
                    </label>
                    <Input
                      id="shippingCost"
                      name="shippingCost"
                      type="number"
                      step="0.01"
                      min="0"
                      required
                      placeholder="e.g., 250"
                    />
                  </div>
                </div>
              </div>
            </form>
          </CardContent>
          <CardFooter className="flex justify-between">
            <Button variant="outline" asChild>
              <Link href="/admin/orders">Cancel</Link>
            </Button>
            <Button
              type="submit"
              form="newOrderForm"
              className="bg-[#c9002f] hover:bg-[#a30026]"
              disabled={isSubmitting}
            >
              {isSubmitting ? (
                <>
                  <div className="mr-2 h-4 w-4 animate-spin rounded-full border-2 border-white border-t-transparent"></div>
                  Creating...
                </>
              ) : (
                "Create Order"
              )}
            </Button>
          </CardFooter>
        </Card>
      </div>
    </>
  )
}
