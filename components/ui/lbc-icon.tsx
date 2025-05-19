export function LBCIcon({ className, size = 24 }: { className?: string; size?: number }) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 100 100"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
    >
      <circle cx="50" cy="50" r="50" fill="white" />
      <path
        d="M50 0C22.4 0 0 22.4 0 50C0 77.6 22.4 100 50 100C77.6 100 100 77.6 100 50C100 22.4 77.6 0 50 0ZM50 90C27.9 90 10 72.1 10 50C10 27.9 27.9 10 50 10C72.1 10 90 27.9 90 50C90 72.1 72.1 90 50 90Z"
        fill="#c9002f"
      />
      <path d="M30 30H45V45H30V30ZM55 30H70V45H55V30ZM30 55H45V70H30V55ZM55 55H70V70H55V55Z" fill="#c9002f" />
    </svg>
  )
}
