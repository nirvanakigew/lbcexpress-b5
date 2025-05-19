"use client"

import { useState, useEffect } from "react"
import { useRouter } from "next/navigation"
import { AdminHeader } from "@/components/admin/admin-header"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Button } from "@/components/ui/button"
import { Package, Truck, Clock, BarChart3, ArrowUpRight, ArrowDownRight } from "lucide-react"
import { supabase } from "@/lib/supabase/client"
import type { Order } from "@/types"
import Link from "next/link"
import { RecentShipments } from "@/components/recent-shipments"
import { EnvChecker } from "@/components/env-checker"

export default function AdminDashboardPage() {
  const [isLoading, setIsLoading] = useState(true)
  const [orders, setOrders] = useState<Order[]>([])
  const [stats, setStats] = useState({
    total: 0,
    delivered: 0,
    inTransit: 0,
    pending: 0,
  })
  const router = useRouter()

  useEffect(() => {
    // Check if admin is logged in
    const admin = localStorage.getItem("admin")
    if (!admin) {
      router.push("/admin")
      return
    }

    // Fetch orders
    const fetchOrders = async () => {
      try {
        const { data, error } = await supabase
          .from("orders")
          .select("*")
          .order("created_at", { ascending: false })
          .limit(10)

        if (error) throw error

        setOrders(data || [])

        // Calculate stats
        const { data: allOrders, error: statsError } = await supabase.from("orders").select("status")

        if (statsError) throw statsError

        const total = allOrders?.length || 0
        const delivered = allOrders?.filter((o) => o.status.toLowerCase() === "delivered").length || 0
        const inTransit =
          allOrders?.filter(
            (o) => o.status.toLowerCase() === "in transit" || o.status.toLowerCase() === "out for delivery",
          ).length || 0
        const pending =
          allOrders?.filter(
            (o) =>
              o.status.toLowerCase() === "pending" ||
              o.status.toLowerCase() === "processing" ||
              o.status.toLowerCase() === "package received",
          ).length || 0

        setStats({
          total,
          delivered,
          inTransit,
          pending,
        })
      } catch (error) {
        console.error("Error fetching orders:", error)
      } finally {
        setIsLoading(false)
      }
    }

    fetchOrders()
  }, [router])

  return (
    <>
      <AdminHeader />
      <div className="container py-6">
        <EnvChecker />
        <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-6">
          <div>
            <h1 className="text-2xl font-bold">Dashboard</h1>
            <p className="text-muted-foreground">Welcome to the LBC Express admin dashboard</p>
          </div>
          <div className="mt-4 md:mt-0">
            <Button asChild className="bg-[#c9002f] hover:bg-[#a30026]">
              <Link href="/admin/orders/new">Create New Order</Link>
            </Button>
          </div>
        </div>

        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between pb-2">
              <CardTitle className="text-sm font-medium">Total Orders</CardTitle>
              <Package className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{stats.total}</div>
              <p className="text-xs text-muted-foreground flex items-center mt-1">
                <ArrowUpRight className="h-3 w-3 mr-1 text-green-500" />
                <span className="text-green-500 font-medium">12.5%</span> from last month
              </p>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="flex flex-row items-center justify-between pb-2">
              <CardTitle className="text-sm font-medium">Delivered</CardTitle>
              <Truck className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{stats.delivered}</div>
              <p className="text-xs text-muted-foreground flex items-center mt-1">
                <ArrowUpRight className="h-3 w-3 mr-1 text-green-500" />
                <span className="text-green-500 font-medium">8.2%</span> from last month
              </p>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="flex flex-row items-center justify-between pb-2">
              <CardTitle className="text-sm font-medium">In Transit</CardTitle>
              <Truck className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{stats.inTransit}</div>
              <p className="text-xs text-muted-foreground flex items-center mt-1">
                <ArrowDownRight className="h-3 w-3 mr-1 text-red-500" />
                <span className="text-red-500 font-medium">3.1%</span> from last month
              </p>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="flex flex-row items-center justify-between pb-2">
              <CardTitle className="text-sm font-medium">Pending</CardTitle>
              <Clock className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{stats.pending}</div>
              <p className="text-xs text-muted-foreground flex items-center mt-1">
                <ArrowUpRight className="h-3 w-3 mr-1 text-green-500" />
                <span className="text-green-500 font-medium">4.3%</span> from last month
              </p>
            </CardContent>
          </Card>
        </div>

        <div className="mt-6">
          <Tabs defaultValue="recent">
            <div className="flex items-center justify-between">
              <TabsList>
                <TabsTrigger value="recent">Recent Orders</TabsTrigger>
                <TabsTrigger value="analytics">Analytics</TabsTrigger>
              </TabsList>
              <Button variant="outline" size="sm">
                <BarChart3 className="mr-2 h-4 w-4" />
                View Reports
              </Button>
            </div>
            <TabsContent value="recent" className="mt-4">
              <Card>
                <CardHeader>
                  <CardTitle>Recent Orders</CardTitle>
                  <CardDescription>Latest orders in the system</CardDescription>
                </CardHeader>
                <CardContent>
                  <RecentShipments />
                </CardContent>
              </Card>
            </TabsContent>
            <TabsContent value="analytics" className="mt-4">
              <Card>
                <CardHeader>
                  <CardTitle>Order Analytics</CardTitle>
                  <CardDescription>View detailed analytics of your orders</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="h-[400px] w-full rounded-md border bg-muted/50 flex items-center justify-center">
                    <p className="text-muted-foreground">Analytics dashboard coming soon</p>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>
          </Tabs>
        </div>
      </div>
    </>
  )
}
