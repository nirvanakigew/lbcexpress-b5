"use client"

import type React from "react"

import { useState, useEffect } from "react"
import { useRouter } from "next/navigation"
import { AdminHeader } from "@/components/admin/admin-header"
import { Card, CardContent, CardDescription, CardHeader, CardTitle, CardFooter } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Switch } from "@/components/ui/switch"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { toast } from "@/components/ui/use-toast"
import type { AdminUser } from "@/types"

export default function AdminSettingsPage() {
  const [admin, setAdmin] = useState<AdminUser | null>(null)
  const [isSaving, setIsSaving] = useState(false)
  const router = useRouter()

  useEffect(() => {
    // Check if admin is logged in
    const adminData = localStorage.getItem("admin")
    if (!adminData) {
      router.push("/admin")
      return
    }

    setAdmin(JSON.parse(adminData))
  }, [router])

  const handleSaveProfile = (e: React.FormEvent) => {
    e.preventDefault()
    setIsSaving(true)

    // Simulate API call
    setTimeout(() => {
      setIsSaving(false)
      toast({
        title: "Profile Saved",
        description: "Your profile has been updated successfully.",
      })
    }, 1500)
  }

  const handleSavePassword = (e: React.FormEvent) => {
    e.preventDefault()
    setIsSaving(true)

    // Simulate API call
    setTimeout(() => {
      setIsSaving(false)
      toast({
        title: "Password Updated",
        description: "Your password has been changed successfully.",
      })
    }, 1500)
  }

  const handleSaveNotifications = (e: React.FormEvent) => {
    e.preventDefault()
    setIsSaving(true)

    // Simulate API call
    setTimeout(() => {
      setIsSaving(false)
      toast({
        title: "Notification Settings Saved",
        description: "Your notification preferences have been updated.",
      })
    }, 1500)
  }

  if (!admin) {
    return null
  }

  return (
    <>
      <AdminHeader />
      <div className="container py-6">
        <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-6">
          <div>
            <h1 className="text-2xl font-bold">Settings</h1>
            <p className="text-muted-foreground">Manage your account settings and preferences</p>
          </div>
        </div>

        <Tabs defaultValue="profile">
          <div className="flex flex-col md:flex-row gap-6">
            <div className="md:w-1/4">
              <TabsList className="flex flex-col h-auto p-0 bg-transparent">
                <TabsTrigger value="profile" className="justify-start w-full">
                  Profile
                </TabsTrigger>
                <TabsTrigger value="security" className="justify-start w-full">
                  Security
                </TabsTrigger>
                <TabsTrigger value="notifications" className="justify-start w-full">
                  Notifications
                </TabsTrigger>
                <TabsTrigger value="appearance" className="justify-start w-full">
                  Appearance
                </TabsTrigger>
              </TabsList>
            </div>
            <div className="md:w-3/4">
              <TabsContent value="profile">
                <Card>
                  <CardHeader>
                    <CardTitle>Profile</CardTitle>
                    <CardDescription>Manage your personal information</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <form id="profile-form" onSubmit={handleSaveProfile} className="space-y-4">
                      <div className="space-y-2">
                        <label htmlFor="name" className="text-sm font-medium">
                          Name
                        </label>
                        <Input id="name" defaultValue={admin.name} />
                      </div>
                      <div className="space-y-2">
                        <label htmlFor="email" className="text-sm font-medium">
                          Email
                        </label>
                        <Input id="email" type="email" defaultValue={admin.email} />
                      </div>
                      <div className="space-y-2">
                        <label htmlFor="role" className="text-sm font-medium">
                          Role
                        </label>
                        <Input id="role" value={admin.role} disabled />
                        <p className="text-sm text-muted-foreground">
                          Your role determines your permissions in the system
                        </p>
                      </div>
                      <div className="space-y-2">
                        <label htmlFor="bio" className="text-sm font-medium">
                          Bio
                        </label>
                        <Textarea id="bio" placeholder="Tell us about yourself" />
                      </div>
                    </form>
                  </CardContent>
                  <CardFooter className="flex justify-end">
                    <Button
                      type="submit"
                      form="profile-form"
                      className="bg-[#c9002f] hover:bg-[#a30026]"
                      disabled={isSaving}
                    >
                      {isSaving ? "Saving..." : "Save Changes"}
                    </Button>
                  </CardFooter>
                </Card>
              </TabsContent>

              <TabsContent value="security">
                <Card>
                  <CardHeader>
                    <CardTitle>Security</CardTitle>
                    <CardDescription>Manage your password and security settings</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <form id="security-form" onSubmit={handleSavePassword} className="space-y-4">
                      <div className="space-y-2">
                        <label htmlFor="current-password" className="text-sm font-medium">
                          Current Password
                        </label>
                        <Input id="current-password" type="password" />
                      </div>
                      <div className="space-y-2">
                        <label htmlFor="new-password" className="text-sm font-medium">
                          New Password
                        </label>
                        <Input id="new-password" type="password" />
                      </div>
                      <div className="space-y-2">
                        <label htmlFor="confirm-password" className="text-sm font-medium">
                          Confirm New Password
                        </label>
                        <Input id="confirm-password" type="password" />
                      </div>
                    </form>
                  </CardContent>
                  <CardFooter className="flex justify-end">
                    <Button
                      type="submit"
                      form="security-form"
                      className="bg-[#c9002f] hover:bg-[#a30026]"
                      disabled={isSaving}
                    >
                      {isSaving ? "Updating..." : "Update Password"}
                    </Button>
                  </CardFooter>
                </Card>
              </TabsContent>

              <TabsContent value="notifications">
                <Card>
                  <CardHeader>
                    <CardTitle>Notifications</CardTitle>
                    <CardDescription>Configure how you receive notifications</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <form id="notifications-form" onSubmit={handleSaveNotifications} className="space-y-6">
                      <div className="space-y-4">
                        <div className="flex items-center justify-between">
                          <div className="space-y-0.5">
                            <label htmlFor="email-notifications" className="text-sm font-medium">
                              Email Notifications
                            </label>
                            <p className="text-sm text-muted-foreground">Receive notifications via email</p>
                          </div>
                          <Switch id="email-notifications" defaultChecked />
                        </div>
                        <div className="flex items-center justify-between">
                          <div className="space-y-0.5">
                            <label htmlFor="sms-notifications" className="text-sm font-medium">
                              SMS Notifications
                            </label>
                            <p className="text-sm text-muted-foreground">Receive notifications via SMS</p>
                          </div>
                          <Switch id="sms-notifications" />
                        </div>
                      </div>

                      <div className="space-y-4">
                        <h3 className="text-sm font-medium">Notification Types</h3>
                        <div className="space-y-4">
                          <div className="flex items-center justify-between">
                            <div className="space-y-0.5">
                              <label htmlFor="order-updates" className="text-sm font-medium">
                                Order Updates
                              </label>
                              <p className="text-sm text-muted-foreground">
                                Notifications about new orders and status changes
                              </p>
                            </div>
                            <Switch id="order-updates" defaultChecked />
                          </div>
                          <div className="flex items-center justify-between">
                            <div className="space-y-0.5">
                              <label htmlFor="system-notifications" className="text-sm font-medium">
                                System Notifications
                              </label>
                              <p className="text-sm text-muted-foreground">Important system alerts and updates</p>
                            </div>
                            <Switch id="system-notifications" defaultChecked />
                          </div>
                          <div className="flex items-center justify-between">
                            <div className="space-y-0.5">
                              <label htmlFor="marketing-notifications" className="text-sm font-medium">
                                Marketing Notifications
                              </label>
                              <p className="text-sm text-muted-foreground">Promotions, news, and marketing updates</p>
                            </div>
                            <Switch id="marketing-notifications" />
                          </div>
                        </div>
                      </div>
                    </form>
                  </CardContent>
                  <CardFooter className="flex justify-end">
                    <Button
                      type="submit"
                      form="notifications-form"
                      className="bg-[#c9002f] hover:bg-[#a30026]"
                      disabled={isSaving}
                    >
                      {isSaving ? "Saving..." : "Save Preferences"}
                    </Button>
                  </CardFooter>
                </Card>
              </TabsContent>

              <TabsContent value="appearance">
                <Card>
                  <CardHeader>
                    <CardTitle>Appearance</CardTitle>
                    <CardDescription>Customize the look and feel of the dashboard</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      <div className="space-y-2">
                        <label className="text-sm font-medium">Theme</label>
                        <div className="grid grid-cols-3 gap-4">
                          <div className="flex flex-col items-center gap-2">
                            <div className="border rounded-md p-2 w-full h-20 bg-white cursor-pointer ring-2 ring-[#c9002f]"></div>
                            <span className="text-sm">Light</span>
                          </div>
                          <div className="flex flex-col items-center gap-2">
                            <div className="border rounded-md p-2 w-full h-20 bg-gray-900 cursor-pointer"></div>
                            <span className="text-sm">Dark</span>
                          </div>
                          <div className="flex flex-col items-center gap-2">
                            <div className="border rounded-md p-2 w-full h-20 bg-gradient-to-b from-white to-gray-900 cursor-pointer"></div>
                            <span className="text-sm">System</span>
                          </div>
                        </div>
                      </div>
                      <div className="space-y-2">
                        <label className="text-sm font-medium">Accent Color</label>
                        <div className="grid grid-cols-5 gap-4">
                          <div className="flex flex-col items-center gap-2">
                            <div className="rounded-full w-8 h-8 bg-[#c9002f] cursor-pointer ring-2 ring-[#c9002f] ring-offset-2"></div>
                            <span className="text-xs">Red</span>
                          </div>
                          <div className="flex flex-col items-center gap-2">
                            <div className="rounded-full w-8 h-8 bg-blue-600 cursor-pointer"></div>
                            <span className="text-xs">Blue</span>
                          </div>
                          <div className="flex flex-col items-center gap-2">
                            <div className="rounded-full w-8 h-8 bg-green-600 cursor-pointer"></div>
                            <span className="text-xs">Green</span>
                          </div>
                          <div className="flex flex-col items-center gap-2">
                            <div className="rounded-full w-8 h-8 bg-purple-600 cursor-pointer"></div>
                            <span className="text-xs">Purple</span>
                          </div>
                          <div className="flex flex-col items-center gap-2">
                            <div className="rounded-full w-8 h-8 bg-orange-600 cursor-pointer"></div>
                            <span className="text-xs">Orange</span>
                          </div>
                        </div>
                      </div>
                      <div className="space-y-2">
                        <label className="text-sm font-medium">Font Size</label>
                        <div className="grid grid-cols-3 gap-4">
                          <div className="flex flex-col items-center gap-2">
                            <div className="border rounded-md p-2 w-full h-12 flex items-center justify-center text-sm cursor-pointer">
                              Small
                            </div>
                          </div>
                          <div className="flex flex-col items-center gap-2">
                            <div className="border rounded-md p-2 w-full h-12 flex items-center justify-center cursor-pointer ring-2 ring-[#c9002f]">
                              Medium
                            </div>
                          </div>
                          <div className="flex flex-col items-center gap-2">
                            <div className="border rounded-md p-2 w-full h-12 flex items-center justify-center text-lg cursor-pointer">
                              Large
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                  <CardFooter className="flex justify-end">
                    <Button
                      className="bg-[#c9002f] hover:bg-[#a30026]"
                      onClick={() => {
                        toast({
                          title: "Appearance Saved",
                          description: "Your appearance settings have been updated.",
                        })
                      }}
                    >
                      Save Preferences
                    </Button>
                  </CardFooter>
                </Card>
              </TabsContent>
            </div>
          </div>
        </Tabs>
      </div>
    </>
  )
}
