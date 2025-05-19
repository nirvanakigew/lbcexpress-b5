"use client"

import type React from "react"

import { useState, useEffect } from "react"
import { useRouter } from "next/navigation"
import { AdminHeader } from "@/components/admin/admin-header"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import {
  Pagination,
  PaginationContent,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination"
import { Package, Search, Filter, Plus } from "lucide-react"
import { supabase } from "@/lib/supabase/client"
import type { Order } from "@/types"
import Link from "next/link"
import { formatDate } from "@/lib/utils"

export default function AdminOrdersPage() {
  const [isLoading, setIsLoading] = useState(true)
  const [orders, setOrders] = useState<Order[]>([])
  const [searchQuery, setSearchQuery] = useState("")
  const [statusFilter, setStatusFilter] = useState<string>("all")
  const [currentPage, setCurrentPage] = useState(1)
  const [totalPages, setTotalPages] = useState(1)
  const [totalOrders, setTotalOrders] = useState(0)
  const pageSize = 10
  const router = useRouter()

  useEffect(() => {
    // Check if admin is logged in
    const admin = localStorage.getItem("admin")
    if (!admin) {
      router.push("/admin")
      return
    }

    fetchOrders()
  }, [router, currentPage, statusFilter])

  const fetchOrders = async () => {
    setIsLoading(true)
    try {
      let query = supabase.from("orders").select("*", { count: "exact" }).order("created_at", { ascending: false })

      // Apply status filter if not "all"
      if (statusFilter !== "all") {
        query = query.eq("status", statusFilter)
      }

      // Apply search filter if present
      if (searchQuery) {
        query = query.or(
          `tracking_number.ilike.%${searchQuery}%,recipient_name.ilike.%${searchQuery}%,sender_name.ilike.%${searchQuery}%`,
        )
      }

      // Apply pagination
      const from = (currentPage - 1) * pageSize
      const to = from + pageSize - 1
      query = query.range(from, to)

      const { data, error, count } = await query

      if (error) throw error

      setOrders(data || [])

      if (count !== null) {
        setTotalOrders(count)
        setTotalPages(Math.ceil(count / pageSize))
      }
    } catch (error) {
      console.error("Error fetching orders:", error)
    } finally {
      setIsLoading(false)
    }
  }

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault()
    setCurrentPage(1) // Reset to first page on new search
    fetchOrders()
  }

  const handleStatusChange = (value: string) => {
    setStatusFilter(value)
    setCurrentPage(1) // Reset to first page on filter change
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
        <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-6">
          <div>
            <h1 className="text-2xl font-bold">Orders</h1>
            <p className="text-muted-foreground">Manage and track all orders in the system</p>
          </div>
          <div className="mt-4 md:mt-0">
            <Button asChild className="bg-[#c9002f] hover:bg-[#a30026]">
              <Link href="/admin/orders/new">
                <Plus className="mr-2 h-4 w-4" />
                Create New Order
              </Link>
            </Button>
          </div>
        </div>

        <Card>
          <CardHeader>
            <CardTitle>Order Management</CardTitle>
            <CardDescription>View, filter, and manage all orders</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="flex flex-col sm:flex-row gap-4 mb-6">
              <form onSubmit={handleSearch} className="flex-1 flex gap-2">
                <div className="relative flex-1">
                  <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
                  <Input
                    type="search"
                    placeholder="Search by tracking #, recipient, or sender..."
                    className="pl-8"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                  />
                </div>
                <Button type="submit" variant="outline">
                  Search
                </Button>
              </form>
              <div className="flex items-center gap-2">
                <Filter className="h-4 w-4 text-muted-foreground" />
                <Select value={statusFilter} onValueChange={handleStatusChange}>
                  <SelectTrigger className="w-[180px]">
                    <SelectValue placeholder="Filter by status" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">All Statuses</SelectItem>
                    <SelectItem value="Pending">Pending</SelectItem>
                    <SelectItem value="Package Received">Package Received</SelectItem>
                    <SelectItem value="Processing">Processing</SelectItem>
                    <SelectItem value="In Transit">In Transit</SelectItem>
                    <SelectItem value="Out for Delivery">Out for Delivery</SelectItem>
                    <SelectItem value="Delivered">Delivered</SelectItem>
                    <SelectItem value="On Hold">On Hold</SelectItem>
                    <SelectItem value="Delayed">Delayed</SelectItem>
                    <SelectItem value="Failed Delivery">Failed Delivery</SelectItem>
                    <SelectItem value="Returned to Sender">Returned to Sender</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>

            {isLoading ? (
              <div className="flex justify-center py-8">
                <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-[#c9002f]"></div>
              </div>
            ) : orders.length > 0 ? (
              <>
                <div className="rounded-md border overflow-hidden">
                  <Table>
                    <TableHeader>
                      <TableRow>
                        <TableHead>Tracking #</TableHead>
                        <TableHead>Product</TableHead>
                        <TableHead>Recipient</TableHead>
                        <TableHead>Sender</TableHead>
                        <TableHead>Status</TableHead>
                        <TableHead>Created</TableHead>
                        <TableHead>Delivery Date</TableHead>
                        <TableHead>Actions</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {orders.map((order) => (
                        <TableRow key={order.id}>
                          <TableCell className="font-medium">{order.tracking_number}</TableCell>
                          <TableCell>{order.product_name}</TableCell>
                          <TableCell>{order.recipient_name}</TableCell>
                          <TableCell>{order.sender_name}</TableCell>
                          <TableCell>
                            <span
                              className={`px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(order.status)}`}
                            >
                              {order.status}
                            </span>
                          </TableCell>
                          <TableCell>{formatDate(order.created_at)}</TableCell>
                          <TableCell>{formatDate(order.delivery_date)}</TableCell>
                          <TableCell>
                            <Button variant="outline" size="sm" asChild className="text-[#c9002f]">
                              <Link href={`/admin/orders/${order.id}`}>View</Link>
                            </Button>
                          </TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                </div>

                <div className="mt-4 flex items-center justify-between">
                  <p className="text-sm text-muted-foreground">
                    Showing {(currentPage - 1) * pageSize + 1} to {Math.min(currentPage * pageSize, totalOrders)} of{" "}
                    {totalOrders} orders
                  </p>
                  <Pagination>
                    <PaginationContent>
                      <PaginationItem>
                        <PaginationPrevious
                          onClick={() => setCurrentPage((p) => Math.max(1, p - 1))}
                          className={currentPage === 1 ? "pointer-events-none opacity-50" : "cursor-pointer"}
                        />
                      </PaginationItem>
                      {Array.from({ length: Math.min(5, totalPages) }, (_, i) => {
                        // Show pages around current page
                        let pageNum = currentPage - 2 + i
                        if (pageNum < 1) pageNum = i + 1
                        if (pageNum > totalPages) pageNum = totalPages - 4 + i
                        if (pageNum < 1 || pageNum > totalPages) return null

                        return (
                          <PaginationItem key={pageNum}>
                            <PaginationLink onClick={() => setCurrentPage(pageNum)} isActive={currentPage === pageNum}>
                              {pageNum}
                            </PaginationLink>
                          </PaginationItem>
                        )
                      })}
                      <PaginationItem>
                        <PaginationNext
                          onClick={() => setCurrentPage((p) => Math.min(totalPages, p + 1))}
                          className={currentPage === totalPages ? "pointer-events-none opacity-50" : "cursor-pointer"}
                        />
                      </PaginationItem>
                    </PaginationContent>
                  </Pagination>
                </div>
              </>
            ) : (
              <div className="text-center py-8 text-gray-500">
                <Package className="mx-auto h-12 w-12 text-gray-400 mb-4" />
                <p>No orders found</p>
                {(searchQuery || statusFilter !== "all") && (
                  <p className="mt-2">Try adjusting your search or filter criteria</p>
                )}
              </div>
            )}
          </CardContent>
        </Card>
      </div>
    </>
  )
}
