import { useState } from "react"
import { Toast, ToastProps } from "@/components/ui/toast"

export function useToast() {
  const [toasts, setToasts] = useState<ToastProps[]>([])

  const show = (message: string, type: ToastProps["type"] = "default") => {
    const newToast: ToastProps = {
      message,
      type,
      onClose: () => setToasts(current => current.filter(t => t !== newToast))
    }
    setToasts(current => [...current, newToast])
  }

  const ToastContainer = () => (
    <>
      {toasts.map((toast, i) => (
        <Toast key={i} {...toast} />
      ))}
    </>
  )

  return { show, ToastContainer }
}
