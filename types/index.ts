export interface AdminUser {
  id: string
  email: string
  name: string
  role: string
  created_at: string
  last_login: string | null
}

export interface Order {
  id: string
  tracking_number: string
  status: string
  product_name: string
  weight: number
  dimensions: string | null
  package_value: number | null
  package_description: string | null
  shipping_company: string
  shipping_method: string
  delivery_date: string | null
  recipient_name: string
  recipient_phone: string
  recipient_address: string
  sender_name: string
  sender_phone: string
  sender_address: string
  officer_name: string | null
  officer_id: string | null
  currency: string
  shipping_cost: number
  total_amount: number
  created_at: string
  updated_at: string
}

export interface TrackingHistory {
  id: string
  order_id: string
  status: string
  location: string | null
  description: string | null
  timestamp: string
}

export interface TrackingInfo {
  order: Order
  history: TrackingHistory[]
}
