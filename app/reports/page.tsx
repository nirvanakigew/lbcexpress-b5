import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Button } from "@/components/ui/button"
import { Calendar } from "@/components/ui/calendar"
import { BarChart3, Download, FileText, PieChart, TrendingUp } from "lucide-react"

export default function ReportsPage() {
  return (
    <div className="container py-6">
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-2xl font-bold">Reports & Analytics</h1>
        <Button>
          <Download className="mr-2 h-4 w-4" />
          Export Reports
        </Button>
      </div>

      <Tabs defaultValue="overview">
        <TabsList className="mb-6">
          <TabsTrigger value="overview">Overview</TabsTrigger>
          <TabsTrigger value="shipments">Shipments</TabsTrigger>
          <TabsTrigger value="performance">Performance</TabsTrigger>
          <TabsTrigger value="financial">Financial</TabsTrigger>
        </TabsList>

        <TabsContent value="overview">
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            <Card>
              <CardHeader className="flex flex-row items-center justify-between pb-2">
                <CardTitle className="text-sm font-medium">Shipment Volume</CardTitle>
                <BarChart3 className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="h-[200px] w-full rounded-md border bg-muted/50 flex items-center justify-center">
                  <div className="grid grid-cols-7 w-full gap-2 px-4">
                    {Array.from({ length: 7 }).map((_, i) => (
                      <div key={i} className="flex flex-col items-center">
                        <div
                          className="bg-primary/10 w-full rounded-t-md"
                          style={{
                            height: `${Math.floor(Math.random() * 150) + 50}px`,
                          }}
                        />
                        <span className="text-xs text-muted-foreground mt-1">
                          {["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"][i]}
                        </span>
                      </div>
                    ))}
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="flex flex-row items-center justify-between pb-2">
                <CardTitle className="text-sm font-medium">Delivery Performance</CardTitle>
                <TrendingUp className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="h-[200px] w-full rounded-md border bg-muted/50 flex items-center justify-center">
                  <div className="w-full px-4">
                    <div className="space-y-4">
                      <div className="space-y-2">
                        <div className="flex items-center justify-between">
                          <span className="text-sm">On-Time Delivery</span>
                          <span className="text-sm font-medium">92%</span>
                        </div>
                        <div className="h-2 w-full rounded-full bg-muted">
                          <div className="h-2 rounded-full bg-primary" style={{ width: "92%" }} />
                        </div>
                      </div>
                      <div className="space-y-2">
                        <div className="flex items-center justify-between">
                          <span className="text-sm">Delayed Delivery</span>
                          <span className="text-sm font-medium">6%</span>
                        </div>
                        <div className="h-2 w-full rounded-full bg-muted">
                          <div className="h-2 rounded-full bg-yellow-500" style={{ width: "6%" }} />
                        </div>
                      </div>
                      <div className="space-y-2">
                        <div className="flex items-center justify-between">
                          <span className="text-sm">Failed Delivery</span>
                          <span className="text-sm font-medium">2%</span>
                        </div>
                        <div className="h-2 w-full rounded-full bg-muted">
                          <div className="h-2 rounded-full bg-red-500" style={{ width: "2%" }} />
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="flex flex-row items-center justify-between pb-2">
                <CardTitle className="text-sm font-medium">Shipment Types</CardTitle>
                <PieChart className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="h-[200px] w-full rounded-md border bg-muted/50 flex items-center justify-center">
                  <div className="flex flex-col items-center">
                    <div className="relative h-32 w-32">
                      <div className="absolute inset-0 flex items-center justify-center">
                        <div className="h-20 w-20 rounded-full border-8 border-primary/30">
                          <div className="h-full w-full rounded-full border-8 border-t-primary border-l-primary border-r-transparent border-b-transparent" />
                        </div>
                      </div>
                    </div>
                    <div className="mt-4 grid grid-cols-3 gap-4 text-center">
                      <div>
                        <div className="h-3 w-3 rounded-full bg-primary mx-auto" />
                        <span className="text-xs">Documents</span>
                        <p className="text-xs font-medium">45%</p>
                      </div>
                      <div>
                        <div className="h-3 w-3 rounded-full bg-primary/60 mx-auto" />
                        <span className="text-xs">Packages</span>
                        <p className="text-xs font-medium">35%</p>
                      </div>
                      <div>
                        <div className="h-3 w-3 rounded-full bg-primary/30 mx-auto" />
                        <span className="text-xs">Boxes</span>
                        <p className="text-xs font-medium">20%</p>
                      </div>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          <div className="mt-6 grid gap-6 md:grid-cols-2">
            <Card>
              <CardHeader>
                <CardTitle>Monthly Shipment Summary</CardTitle>
                <CardDescription>View your shipment statistics for the current month</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-8">
                  <div className="grid grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <p className="text-sm font-medium text-muted-foreground">Total Shipments</p>
                      <p className="text-3xl font-bold">1,248</p>
                    </div>
                    <div className="space-y-2">
                      <p className="text-sm font-medium text-muted-foreground">Completed</p>
                      <p className="text-3xl font-bold">986</p>
                    </div>
                    <div className="space-y-2">
                      <p className="text-sm font-medium text-muted-foreground">In Transit</p>
                      <p className="text-3xl font-bold">187</p>
                    </div>
                    <div className="space-y-2">
                      <p className="text-sm font-medium text-muted-foreground">Processing</p>
                      <p className="text-3xl font-bold">75</p>
                    </div>
                  </div>

                  <div className="space-y-2">
                    <div className="flex items-center justify-between">
                      <span className="text-sm">Completion Rate</span>
                      <span className="text-sm font-medium">79%</span>
                    </div>
                    <div className="h-2 w-full rounded-full bg-muted">
                      <div className="h-2 rounded-full bg-primary" style={{ width: "79%" }} />
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Recent Reports</CardTitle>
                <CardDescription>Access your recently generated reports</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-3">
                      <FileText className="h-5 w-5 text-muted-foreground" />
                      <div>
                        <p className="text-sm font-medium">Monthly Performance Report</p>
                        <p className="text-xs text-muted-foreground">Generated on May 19, 2025</p>
                      </div>
                    </div>
                    <Button variant="outline" size="sm">
                      View
                    </Button>
                  </div>
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-3">
                      <FileText className="h-5 w-5 text-muted-foreground" />
                      <div>
                        <p className="text-sm font-medium">Delivery Time Analysis</p>
                        <p className="text-xs text-muted-foreground">Generated on May 18, 2025</p>
                      </div>
                    </div>
                    <Button variant="outline" size="sm">
                      View
                    </Button>
                  </div>
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-3">
                      <FileText className="h-5 w-5 text-muted-foreground" />
                      <div>
                        <p className="text-sm font-medium">Customer Satisfaction Survey</p>
                        <p className="text-xs text-muted-foreground">Generated on May 17, 2025</p>
                      </div>
                    </div>
                    <Button variant="outline" size="sm">
                      View
                    </Button>
                  </div>
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-3">
                      <FileText className="h-5 w-5 text-muted-foreground" />
                      <div>
                        <p className="text-sm font-medium">Revenue Analysis</p>
                        <p className="text-xs text-muted-foreground">Generated on May 16, 2025</p>
                      </div>
                    </div>
                    <Button variant="outline" size="sm">
                      View
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="shipments">
          <div className="grid gap-6 md:grid-cols-2">
            <Card>
              <CardHeader>
                <CardTitle>Shipment Calendar</CardTitle>
                <CardDescription>View shipments by date</CardDescription>
              </CardHeader>
              <CardContent>
                <Calendar mode="single" className="rounded-md border" />
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Shipment Status Distribution</CardTitle>
                <CardDescription>Overview of shipment statuses</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="space-y-2">
                    <div className="flex items-center justify-between">
                      <span className="text-sm">Delivered</span>
                      <span className="text-sm font-medium">65%</span>
                    </div>
                    <div className="h-2 w-full rounded-full bg-muted">
                      <div className="h-2 rounded-full bg-green-500" style={{ width: "65%" }} />
                    </div>
                  </div>
                  <div className="space-y-2">
                    <div className="flex items-center justify-between">
                      <span className="text-sm">In Transit</span>
                      <span className="text-sm font-medium">25%</span>
                    </div>
                    <div className="h-2 w-full rounded-full bg-muted">
                      <div className="h-2 rounded-full bg-blue-500" style={{ width: "25%" }} />
                    </div>
                  </div>
                  <div className="space-y-2">
                    <div className="flex items-center justify-between">
                      <span className="text-sm">Processing</span>
                      <span className="text-sm font-medium">10%</span>
                    </div>
                    <div className="h-2 w-full rounded-full bg-muted">
                      <div className="h-2 rounded-full bg-yellow-500" style={{ width: "10%" }} />
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="performance">
          <Card>
            <CardHeader>
              <CardTitle>Performance Metrics</CardTitle>
              <CardDescription>Key performance indicators for your shipping operations</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
                <div className="space-y-2">
                  <p className="text-sm font-medium text-muted-foreground">Average Delivery Time</p>
                  <p className="text-3xl font-bold">2.4 days</p>
                  <p className="text-xs text-green-500">↓ 0.3 days from last month</p>
                </div>
                <div className="space-y-2">
                  <p className="text-sm font-medium text-muted-foreground">On-Time Delivery Rate</p>
                  <p className="text-3xl font-bold">92%</p>
                  <p className="text-xs text-green-500">↑ 3% from last month</p>
                </div>
                <div className="space-y-2">
                  <p className="text-sm font-medium text-muted-foreground">First Attempt Success</p>
                  <p className="text-3xl font-bold">87%</p>
                  <p className="text-xs text-green-500">↑ 2% from last month</p>
                </div>
                <div className="space-y-2">
                  <p className="text-sm font-medium text-muted-foreground">Customer Satisfaction</p>
                  <p className="text-3xl font-bold">4.8/5</p>
                  <p className="text-xs text-green-500">↑ 0.2 from last month</p>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="financial">
          <Card>
            <CardHeader>
              <CardTitle>Financial Summary</CardTitle>
              <CardDescription>Overview of your financial performance</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="flex items-center justify-center h-40">
                <p className="text-muted-foreground">Financial reports coming soon</p>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  )
}
