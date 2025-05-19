"use client"

import type React from "react"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Checkbox } from "@/components/ui/checkbox"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { toast } from "@/components/ui/use-toast"
import { ToastAction } from "@/components/ui/toast"

export default function CreateShipmentPage() {
  const [isSubmitting, setIsSubmitting] = useState(false)

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    setIsSubmitting(true)

    // Simulate API call
    setTimeout(() => {
      setIsSubmitting(false)
      toast({
        title: "Shipment Created",
        description: "Your shipment has been created successfully. Tracking ID: SHP-1244",
        action: <ToastAction altText="View">View</ToastAction>,
      })
    }, 2000)
  }

  return (
    <div className="container py-6">
      <div className="mb-6">
        <h1 className="text-2xl font-bold">Create New Shipment</h1>
        <p className="text-muted-foreground">Fill out the form below to create a new shipment</p>
      </div>

      <Tabs defaultValue="domestic" className="max-w-4xl mx-auto">
        <TabsList className="grid w-full grid-cols-2">
          <TabsTrigger value="domestic">Domestic Shipment</TabsTrigger>
          <TabsTrigger value="international">International Shipment</TabsTrigger>
        </TabsList>

        <TabsContent value="domestic">
          <Card>
            <form onSubmit={handleSubmit}>
              <CardHeader>
                <CardTitle>Domestic Shipment Details</CardTitle>
                <CardDescription>Create a new shipment within the Philippines</CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-4">
                    <div>
                      <h3 className="text-lg font-medium">Sender Information</h3>
                      <p className="text-sm text-muted-foreground">Enter the sender's details</p>
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="senderName">Full Name</Label>
                      <Input id="senderName" placeholder="Enter full name" required />
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="senderPhone">Phone Number</Label>
                      <Input id="senderPhone" placeholder="Enter phone number" required />
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="senderEmail">Email Address</Label>
                      <Input id="senderEmail" type="email" placeholder="Enter email address" />
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="senderAddress">Complete Address</Label>
                      <Textarea id="senderAddress" placeholder="Enter complete address" required />
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="senderCity">City</Label>
                      <Input id="senderCity" placeholder="Enter city" required />
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="senderProvince">Province</Label>
                      <Select>
                        <SelectTrigger id="senderProvince">
                          <SelectValue placeholder="Select province" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="metro-manila">Metro Manila</SelectItem>
                          <SelectItem value="cebu">Cebu</SelectItem>
                          <SelectItem value="davao">Davao</SelectItem>
                          <SelectItem value="iloilo">Iloilo</SelectItem>
                          <SelectItem value="other">Other</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                  </div>

                  <div className="space-y-4">
                    <div>
                      <h3 className="text-lg font-medium">Recipient Information</h3>
                      <p className="text-sm text-muted-foreground">Enter the recipient's details</p>
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="recipientName">Full Name</Label>
                      <Input id="recipientName" placeholder="Enter full name" required />
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="recipientPhone">Phone Number</Label>
                      <Input id="recipientPhone" placeholder="Enter phone number" required />
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="recipientEmail">Email Address</Label>
                      <Input id="recipientEmail" type="email" placeholder="Enter email address" />
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="recipientAddress">Complete Address</Label>
                      <Textarea id="recipientAddress" placeholder="Enter complete address" required />
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="recipientCity">City</Label>
                      <Input id="recipientCity" placeholder="Enter city" required />
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="recipientProvince">Province</Label>
                      <Select>
                        <SelectTrigger id="recipientProvince">
                          <SelectValue placeholder="Select province" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="metro-manila">Metro Manila</SelectItem>
                          <SelectItem value="cebu">Cebu</SelectItem>
                          <SelectItem value="davao">Davao</SelectItem>
                          <SelectItem value="iloilo">Iloilo</SelectItem>
                          <SelectItem value="other">Other</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                  </div>
                </div>

                <div className="space-y-4">
                  <div>
                    <h3 className="text-lg font-medium">Package Details</h3>
                    <p className="text-sm text-muted-foreground">Enter the package details</p>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="space-y-2">
                      <Label htmlFor="packageType">Package Type</Label>
                      <Select>
                        <SelectTrigger id="packageType">
                          <SelectValue placeholder="Select package type" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="document">Document</SelectItem>
                          <SelectItem value="small-package">Small Package</SelectItem>
                          <SelectItem value="medium-package">Medium Package</SelectItem>
                          <SelectItem value="large-package">Large Package</SelectItem>
                          <SelectItem value="box">Box</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="serviceType">Service Type</Label>
                      <Select>
                        <SelectTrigger id="serviceType">
                          <SelectValue placeholder="Select service type" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="standard">Standard Delivery</SelectItem>
                          <SelectItem value="express">Express Delivery</SelectItem>
                          <SelectItem value="same-day">Same Day Delivery</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="weight">Weight (kg)</Label>
                      <Input id="weight" type="number" min="0.1" step="0.1" placeholder="Enter weight" required />
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="dimensions">Dimensions (cm)</Label>
                      <div className="grid grid-cols-3 gap-2">
                        <Input placeholder="Length" />
                        <Input placeholder="Width" />
                        <Input placeholder="Height" />
                      </div>
                    </div>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="packageContents">Package Contents</Label>
                    <Textarea id="packageContents" placeholder="Describe the contents of your package" required />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="declaredValue">Declared Value (PHP)</Label>
                    <Input id="declaredValue" type="number" min="0" placeholder="Enter declared value" required />
                  </div>

                  <div className="space-y-2">
                    <Label>Additional Services</Label>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
                      <div className="flex items-center space-x-2">
                        <Checkbox id="insurance" />
                        <Label htmlFor="insurance">Insurance</Label>
                      </div>
                      <div className="flex items-center space-x-2">
                        <Checkbox id="signature" />
                        <Label htmlFor="signature">Signature Required</Label>
                      </div>
                      <div className="flex items-center space-x-2">
                        <Checkbox id="fragile" />
                        <Label htmlFor="fragile">Fragile Handling</Label>
                      </div>
                      <div className="flex items-center space-x-2">
                        <Checkbox id="gift" />
                        <Label htmlFor="gift">Gift Wrapping</Label>
                      </div>
                    </div>
                  </div>

                  <div className="space-y-2">
                    <Label>Payment Method</Label>
                    <RadioGroup defaultValue="sender">
                      <div className="flex items-center space-x-2">
                        <RadioGroupItem value="sender" id="sender" />
                        <Label htmlFor="sender">Sender Pays</Label>
                      </div>
                      <div className="flex items-center space-x-2">
                        <RadioGroupItem value="recipient" id="recipient" />
                        <Label htmlFor="recipient">Recipient Pays</Label>
                      </div>
                      <div className="flex items-center space-x-2">
                        <RadioGroupItem value="third-party" id="third-party" />
                        <Label htmlFor="third-party">Third Party Pays</Label>
                      </div>
                    </RadioGroup>
                  </div>
                </div>
              </CardContent>
              <CardFooter className="flex justify-between">
                <Button variant="outline">Save as Draft</Button>
                <Button type="submit" disabled={isSubmitting}>
                  {isSubmitting ? "Creating..." : "Create Shipment"}
                </Button>
              </CardFooter>
            </form>
          </Card>
        </TabsContent>

        <TabsContent value="international">
          <Card>
            <CardHeader>
              <CardTitle>International Shipment Details</CardTitle>
              <CardDescription>Create a new international shipment</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="flex items-center justify-center h-40">
                <p className="text-muted-foreground">International shipping form coming soon</p>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  )
}
