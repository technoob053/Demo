"use client"

import { useEffect, useState } from "react"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button" 
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Avatar } from "@/components/ui/avatar"
import { 
  LogOut, 
  MessageSquare, 
  TrendingUp,
  Apple,
  Utensils,
  Brain,
  ChevronRight
} from "lucide-react"
import { MainNav } from "@/components/main-nav"
import { useToast } from "@/hooks/use-toast"
import {
  Dialog,
  DialogContent, 
  DialogHeader,
  DialogTitle,
  DialogDescription
} from "@/components/ui/dialog"

// Add type declaration for framer-motion from window
declare global {
  interface Window {
    framerMotion: {
      motion: any;
      AnimatePresence: any;
    }
  }
}

// Update the Meal interface to match recommendations.json
interface Meal {
  name: string
  ingredients: string[]
  nutrition: {
    calories: number
    protein: number
    carbs: number
    fat: number
    sodium: number
  }
  preparation: string
  price: number
}

export default function HomePage() {
  const router = useRouter()
  const [isLoading, setIsLoading] = useState(true)
  const [user, setUser] = useState<any>(null)
  const [meals, setMeals] = useState<Meal[]>([])
  const { show, ToastContainer } = useToast()

  // Add state for motion component
  const [MotionDiv, setMotionDiv] = useState<any>('div')

  const [selectedMeal, setSelectedMeal] = useState<Meal | null>(null)
  const [showDetails, setShowDetails] = useState(false)

  useEffect(() => {
    if (typeof window !== 'undefined' && window.framerMotion) {
      setMotionDiv(window.framerMotion.motion.div)
    }
  }, [])

  useEffect(() => {
    checkAuth()
    loadMeals()
  }, [])

  const checkAuth = () => {
    const currentUser = localStorage.getItem("currentUser")
    if (!currentUser) {
      window.location.href = "/auth/login"
      return
    }

    try {
      const userData = JSON.parse(currentUser)
      setUser(userData)
    } catch (error) {
      localStorage.removeItem("currentUser")
      window.location.href = "/auth/login"
    } finally {
      setIsLoading(false)
    }
  }

  const loadMeals = async () => {
    try {
      const response = await fetch('/data/recommendations.json')
      if (!response.ok) throw new Error('Failed to load meals')
      const data = await response.json()
      setMeals(data.meals)
    } catch (error) {
      console.error('Error loading meals:', error)
      show("Không thể tải danh sách món ăn", "error")
    }
  }

  const handleLogout = () => {
    localStorage.removeItem("currentUser")
    show("Đăng xuất thành công", "success")
    router.push("/auth/login")
  }

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="flex flex-col items-center gap-4">
          <div className="h-8 w-8 animate-spin rounded-full border-4 border-primary border-t-transparent" />
          <p className="text-sm text-muted-foreground">Đang tải...</p>
        </div>
      </div>
    )
  }

  if (!user) {
    return <div className="min-h-screen flex items-center justify-center">
      <div className="animate-spin h-8 w-8 border-4 border-primary border-t-transparent rounded-full"></div>
    </div>
  }

  return (
    <div className="min-h-screen bg-background">
      <ToastContainer />
      
      {/* Enhanced Header */}
      <header className="border-b sticky top-0 bg-background/80 backdrop-blur-sm z-50">
        <div className="container mx-auto px-4">
          <div className="flex h-16 items-center justify-between">
            <MainNav />
            <div className="flex items-center gap-4">
              <Button
                variant="outline"
                onClick={() => router.push("/chat")}
              >
                <MessageSquare className="mr-2 h-4 w-4" />
                Chat với AI
              </Button>
              <Button 
                variant="ghost"
                size="icon"
                onClick={handleLogout}
              >
                <LogOut className="h-4 w-4" />
              </Button>
            </div>
          </div>
        </div>
      </header>

      <main>
        {/* Hero Section */}
        <section className="py-20 px-4 text-center relative overflow-hidden">
          <MotionDiv
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="container mx-auto relative z-10"
          >
            <h1 className="text-4xl md:text-6xl font-bold mb-6 bg-clip-text text-transparent bg-gradient-to-r from-primary to-brand-secondary">
              AI Dinh Dưỡng Thông Minh
            </h1>
            <p className="text-xl text-muted-foreground mb-8 max-w-2xl mx-auto">
              Tối ưu hóa chế độ ăn của bạn với công nghệ AI tiên tiến. 
              Nhận gợi ý thực đơn được cá nhân hóa dựa trên nhu cầu của bạn.
            </p>
            <Button
              size="lg"
              onClick={() => router.push("/chat")}
              className="animate-pulse"
            >
              Bắt đầu ngay <ChevronRight className="ml-2 h-4 w-4" />
            </Button>
          </MotionDiv>

          {/* Animated background patterns */}
          <div className="absolute inset-0 -z-10 opacity-20">
            <div className="absolute inset-0 bg-grid-primary/[0.1] bg-[size:20px_20px]" />
          </div>
        </section>

        {/* Main Content */}
        <div className="container mx-auto px-4 py-12">
          <div className="grid gap-8">
            {/* Enhanced User Profile */}
            <section>
              <Card className="overflow-hidden">
                <div className="bg-gradient-to-r from-primary/10 to-brand-secondary/10 p-6">
                  <div className="flex items-center space-x-4">
                    <Avatar className="h-20 w-20 ring-4 ring-background">
                      <div className="flex h-full w-full items-center justify-center bg-primary text-3xl font-semibold text-primary-foreground">
                        {user?.name[0]}
                      </div>
                    </Avatar>
                    <div>
                      <CardTitle className="text-2xl mb-2">{user?.name}</CardTitle>
                      <p className="text-muted-foreground">{user?.email}</p>
                    </div>
                  </div>
                </div>
                <CardContent className="p-6">
                  <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                    {[
                      { icon: TrendingUp, label: "Thực đơn đã tạo", value: "12" },
                      { icon: Apple, label: "Calories mục tiêu", value: "2000" },
                      { icon: Utensils, label: "Món ăn yêu thích", value: "8" },
                      { icon: Brain, label: "Tương tác AI", value: "24" },
                    ].map((stat, i) => (
                      <MotionDiv
                        key={i}
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: i * 0.1 }}
                        className="flex flex-col items-center p-4 rounded-lg bg-muted/50"
                      >
                        <stat.icon className="h-6 w-6 mb-2 text-primary" />
                        <p className="text-sm text-muted-foreground mb-1">{stat.label}</p>
                        <p className="text-2xl font-bold">{stat.value}</p>
                      </MotionDiv>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </section>

            {/* Enhanced Meal Recommendations */}
            <section>
              <div className="flex items-center justify-between mb-6">
                <div>
                  <h2 className="text-3xl font-bold">Món ăn gợi ý</h2>
                  <p className="text-muted-foreground mt-1">
                    Khám phá các món ăn đa dạng và dinh dưỡng
                  </p>
                </div>
                <Button variant="outline" onClick={() => router.push("/chat")}>
                  <MessageSquare className="mr-2 h-4 w-4" />
                  Tùy chỉnh thực đơn
                </Button>
              </div>

              <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
                {meals.map((meal, i) => (
                  <MotionDiv
                    key={meal.name}
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ delay: i * 0.1 }}
                  >
                    <Card className="group hover:shadow-lg transition-all duration-300 overflow-hidden">
                      <CardContent className="p-4">
                        <h3 className="text-xl font-semibold mb-3">{meal.name}</h3>
                        
                        {/* Ingredients */}
                        <div className="mb-4">
                          <h4 className="text-sm font-medium text-muted-foreground mb-2">Nguyên liệu:</h4>
                          <div className="flex flex-wrap gap-2">
                            {meal.ingredients.map((ingredient, index) => (
                              <span 
                                key={index}
                                className="px-2 py-1 bg-primary/5 text-primary rounded-full text-xs"
                              >
                                {ingredient}
                              </span>
                            ))}
                          </div>
                        </div>

                        {/* Nutrition Info */}
                        <div className="mb-4 grid grid-cols-2 gap-3">
                          <div className="p-2 bg-muted rounded-lg">
                            <div className="text-xs text-muted-foreground">Calories</div>
                            <div className="font-semibold">{meal.nutrition.calories} kcal</div>
                          </div>
                          <div className="p-2 bg-muted rounded-lg">
                            <div className="text-xs text-muted-foreground">Protein</div>
                            <div className="font-semibold">{meal.nutrition.protein}g</div>
                          </div>
                          <div className="p-2 bg-muted rounded-lg">
                            <div className="text-xs text-muted-foreground">Carbs</div>
                            <div className="font-semibold">{meal.nutrition.carbs}g</div>
                          </div>
                          <div className="p-2 bg-muted rounded-lg">
                            <div className="text-xs text-muted-foreground">Chất béo</div>
                            <div className="font-semibold">{meal.nutrition.fat}g</div>
                          </div>
                        </div>

                        {/* Price and Action */}
                        <div className="flex items-center justify-between mt-4 pt-4 border-t">
                          <div className="flex items-baseline gap-1">
                            <span className="text-2xl font-bold">{meal.price.toLocaleString()}</span>
                            <span className="text-muted-foreground">đ</span>
                          </div>
                          <Button
                            size="sm"
                            variant="outline"
                            onClick={() => {
                              setSelectedMeal(meal)
                              setShowDetails(true)
                            }}
                          >
                            Chi tiết
                            <ChevronRight className="ml-2 h-4 w-4" />
                          </Button>
                        </div>

                        {/* Hover Info */}
                        <div className="absolute inset-0 bg-background/80 backdrop-blur-sm opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
                          <div className="text-center p-4">
                            <h4 className="font-medium mb-2">Cách chế biến</h4>
                            <p className="text-sm text-muted-foreground">
                              {meal.preparation}
                            </p>
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  </MotionDiv>
                ))}
              </div>
            </section>
          </div>
        </div>

        {/* Meal Details Dialog */}
        <Dialog open={showDetails} onOpenChange={setShowDetails}>
          <DialogContent className="max-w-2xl">
            {selectedMeal && (
              <>
                <DialogHeader>
                  <DialogTitle className="text-2xl">{selectedMeal.name}</DialogTitle>
                  <DialogDescription>
                    Chi tiết về món ăn và dinh dưỡng
                  </DialogDescription>
                </DialogHeader>

                <div className="grid gap-6">
                  {/* Ingredients Section */}
                  <div>
                    <h3 className="text-lg font-semibold mb-2">Nguyên liệu</h3>
                    <div className="flex flex-wrap gap-2">
                      {selectedMeal.ingredients.map((ingredient, idx) => (
                        <span
                          key={idx}
                          className="px-3 py-1 bg-primary/10 text-primary rounded-full text-sm"
                        >
                          {ingredient}
                        </span>
                      ))}
                    </div>
                  </div>

                  {/* Nutrition Section */}
                  <div>
                    <h3 className="text-lg font-semibold mb-2">Thông tin dinh dưỡng</h3>
                    <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                      <Card>
                        <CardContent className="p-4">
                          <p className="text-sm text-muted-foreground">Calories</p>
                          <p className="text-2xl font-bold">{selectedMeal.nutrition.calories}</p>
                          <p className="text-xs text-muted-foreground">kcal</p>
                        </CardContent>
                      </Card>
                      <Card>
                        <CardContent className="p-4">
                          <p className="text-sm text-muted-foreground">Protein</p>
                          <p className="text-2xl font-bold">{selectedMeal.nutrition.protein}</p>
                          <p className="text-xs text-muted-foreground">gram</p>
                        </CardContent>
                      </Card>
                      <Card>
                        <CardContent className="p-4">
                          <p className="text-sm text-muted-foreground">Carbs</p>
                          <p className="text-2xl font-bold">{selectedMeal.nutrition.carbs}</p>
                          <p className="text-xs text-muted-foreground">gram</p>
                        </CardContent>
                      </Card>
                      <Card>
                        <CardContent className="p-4">
                          <p className="text-sm text-muted-foreground">Chất béo</p>
                          <p className="text-2xl font-bold">{selectedMeal.nutrition.fat}</p>
                          <p className="text-xs text-muted-foreground">gram</p>
                        </CardContent>
                      </Card>
                      <Card>
                        <CardContent className="p-4">
                          <p className="text-sm text-muted-foreground">Natri</p>
                          <p className="text-2xl font-bold">{selectedMeal.nutrition.sodium}</p>
                          <p className="text-xs text-muted-foreground">mg</p>
                        </CardContent>
                      </Card>
                    </div>
                  </div>

                  {/* Preparation Section */}
                  <div>
                    <h3 className="text-lg font-semibold mb-2">Cách chế biến</h3>
                    <Card>
                      <CardContent className="p-4 prose prose-sm max-w-none">
                        <p className="text-muted-foreground whitespace-pre-wrap">
                          {selectedMeal.preparation}
                        </p>
                      </CardContent>
                    </Card>
                  </div>

                  {/* Price Section */}
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm text-muted-foreground">Giá tham khảo</p>
                      <p className="text-3xl font-bold">{selectedMeal.price.toLocaleString()}đ</p>
                    </div>
                    <Button onClick={() => router.push("/chat")}>
                      <MessageSquare className="mr-2 h-4 w-4" />
                      Chat với AI về món này
                    </Button>
                  </div>
                </div>
              </>
            )}
          </DialogContent>
        </Dialog>

      </main>
    </div>
  )
}

