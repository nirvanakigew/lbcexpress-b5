import { NextResponse } from "next/server"

// Sample data
const shipments = [
  {
    id: "SHP-1234",
    customer: "John Doe",
    origin: "Manila",
    destination: "Cebu",
    date: "May 19, 2025",
    status: "Delivered",
  },
  {
    id: "SHP-1235",
    customer: "Jane Smith",
    origin: "Davao",
    destination: "Manila",
    date: "May 19, 2025",
    status: "In Transit",
  },
  {
    id: "SHP-1236",
    customer: "Robert Johnson",
    origin: "Cebu",
    destination: "Bohol",
    date: "May 18, 2025",
    status: "Processing",
  },
  {
    id: "SHP-1237",
    customer: "Maria Garcia",
    origin: "Manila",
    destination: "Iloilo",
    date: "May 18, 2025",
    status: "Delivered",
  },
  {
    id: "SHP-1238",
    customer: "David Lee",
    origin: "Bacolod",
    destination: "Manila",
    date: "May 17, 2025",
    status: "In Transit",
  },
]

export async function GET() {
  try {
    return NextResponse.json(shipments)
  } catch (error) {
    console.error("Error fetching shipments:", error)
    return NextResponse.json({ error: "Failed to fetch shipments" }, { status: 500 })
  }
}

export async function POST(request: Request) {
  try {
    const data = await request.json()

    // Validate required fields
    if (!data.customer || !data.origin || !data.destination) {
      return NextResponse.json({ error: "Missing required fields" }, { status: 400 })
    }

    // Generate a new shipment ID
    const newId = `SHP-${Math.floor(1000 + Math.random() * 9000)}`

    // Create new shipment
    const newShipment = {
      id: newId,
      customer: data.customer,
      origin: data.origin,
      destination: data.destination,
      date: new Date().toLocaleDateString("en-US", {
        year: "numeric",
        month: "long",
        day: "numeric",
      }),
      status: "Processing",
      ...data,
    }

    // In a real app, you would save this to a database
    // For this example, we'll just return the new shipment

    return NextResponse.json(newShipment, { status: 201 })
  } catch (error) {
    console.error("Error creating shipment:", error)
    return NextResponse.json({ error: "Failed to create shipment" }, { status: 500 })
  }
}
