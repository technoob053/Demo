"use client"

import Script from "next/script"
import { useEffect } from "react"

// Add type declarations
declare global {
  interface Window {
    framerMotion: {
      motion: any;
      AnimatePresence: any;
    };
    framerMotionLoaded: boolean;
    motion: any;
  }
}

export function FramerMotionInit() {
  useEffect(() => {
    // Initialize on mount
    if (typeof window !== 'undefined') {
      window.framerMotionLoaded = false;
    }
  }, [])

  return (
    <Script
      src="https://unpkg.com/framer-motion@10.16.4/dist/framer-motion.js"
      strategy="beforeInteractive"
      onLoad={() => {
        if (typeof window !== 'undefined') {
          window.framerMotionLoaded = true;
          window.motion = window.framerMotion; // Make motion available globally
        }
      }}
    />
  )
}
