import type { Metadata } from "next"
import { Inter } from "next/font/google"
import "./globals.css"

const inter = Inter({ subsets: ["latin"] })

export const metadata: Metadata = {
  title: "NutriAI - Hệ thống dinh dưỡng thông minh",
  description: "Hệ thống gợi ý thực đơn thông minh với AI",
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="vi" suppressHydrationWarning>
      <head>
        <script
          dangerouslySetInnerHTML={{
            __html: `
              if (!window.framer) {
                const script = document.createElement('script');
                script.src = 'https://unpkg.com/framer-motion@10.16.4/dist/framer-motion.js';
                script.onload = () => {
                  window.motion = window.framerMotion;
                };
                document.head.appendChild(script);
              }
            `
          }}
        />
      </head>
      <body className={inter.className}>
        {children}
      </body>
    </html>
  )
}
