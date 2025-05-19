import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import ShipmentTracker from "@/components/shipment-tracker"

export default function TrackingPage() {
  return (
    <div className="container py-6">
      <div className="mb-6">
        <h1 className="text-2xl font-bold">Track Your Shipment</h1>
        <p className="text-muted-foreground">Enter your tracking number to get real-time updates on your shipment</p>
      </div>

      <Card className="max-w-3xl mx-auto">
        <CardHeader>
          <CardTitle>Shipment Tracking</CardTitle>
          <CardDescription>Track the status and location of your shipment in real-time</CardDescription>
        </CardHeader>
        <CardContent>
          <ShipmentTracker />
        </CardContent>
      </Card>

      <div className="mt-12 grid gap-6 md:grid-cols-3">
        <Card>
          <CardHeader>
            <CardTitle>How to Track</CardTitle>
          </CardHeader>
          <CardContent>
            <ol className="list-decimal pl-4 space-y-2">
              <li>Enter your tracking number in the field above</li>
              <li>Click the "Track Shipment" button</li>
              <li>View the real-time status and location of your package</li>
            </ol>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Tracking Status Meanings</CardTitle>
          </CardHeader>
          <CardContent>
            <ul className="space-y-2">
              <li>
                <strong>Order Placed:</strong> Your shipment has been booked
              </li>
              <li>
                <strong>Picked Up:</strong> Your package has been collected
              </li>
              <li>
                <strong>In Transit:</strong> Your package is on its way
              </li>
              <li>
                <strong>Out for Delivery:</strong> Your package will be delivered today
              </li>
              <li>
                <strong>Delivered:</strong> Your package has been delivered
              </li>
            </ul>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Need Help?</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="mb-4">
              If you need assistance with tracking your shipment, please contact our customer support team.
            </p>
            <div className="space-y-2">
              <p>
                <strong>Phone:</strong> +63 (2) 8123-4567
              </p>
              <p>
                <strong>Email:</strong> support@lbcexpress.com
              </p>
              <p>
                <strong>Hours:</strong> 24/7 Customer Support
              </p>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
