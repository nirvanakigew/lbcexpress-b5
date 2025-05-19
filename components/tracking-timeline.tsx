import type { TrackingHistory } from "@/types"
import { AnimatedStatusIcon } from "./animated-status-icon"

interface TrackingTimelineProps {
  history: TrackingHistory[]
}

export function TrackingTimeline({ history }: TrackingTimelineProps) {
  // Sort history by timestamp in descending order (newest first)
  const sortedHistory = [...history].sort((a, b) => new Date(b.timestamp).getTime() - new Date(a.timestamp).getTime())

  const getStatusColor = (status: string) => {
    switch (status.toLowerCase()) {
      case "delivered":
        return "bg-green-100 text-green-800 border-green-200"
      case "in transit":
      case "out for delivery":
      case "package received":
        return "bg-blue-100 text-blue-800 border-blue-200"
      case "on hold":
      case "delayed":
        return "bg-yellow-100 text-yellow-800 border-yellow-200"
      case "failed delivery":
      case "returned to sender":
        return "bg-red-100 text-red-800 border-red-200"
      default:
        return "bg-gray-100 text-gray-800 border-gray-200"
    }
  }

  return (
    <div className="space-y-6">
      {sortedHistory.map((event, index) => (
        <div key={event.id} className="flex">
          <div className="mr-4 flex flex-col items-center">
            <div className={`flex h-10 w-10 items-center justify-center rounded-full ${getStatusColor(event.status)}`}>
              <AnimatedStatusIcon status={event.status} size="sm" />
            </div>
            {index < sortedHistory.length - 1 && <div className="h-full w-0.5 bg-gray-200" />}
          </div>
          <div className="flex-1 pt-1.5 pb-8">
            <div className="flex flex-col sm:flex-row sm:justify-between">
              <h3 className="text-lg font-medium">{event.status}</h3>
              <time className="text-sm text-gray-500">
                {new Date(event.timestamp).toLocaleString("en-US", {
                  year: "numeric",
                  month: "short",
                  day: "numeric",
                  hour: "2-digit",
                  minute: "2-digit",
                })}
              </time>
            </div>
            {event.location && <p className="mt-1 text-sm text-gray-600">Location: {event.location}</p>}
            {event.description && <p className="mt-2 text-gray-700">{event.description}</p>}
          </div>
        </div>
      ))}
    </div>
  )
}
