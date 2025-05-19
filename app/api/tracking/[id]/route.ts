import { NextResponse } from "next/server"

// Sample tracking data
const trackingData = {
  "SHP-1234": {
    id: "SHP-1234",
    status: "Delivered",
    origin: "Manila, Philippines",
    destination: "Cebu, Philippines",
    estimatedDelivery: "May 19, 2025",
    timeline: [
      { status: "Order Placed", date: "May 15, 2025", time: "09:15 AM", completed: true },
      { status: "Picked Up", date: "May 16, 2025", time: "10:30 AM", completed: true },
      { status: "In Transit", date: "May 17, 2025", time: "02:45 PM", completed: true },
      { status: "Out for Delivery", date: "May 18, 2025", time: "08:00 AM", completed: true },
      { status: "Delivered", date: "May 19, 2025", time: "11:20 AM", completed: true },
    ],
  },
  "SHP-1235": {
    id: "SHP-1235",
    status: "In Transit",
    origin: "Davao, Philippines",
    destination: "Manila, Philippines",
    estimatedDelivery: "May 21, 2025",
    timeline: [
      { status: "Order Placed", date: "May 17, 2025", time: "11:30 AM", completed: true },
      { status: "Picked Up", date: "May 18, 2025", time: "01:45 PM", completed: true },
      { status: "In Transit", date: "May 19, 2025", time: "09:20 AM", completed: true },
      { status: "Out for Delivery", date: "May 21, 2025", time: "Expected", completed: false },
      { status: "Delivered", date: "May 21, 2025", time: "Expected", completed: false },
    ],
  },
  "SHP-1236": {
    id: "SHP-1236",
    status: "Processing",
    origin: "Cebu, Philippines",
    destination: "Bohol, Philippines",
    estimatedDelivery: "May 22, 2025",
    timeline: [
      { status: "Order Placed", date: "May 18, 2025", time: "03:45 PM", completed: true },
      { status: "Picked Up", date: "May 20, 2025", time: "Expected", completed: false },
      { status: "In Transit", date: "May 21, 2025", time: "Expected", completed: false },
      { status: "Out for Delivery", date: "May 22, 2025", time: "Expected", completed: false },
      { status: "Delivered", date: "May 22, 2025", time: "Expected", completed: false },
    ],
  },
}

export async function GET(request: Request, { params }: { params: { id: string } }) {
  try {
    const id = params.id

    // Check if tracking data exists for the given ID
    if (trackingData[id]) {
      return NextResponse.json(trackingData[id])
    }

    // If no tracking data found, generate a random one
    const randomStatus = Math.random() > 0.5 ? "In Transit" : "Processing"
    const today = new Date()
    const estimatedDelivery = new Date(today)
    estimatedDelivery.setDate(today.getDate() + 3)

    const formattedEstimatedDelivery = estimatedDelivery.toLocaleDateString("en-US", {
      year: "numeric",
      month: "long",
      day: "numeric",
    })

    const orderPlacedDate = new Date(today)
    orderPlacedDate.setDate(today.getDate() - 1)

    const formattedOrderPlacedDate = orderPlacedDate.toLocaleDateString("en-US", {
      year: "numeric",
      month: "long",
      day: "numeric",
    })

    const randomData = {
      id,
      status: randomStatus,
      origin: "Manila, Philippines",
      destination: "Cebu, Philippines",
      estimatedDelivery: formattedEstimatedDelivery,
      timeline: [
        { status: "Order Placed", date: formattedOrderPlacedDate, time: "09:15 AM", completed: true },
        {
          status: "Picked Up",
          date: randomStatus === "In Transit" ? formattedOrderPlacedDate : "Expected",
          time: randomStatus === "In Transit" ? "02:30 PM" : "Expected",
          completed: randomStatus === "In Transit",
        },
        { status: "In Transit", date: "Expected", time: "Expected", completed: false },
        { status: "Out for Delivery", date: "Expected", time: "Expected", completed: false },
        { status: "Delivered", date: "Expected", time: "Expected", completed: false },
      ],
    }

    return NextResponse.json(randomData)
  } catch (error) {
    console.error("Error fetching tracking data:", error)
    return NextResponse.json({ error: "Failed to fetch tracking data" }, { status: 500 })
  }
}
