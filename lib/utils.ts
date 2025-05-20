import { type ClassValue, clsx } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export function formatDate(date: Date | string | null): string {
  if (!date) return "N/A"

  const d = typeof date === "string" ? new Date(date) : date

  // Format date in Philippines time (UTC+8)
  const options: Intl.DateTimeFormatOptions = {
    year: "numeric",
    month: "long",
    day: "numeric",
    timeZone: "Asia/Manila",
  }

  return d.toLocaleDateString("en-PH", options)
}

export function formatDateTime(date: Date | string | null): string {
  if (!date) return "N/A"

  const d = typeof date === "string" ? new Date(date) : date

  // Format date and time in Philippines time (UTC+8)
  const options: Intl.DateTimeFormatOptions = {
    year: "numeric",
    month: "long",
    day: "numeric",
    hour: "2-digit",
    minute: "2-digit",
    timeZone: "Asia/Manila",
  }

  return d.toLocaleString("en-PH", options)
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
