"use client"

import { useEffect, useState } from "react"
import { Package, Truck, CheckCircle, AlertCircle, Clock, Bike, AlertTriangle, RotateCcw, Loader2 } from "lucide-react"
import { cn } from "@/lib/utils"

interface AnimatedStatusIconProps {
  status: string
  size?: "sm" | "md" | "lg"
  className?: string
}

export function AnimatedStatusIcon({ status, size = "md", className = "" }: AnimatedStatusIconProps) {
  const [animate, setAnimate] = useState(false)

  // Set size based on prop
  const iconSize = {
    sm: "h-4 w-4",
    md: "h-6 w-6",
    lg: "h-8 w-8",
  }[size]

  // Restart animation every 3 seconds
  useEffect(() => {
    setAnimate(true)

    const interval = setInterval(() => {
      setAnimate(false)
      setTimeout(() => setAnimate(true), 50)
    }, 3000)

    return () => clearInterval(interval)
  }, [])

  const getStatusIcon = () => {
    const statusLower = status.toLowerCase()

    switch (statusLower) {
      case "package received":
      case "pending":
        return (
          <div className={cn("relative", animate && "animate-pulse")}>
            <Package className={cn(iconSize, className)} />
          </div>
        )

      case "in transit":
        return (
          <div className={cn("relative", animate && "animate-[wiggle_1s_ease-in-out]")}>
            <style jsx global>{`
              @keyframes wiggle {
                0%, 100% { transform: translateX(0); }
                25% { transform: translateX(-2px); }
                75% { transform: translateX(2px); }
              }
            `}</style>
            <Truck className={cn(iconSize, className)} />
          </div>
        )

      case "out for delivery":
        return (
          <div className={cn("relative", animate && "animate-[bounce_1s_ease-in-out]")}>
            <style jsx global>{`
              @keyframes bounce {
                0%, 100% { transform: translateY(0); }
                50% { transform: translateY(-5px); }
              }
            `}</style>
            <Bike className={cn(iconSize, className)} />
          </div>
        )

      case "delivered":
        return (
          <div className={cn("relative", animate && "animate-[scale_0.5s_ease-in-out]")}>
            <style jsx global>{`
              @keyframes scale {
                0% { transform: scale(1); }
                50% { transform: scale(1.2); }
                100% { transform: scale(1); }
              }
            `}</style>
            <CheckCircle className={cn(iconSize, className)} />
          </div>
        )

      case "on hold":
      case "delayed":
        return (
          <div className={cn("relative", animate && "animate-pulse")}>
            <AlertCircle className={cn(iconSize, className)} />
          </div>
        )

      case "failed delivery":
        return (
          <div className={cn("relative", animate && "animate-[shake_0.5s_ease-in-out]")}>
            <style jsx global>{`
              @keyframes shake {
                0%, 100% { transform: translateX(0); }
                20%, 60% { transform: translateX(-3px); }
                40%, 80% { transform: translateX(3px); }
              }
            `}</style>
            <AlertTriangle className={cn(iconSize, className)} />
          </div>
        )

      case "returned to sender":
        return (
          <div className={cn("relative", animate && "animate-spin")}>
            <RotateCcw className={cn(iconSize, className)} />
          </div>
        )

      case "processing":
        return (
          <div className="animate-spin">
            <Loader2 className={cn(iconSize, className)} />
          </div>
        )

      default:
        return (
          <div className={cn("relative", animate && "animate-pulse")}>
            <Clock className={cn(iconSize, className)} />
          </div>
        )
    }
  }

  return getStatusIcon()
}
