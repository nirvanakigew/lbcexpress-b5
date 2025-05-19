"use client"

import { useState, useEffect } from "react"
import { Package, Smartphone, FileText, ShoppingBag, BookOpen, Gift } from "lucide-react"
import { cn } from "@/lib/utils"

interface AnimatedProductImageProps {
  productName: string
  className?: string
}

export function AnimatedProductImage({ productName, className = "" }: AnimatedProductImageProps) {
  const [animate, setAnimate] = useState(false)

  // Restart animation every 5 seconds
  useEffect(() => {
    setAnimate(true)

    const interval = setInterval(() => {
      setAnimate(false)
      setTimeout(() => setAnimate(true), 50)
    }, 5000)

    return () => clearInterval(interval)
  }, [])

  const getProductIcon = () => {
    const productLower = productName.toLowerCase()

    if (productLower.includes("electronic")) {
      return <Smartphone className="h-12 w-12 text-blue-500" />
    } else if (productLower.includes("document")) {
      return <FileText className="h-12 w-12 text-yellow-500" />
    } else if (productLower.includes("cloth")) {
      return <ShoppingBag className="h-12 w-12 text-purple-500" />
    } else if (productLower.includes("book")) {
      return <BookOpen className="h-12 w-12 text-green-500" />
    } else if (productLower.includes("gift")) {
      return <Gift className="h-12 w-12 text-red-500" />
    } else {
      return <Package className="h-12 w-12 text-gray-500" />
    }
  }

  const getAnimationClass = () => {
    const productLower = productName.toLowerCase()

    if (productLower.includes("electronic")) {
      return animate ? "animate-[pulse_2s_infinite]" : ""
    } else if (productLower.includes("document")) {
      return animate ? "animate-[flip_1s_ease-in-out]" : ""
    } else if (productLower.includes("cloth")) {
      return animate ? "animate-[float_3s_ease-in-out_infinite]" : ""
    } else if (productLower.includes("book")) {
      return animate ? "animate-[page_2s_ease-in-out]" : ""
    } else if (productLower.includes("gift")) {
      return animate ? "animate-[bounce_1s_ease-in-out]" : ""
    } else {
      return animate ? "animate-pulse" : ""
    }
  }

  return (
    <div className={cn("relative rounded-md overflow-hidden bg-gray-100 flex items-center justify-center", className)}>
      <style jsx global>{`
        @keyframes flip {
          0% { transform: rotateY(0); }
          100% { transform: rotateY(180deg); }
        }
        @keyframes float {
          0%, 100% { transform: translateY(0); }
          50% { transform: translateY(-10px); }
        }
        @keyframes page {
          0% { transform: rotateY(0); }
          30% { transform: rotateY(-20deg); }
          70% { transform: rotateY(20deg); }
          100% { transform: rotateY(0); }
        }
        @keyframes bounce {
          0%, 100% { transform: translateY(0); }
          50% { transform: translateY(-15px); }
        }
      `}</style>
      <div className={getAnimationClass()}>{getProductIcon()}</div>
    </div>
  )
}
