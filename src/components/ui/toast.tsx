"use client"

import { useEffect, useState } from "react"
import { X } from "lucide-react"

export type ToastProps = {
  message: string
  type?: "default" | "success" | "error"
  duration?: number
  onClose?: () => void
}

export function Toast({ message, type = "default", duration = 3000, onClose }: ToastProps) {
  const [isVisible, setIsVisible] = useState(true)

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsVisible(false)
      onClose?.()
    }, duration)

    return () => clearTimeout(timer)
  }, [duration, onClose])

  if (!isVisible) return null

  return (
    <div className={`
      fixed bottom-4 right-4 z-50 
      flex items-center gap-2 
      rounded-lg px-4 py-2 shadow-lg
      ${type === "success" ? "bg-green-600" : type === "error" ? "bg-red-600" : "bg-zinc-800"}
      text-white
    `}>
      <span>{message}</span>
      <button onClick={() => setIsVisible(false)} className="hover:opacity-70">
        <X size={18} />
      </button>
    </div>
  )
}
