import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Filter, Plus, Search, MoreHorizontal } from "lucide-react"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"

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
  {
    id: "SHP-1239",
    customer: "Sarah Wilson",
    origin: "Manila",
    destination: "Davao",
    date: "May 17, 2025",
    status: "Processing",
  },
  {
    id: "SHP-1240",
    customer: "Michael Brown",
    origin: "Iloilo",
    destination: "Manila",
    date: "May 16, 2025",
    status: "Delivered",
  },
  {
    id: "SHP-1241",
    customer: "Lisa Taylor",
    origin: "Manila",
    destination: "Baguio",
    date: "May 16, 2025",
    status: "In Transit",
  },
  {
    id: "SHP-1242",
    customer: "James Anderson",
    origin: "Cebu",
    destination: "Manila",
    date: "May 15, 2025",
    status: "Delivered",
  },
  {
    id: "SHP-1243",
    customer: "Patricia Martinez",
    origin: "Manila",
    destination: "Tacloban",
    date: "May 15, 2025",
    status: "Delivered",
  },
]

export default function ShipmentsPage() {
  const getStatusColor = (status: string) => {
    switch (status) {
      case "Delivered":
        return "bg-green-100 text-green-800"
      case "In Transit":
        return "bg-blue-100 text-blue-800"
      case "Processing":
        return "bg-yellow-100 text-yellow-800"
      default:
        return "bg-gray-100 text-gray-800"
    }
  }

  return (
    <div className="container py-6">
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-2xl font-bold">Shipments</h1>
        <Button>
          <Plus className="mr-2 h-4 w-4" />
          New Shipment
        </Button>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Manage Shipments</CardTitle>
          <CardDescription>View and manage all your shipments in one place</CardDescription>
        </CardHeader>
        <CardContent>
          <Tabs defaultValue="all">
            <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between mb-6 gap-4">
              <TabsList>
                <TabsTrigger value="all">All</TabsTrigger>
                <TabsTrigger value="processing">Processing</TabsTrigger>
                <TabsTrigger value="in-transit">In Transit</TabsTrigger>
                <TabsTrigger value="delivered">Delivered</TabsTrigger>
              </TabsList>
              <div className="flex w-full sm:w-auto gap-2">
                <div className="relative w-full sm:w-auto">
                  <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
                  <Input type="search" placeholder="Search shipments..." className="w-full sm:w-[250px] pl-8" />
                </div>
                <Button variant="outline" size="icon">
                  <Filter className="h-4 w-4" />
                  <span className="sr-only">Filter</span>
                </Button>
              </div>
            </div>

            <TabsContent value="all">
              <div className="rounded-md border">
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Tracking ID</TableHead>
                      <TableHead>Customer</TableHead>
                      <TableHead>Origin</TableHead>
                      <TableHead>Destination</TableHead>
                      <TableHead>Date</TableHead>
                      <TableHead>Status</TableHead>
                      <TableHead className="w-[50px]"></TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {shipments.map((shipment) => (
                      <TableRow key={shipment.id}>
                        <TableCell className="font-medium">{shipment.id}</TableCell>
                        <TableCell>{shipment.customer}</TableCell>
                        <TableCell>{shipment.origin}</TableCell>
                        <TableCell>{shipment.destination}</TableCell>
                        <TableCell>{shipment.date}</TableCell>
                        <TableCell>
                          <Badge variant="outline" className={getStatusColor(shipment.status)}>
                            {shipment.status}
                          </Badge>
                        </TableCell>
                        <TableCell>
                          <DropdownMenu>
                            <DropdownMenuTrigger asChild>
                              <Button variant="ghost" size="icon">
                                <MoreHorizontal className="h-4 w-4" />
                                <span className="sr-only">Actions</span>
                              </Button>
                            </DropdownMenuTrigger>
                            <DropdownMenuContent align="end">
                              <DropdownMenuItem>View Details</DropdownMenuItem>
                              <DropdownMenuItem>Update Status</DropdownMenuItem>
                              <DropdownMenuItem>Print Label</DropdownMenuItem>
                              <DropdownMenuItem>Delete</DropdownMenuItem>
                            </DropdownMenuContent>
                          </DropdownMenu>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </div>
            </TabsContent>

            <TabsContent value="processing">
              <div className="rounded-md border">
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Tracking ID</TableHead>
                      <TableHead>Customer</TableHead>
                      <TableHead>Origin</TableHead>
                      <TableHead>Destination</TableHead>
                      <TableHead>Date</TableHead>
                      <TableHead>Status</TableHead>
                      <TableHead className="w-[50px]"></TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {shipments
                      .filter((shipment) => shipment.status === "Processing")
                      .map((shipment) => (
                        <TableRow key={shipment.id}>
                          <TableCell className="font-medium">{shipment.id}</TableCell>
                          <TableCell>{shipment.customer}</TableCell>
                          <TableCell>{shipment.origin}</TableCell>
                          <TableCell>{shipment.destination}</TableCell>
                          <TableCell>{shipment.date}</TableCell>
                          <TableCell>
                            <Badge variant="outline" className={getStatusColor(shipment.status)}>
                              {shipment.status}
                            </Badge>
                          </TableCell>
                          <TableCell>
                            <DropdownMenu>
                              <DropdownMenuTrigger asChild>
                                <Button variant="ghost" size="icon">
                                  <MoreHorizontal className="h-4 w-4" />
                                  <span className="sr-only">Actions</span>
                                </Button>
                              </DropdownMenuTrigger>
                              <DropdownMenuContent align="end">
                                <DropdownMenuItem>View Details</DropdownMenuItem>
                                <DropdownMenuItem>Update Status</DropdownMenuItem>
                                <DropdownMenuItem>Print Label</DropdownMenuItem>
                                <DropdownMenuItem>Delete</DropdownMenuItem>
                              </DropdownMenuContent>
                            </DropdownMenu>
                          </TableCell>
                        </TableRow>
                      ))}
                  </TableBody>
                </Table>
              </div>
            </TabsContent>

            {/* Similar content for other tabs */}
          </Tabs>
        </CardContent>
      </Card>
    </div>
  )
}
