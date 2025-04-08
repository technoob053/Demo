"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"
import { cn } from "@/lib/utils"
import { Logo } from "./logo"
import { useEffect, useState } from "react"

export function MainNav() {
  const pathname = usePathname()
  const [MotionDiv, setMotionDiv] = useState<any>('div')

  useEffect(() => {
    if (typeof window !== 'undefined' && window.framerMotion) {
      setMotionDiv(window.framerMotion.motion.div)
    }
  }, [])

  return (
    <MotionDiv 
      initial={{ opacity: 0, y: -10 }}
      animate={{ opacity: 1, y: 0 }}
      className="flex items-center space-x-6"
    >
      <Logo className="transition-transform hover:scale-105" />
      <nav className="hidden md:flex items-center space-x-4">
        {[
          { href: "/", label: "Trang chủ" },
          { href: "/chat", label: "Chat Bot" },
        ].map(({ href, label }) => (
          <Link
            key={href}
            href={href}
            className={cn(
              "text-sm font-medium transition-colors hover:text-primary relative",
              pathname === href ? "text-foreground" : "text-muted-foreground"
            )}
          >
            {label}
            {pathname === href && (
              <MotionDiv
                className="absolute -bottom-3 left-0 right-0 h-0.5 bg-primary"
                initial={{ scaleX: 0 }}
                animate={{ scaleX: 1 }}
                transition={{ duration: 0.2 }}
              />
            )}
          </Link>
        ))}
      </nav>
    </MotionDiv>
  )
}
