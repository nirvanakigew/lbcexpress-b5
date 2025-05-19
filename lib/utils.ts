import { type ClassValue, clsx } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export function formatDate(date: Date | string | null): string {
  if (!date) return "N/A"

  const d = typeof date === "string" ? new Date(date) : date
  return d.toLocaleDateString("en-US", {
    year: "numeric",
    month: "long",
    day: "numeric",
  })
}

export function generateTrackingNumber(): string {
  // Generate a random 5-digit number
  const randomNum = Math.floor(10000 + Math.random() * 90000)
  return `LBC${randomNum}`
}

export const ORDER_STATUSES = [
  "Pending",
  "Package Received",
  "Processing",
  "In Transit",
  "Out for Delivery",
  "Delivered",
  "On Hold",
  "Delayed",
  "Returned to Sender",
  "Failed Delivery",
]
