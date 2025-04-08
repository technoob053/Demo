"use client"

import { ChatInterfaceWithRAG } from "@/components/chat-interface-with-rag"

export default function ChatPage() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-4 md:p-24">
      <div className="z-10 w-full max-w-7xl">
        <ChatInterfaceWithRAG />
      </div>
    </main>
  )
}
