"use client"

import { useState, useEffect } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Package, Truck, Clock, ArrowUpRight, ArrowDownRight } from "lucide-react"
import { supabase } from "@/lib/supabase/client"

export function ShipmentStats() {
  const [isLoading, setIsLoading] = useState(true)
  const [stats, setStats] = useState({
    total: 0,
    delivered: 0,
    inTransit: 0,
    pending: 0,
  })

  useEffect(() => {
    const fetchStats = async () => {
      try {
        const { data: allOrders, error } = await supabase.from("orders").select("status")

        if (error) throw error

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
        console.error("Error fetching stats:", error)
      } finally {
        setIsLoading(false)
      }
    }

    fetchStats()
  }, [])

  return (
    <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4 mb-6">
      <Card>
        <CardHeader className="flex flex-row items-center justify-between pb-2">
          <CardTitle className="text-sm font-medium">Total Orders</CardTitle>
          <Package className="h-4 w-4 text-muted-foreground" />
        </CardHeader>
        <CardContent>
          {isLoading ? (
            <div className="h-6 w-16 bg-gray-200 animate-pulse rounded"></div>
          ) : (
            <>
              <div className="text-2xl font-bold">{stats.total}</div>
              <p className="text-xs text-muted-foreground flex items-center mt-1">
                <ArrowUpRight className="h-3 w-3 mr-1 text-green-500" />
                <span className="text-green-500 font-medium">12.5%</span> from last month
              </p>
            </>
          )}
        </CardContent>
      </Card>
      <Card>
        <CardHeader className="flex flex-row items-center justify-between pb-2">
          <CardTitle className="text-sm font-medium">Delivered</CardTitle>
          <Truck className="h-4 w-4 text-muted-foreground" />
        </CardHeader>
        <CardContent>
          {isLoading ? (
            <div className="h-6 w-16 bg-gray-200 animate-pulse rounded"></div>
          ) : (
            <>
              <div className="text-2xl font-bold">{stats.delivered}</div>
              <p className="text-xs text-muted-foreground flex items-center mt-1">
                <ArrowUpRight className="h-3 w-3 mr-1 text-green-500" />
                <span className="text-green-500 font-medium">8.2%</span> from last month
              </p>
            </>
          )}
        </CardContent>
      </Card>
      <Card>
        <CardHeader className="flex flex-row items-center justify-between pb-2">
          <CardTitle className="text-sm font-medium">In Transit</CardTitle>
          <Truck className="h-4 w-4 text-muted-foreground" />
        </CardHeader>
        <CardContent>
          {isLoading ? (
            <div className="h-6 w-16 bg-gray-200 animate-pulse rounded"></div>
          ) : (
            <>
              <div className="text-2xl font-bold">{stats.inTransit}</div>
              <p className="text-xs text-muted-foreground flex items-center mt-1">
                <ArrowDownRight className="h-3 w-3 mr-1 text-red-500" />
                <span className="text-red-500 font-medium">3.1%</span> from last month
              </p>
            </>
          )}
        </CardContent>
      </Card>
      <Card>
        <CardHeader className="flex flex-row items-center justify-between pb-2">
          <CardTitle className="text-sm font-medium">Pending</CardTitle>
          <Clock className="h-4 w-4 text-muted-foreground" />
        </CardHeader>
        <CardContent>
          {isLoading ? (
            <div className="h-6 w-16 bg-gray-200 animate-pulse rounded"></div>
          ) : (
            <>
              <div className="text-2xl font-bold">{stats.pending}</div>
              <p className="text-xs text-muted-foreground flex items-center mt-1">
                <ArrowUpRight className="h-3 w-3 mr-1 text-green-500" />
                <span className="text-green-500 font-medium">4.3%</span> from last month
              </p>
            </>
          )}
        </CardContent>
      </Card>
    </div>
  )
}
