"use client"

import { useEffect, useState } from "react"
import { Package, Truck, Plane, Ship, Bike, CheckCircle, AlertCircle } from "lucide-react"
import { cn } from "@/lib/utils"

interface DeliveryAnimationProps {
  method: string
  status: string
}

export function DeliveryAnimation({ method, status }: DeliveryAnimationProps) {
  const [position, setPosition] = useState(0)
  const [direction, setDirection] = useState(1)
  const [bounce, setBounce] = useState(false)

  // Animation is active only for certain statuses
  const isActive = ["in transit", "out for delivery", "processing", "package received"].includes(status.toLowerCase())
  const isCompleted = ["delivered"].includes(status.toLowerCase())
  const isHalted = ["on hold", "delayed", "failed delivery", "returned to sender"].includes(status.toLowerCase())

  useEffect(() => {
    if (!isActive) return

    const interval = setInterval(() => {
      setPosition((prev) => {
        const newPosition = prev + direction * (method.toLowerCase().includes("express") ? 3 : 2)

        // Change direction when reaching edges
        if (newPosition > 90 || newPosition < 0) {
          setDirection((prev) => prev * -1)
          return prev
        }

        return newPosition
      })
    }, 50)

    // Add bounce effect every 2 seconds
    const bounceInterval = setInterval(() => {
      setBounce(true)
      setTimeout(() => setBounce(false), 500)
    }, 2000)

    return () => {
      clearInterval(interval)
      clearInterval(bounceInterval)
    }
  }, [isActive, direction, method])

  const getIcon = () => {
    const methodLower = method.toLowerCase()

    if (methodLower.includes("air") || methodLower.includes("international")) {
      return <Plane className={cn("h-8 w-8", bounce && "animate-bounce")} />
    } else if (methodLower.includes("sea")) {
      return <Ship className={cn("h-8 w-8", bounce && "animate-[wave_1s_ease-in-out]")} />
    } else if (methodLower.includes("express") || methodLower.includes("same day")) {
      return <Bike className={cn("h-8 w-8", bounce && "animate-bounce")} />
    } else if (methodLower.includes("standard") || methodLower.includes("ground")) {
      return <Truck className={cn("h-8 w-8", bounce && "animate-bounce")} />
    } else {
      return <Package className={cn("h-8 w-8", bounce && "animate-bounce")} />
    }
  }

  return (
    <div className="relative h-16 w-full bg-gray-100 rounded-lg overflow-hidden mb-4">
      <style jsx global>{`
        @keyframes wave {
          0%, 100% { transform: translateY(0) rotate(0); }
          25% { transform: translateY(-5px) rotate(-5deg); }
          75% { transform: translateY(-5px) rotate(5deg); }
        }
        @keyframes pulse-warning {
          0%, 100% { opacity: 1; transform: scale(1); }
          50% { opacity: 0.6; transform: scale(1.1); }
        }
      `}</style>

      {/* Origin */}
      <div className="absolute left-2 top-1/2 -translate-y-1/2 flex flex-col items-center">
        <Package className="h-6 w-6 text-gray-500" />
        <span className="text-xs text-gray-500">Origin</span>
      </div>

      {/* Destination */}
      <div className="absolute right-2 top-1/2 -translate-y-1/2 flex flex-col items-center">
        {isCompleted ? (
          <CheckCircle className="h-6 w-6 text-green-500 animate-[scale_1s_ease-in-out]" />
        ) : (
          <Package className="h-6 w-6 text-green-500" />
        )}
        <span className="text-xs text-gray-500">Destination</span>
      </div>

      {/* Progress line */}
      <div className="absolute top-1/2 left-10 right-10 h-0.5 bg-gray-300"></div>

      {/* Progress indicator */}
      {isCompleted && <div className="absolute top-1/2 left-10 h-0.5 right-10 bg-green-500"></div>}

      {isActive && (
        <div
          className="absolute top-1/2 left-10 h-0.5 bg-blue-500 transition-all duration-300"
          style={{ width: `${position}%` }}
        ></div>
      )}

      {isHalted && <div className="absolute top-1/2 left-10 h-0.5 right-10 bg-yellow-300 opacity-50"></div>}

      {/* Moving vehicle */}
      {isActive && (
        <div
          className="absolute top-1/2 -translate-y-1/2 text-[#c9002f] transition-all duration-300"
          style={{ left: `${position + 5}%` }}
        >
          {getIcon()}
        </div>
      )}

      {/* Halted indicator */}
      {isHalted && (
        <div
          className="absolute top-1/2 -translate-y-1/2 text-yellow-600 animate-[pulse-warning_1.5s_infinite]"
          style={{ left: "50%", transform: "translate(-50%, -50%)" }}
        >
          <AlertCircle className="h-8 w-8" />
        </div>
      )}

      {/* Completed indicator */}
      {isCompleted && (
        <div className="absolute top-1/2 -translate-y-1/2 text-green-600" style={{ left: "90%" }}>
          <CheckCircle className="h-8 w-8 animate-[scale_1s_ease-in-out]" />
        </div>
      )}
    </div>
  )
}
