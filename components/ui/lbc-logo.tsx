import Image from "next/image"

export function LBCLogo({ size = "default" }: { size?: "small" | "default" | "large" }) {
  const sizes = {
    small: { width: 40, height: 40 },
    default: { width: 60, height: 60 },
    large: { width: 80, height: 80 },
  }

  const { width, height } = sizes[size]

  return (
    <div className="flex items-center gap-2">
      <Image src="/lbc-logo.png" alt="LBC Express Logo" width={width} height={height} priority />
      <span className="text-xl font-bold text-[#c9002f]">LBC Express</span>
    </div>
  )
}
