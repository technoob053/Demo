"use client"

import { useState, useEffect } from "react"
import { useRouter } from "next/navigation"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { useToast } from "@/hooks/use-toast"
import { Eye, EyeOff } from "lucide-react"

declare global {
  interface Window {
    motion: any;
  }
}
// Add this import
import { Logo } from "@/components/logo"

export default function LoginPage() {
  const router = useRouter()
  const { show, ToastContainer } = useToast()
  const [isLoading, setIsLoading] = useState(false)
  const [Motion, setMotion] = useState<any>(() => 'div')
  const [showPassword, setShowPassword] = useState(false)
  const [mounted, setMounted] = useState(false)

  async function onSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault()
    setIsLoading(true)

    const formData = new FormData(e.currentTarget)
    const email = formData.get("email") as string
    const password = formData.get("password") as string

    try {
      const users = JSON.parse(localStorage.getItem("users") || "[]")
      const user = users.find((u: any) => u.email === email && u.password === password)

      if (user) {
        localStorage.setItem("currentUser", JSON.stringify(user))
        show("Đăng nhập thành công", "success")
        
        // Thêm delay nhỏ để đảm bảo localStorage được cập nhật
        setTimeout(() => {
          document.location.href = "/"
        }, 500)
        
      } else {
        show("Email hoặc mật khẩu không chính xác", "error")
        setIsLoading(false)
      }
    } catch (error) {
      show("Có lỗi xảy ra", "error") 
      setIsLoading(false)
    }
  }

  useEffect(() => {
    setMounted(true)
    if (typeof window !== 'undefined' && window.motion) {
      setMotion(() => window.motion.div)
    }
  }, [])

  useEffect(() => {
    const currentUser = localStorage.getItem("currentUser")
    if (currentUser) {
      router.push("/")
    }
  }, [])

  if (!mounted) return null

  return (
    <div className="min-h-screen bg-gradient-to-br from-background to-secondary/10">
      <div className="container relative min-h-screen flex-col items-center justify-center grid lg:max-w-none lg:grid-cols-2 lg:px-0">
        
        {/* Background Design */}
        <Motion
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1 }}
          className="relative hidden h-full flex-col bg-muted p-10 text-white dark:border-r lg:flex"
        >
          <div className="absolute inset-0 bg-primary/50" />
          {/* Brand section */}
          <div className="relative z-20 flex items-center gap-2 text-lg font-medium">
            <div className="h-8 w-8 rounded-full bg-white/10 p-1">
              <Logo />
            </div>
           
          </div>
          <Motion 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5 }}
            className="relative z-20 mt-auto"
          >
            <blockquote className="space-y-2">
              <p className="text-lg">
                "Hệ thống AI này đã giúp tôi lập kế hoạch dinh dưỡng hiệu quả và khoa học hơn rất nhiều."
              </p>
              <footer className="text-sm">Sofia Davis - Chuyên gia dinh dưỡng</footer>
            </blockquote>
          </Motion>
        </Motion>

        {/* Login Form */}
        <div className="lg:p-8">
          <Motion
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="mx-auto flex w-full flex-col justify-center space-y-6 sm:w-[350px]"
          >
            <div className="flex flex-col space-y-2 text-center">
              <h1 className="text-2xl font-semibold tracking-tight">
                Đăng nhập vào tài khoản
              </h1>
              <p className="text-sm text-muted-foreground">
                Nhập email và mật khẩu để đăng nhập
              </p>
            </div>

            <form onSubmit={onSubmit} className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="email">Email</Label>
                <Input id="email" name="email" type="email" required />
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="password">Mật khẩu</Label>
                <div className="relative">
                  <Input
                    id="password"
                    type={showPassword ? "text" : "password"}
                    name="password"
                    required
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground"
                  >
                    {showPassword ? (
                      <EyeOff className="h-4 w-4" />
                    ) : (
                      <Eye className="h-4 w-4" />
                    )}
                  </button>
                </div>
              </div>

              <Button type="submit" className="w-full" disabled={isLoading}>
                {isLoading ? (
                  <Motion
                    animate={{ rotate: 360 }}
                    transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
                    className="mr-2 h-4 w-4 border-2 border-current border-t-transparent rounded-full"
                  />
                ) : null}
                {isLoading ? "Đang xử lý..." : "Đăng nhập"}
              </Button>
            </form>

            <div className="relative">
              <div className="absolute inset-0 flex items-center">
                <span className="w-full border-t" />
              </div>
              <div className="relative flex justify-center text-xs uppercase">
                <span className="bg-background px-2 text-muted-foreground">
                  Hoặc tiếp tục với
                </span>
              </div>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <Button variant="outline">
                <Motion whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                  Google
                </Motion>
              </Button>
              <Button variant="outline">
                <Motion whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                  Facebook
                </Motion>
              </Button>
            </div>

            <p className="px-8 text-center text-sm text-muted-foreground">
              <Link href="/auth/register" className="hover:text-primary underline underline-offset-4">
                Chưa có tài khoản? Đăng ký ngay
              </Link>
            </p>
          </Motion>
        </div>
      </div>
      <ToastContainer />
    </div>
  )
}
