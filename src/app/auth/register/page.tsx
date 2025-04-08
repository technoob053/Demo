"use client"

import { useState, useEffect } from "react"
import { useRouter } from "next/navigation"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Label } from "@/components/ui/label"
import { useToast } from "@/hooks/use-toast"
import { Eye, EyeOff } from "lucide-react"
// Add this import
import { Logo } from "@/components/logo"

declare global {
  interface Window {
    motion: any;
  }
}

export default function RegisterPage() {
  const router = useRouter()
  const { show, ToastContainer } = useToast()
  const [isLoading, setIsLoading] = useState(false)
  const [Motion, setMotion] = useState<any>(() => 'div')
  const [showPassword, setShowPassword] = useState(false)
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)
    if (typeof window !== 'undefined' && window.motion) {
      setMotion(() => window.motion.div)
    }
  }, [])

  async function onSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault()
    setIsLoading(true)

    const formData = new FormData(e.currentTarget)
    const name = formData.get("name") as string
    const email = formData.get("email") as string
    const password = formData.get("password") as string

    try {
      const users = JSON.parse(localStorage.getItem("users") || "[]")
      
      if (users.some((u: any) => u.email === email)) {
        show("Email đã tồn tại", "error")
        return
      }

      const newUser = {
        id: Date.now().toString(),
        name,
        email,
        password,
        createdAt: new Date().toISOString()
      }

      users.push(newUser)
      localStorage.setItem("users", JSON.stringify(users))
      
      show("Đăng ký thành công", "success")
      router.push("/auth/login")
    } catch (error) {
      show("Có lỗi xảy ra", "error")
    } finally {
      setIsLoading(false)
    }
  }

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
                "Tham gia cùng hàng nghìn người dùng khác để tối ưu hóa chế độ dinh dưỡng của bạn với sự hỗ trợ của AI."
              </p>
              <footer className="text-sm">Team NutriAI</footer>
            </blockquote>
          </Motion>
        </Motion>

        {/* Register Form */}
        <div className="lg:p-8">
          <Motion 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="mx-auto flex w-full flex-col justify-center space-y-6 sm:w-[350px]"
          >
            <div className="flex flex-col space-y-2 text-center">
              <h1 className="text-2xl font-semibold tracking-tight">
                Tạo tài khoản mới
              </h1>
              <p className="text-sm text-muted-foreground">
                Nhập thông tin của bạn để đăng ký
              </p>
            </div>

            <form onSubmit={onSubmit} className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="name">Họ tên</Label>
                <Input id="name" name="name" required />
              </div>
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
                {isLoading ? "Đang xử lý..." : "Đăng ký"}
              </Button>
            </form>

            <p className="px-8 text-center text-sm text-muted-foreground">
              Đã có tài khoản?{" "}
              <Link href="/auth/login" className="hover:text-primary underline underline-offset-4">
                Đăng nhập
              </Link>
            </p>
          </Motion>
        </div>
      </div>
      <ToastContainer />
    </div>
  )
}
