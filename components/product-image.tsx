import Image from "next/image"

interface ProductImageProps {
  productName: string
  className?: string
}

export function ProductImage({ productName, className = "" }: ProductImageProps) {
  // Map product names to image URLs
  // In a real app, these would come from the database
  const productImages: Record<string, string> = {
    Electronics: "/product-images/electronics.png",
    Documents: "/product-images/documents.png",
    Clothing: "/product-images/clothing.png",
    Books: "/product-images/books.png",
    "Gift Items": "/product-images/gifts.png",
    // Default for other products
    default: "/product-images/package.png",
  }

  const imageUrl = productImages[productName] || productImages.default

  return (
    <div className={`relative rounded-md overflow-hidden bg-gray-100 ${className}`}>
      <Image
        src={imageUrl || "/placeholder.svg"}
        alt={productName}
        width={120}
        height={120}
        className="object-cover"
        onError={(e) => {
          // Fallback to a placeholder if image fails to load
          e.currentTarget.style.display = "none"
          const parent = e.currentTarget.parentElement
          if (parent) {
            const fallback = document.createElement("div")
            fallback.className = "flex items-center justify-center h-full w-full"
            const icon = document.createElement("div")
            icon.innerHTML =
              '<svg xmlns="http://www.w3.org/2000/svg" width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" class="text-gray-400"><path d="M21 16V8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.73l7 4a2 2 0 0 0 2 0l7-4A2 2 0 0 0 21 16z"></path><polyline points="3.27 6.96 12 12.01 20.73 6.96"></polyline><line x1="12" y1="22.08" x2="12" y2="12"></line></svg>'
            fallback.appendChild(icon)
            parent.appendChild(fallback)
          }
        }}
      />
    </div>
  )
}
