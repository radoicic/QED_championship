"use client"

import { ReactNode, useEffect, useState } from 'react'

export default function ClientWrapper({ children }: { children: ReactNode }) {
  const [mounted, setMounted] = useState(false)
  
  // Only render children on the client
  useEffect(() => {
    setMounted(true)
  }, [])
  
  if (!mounted) {
    return null
  }
  
  return <>{children}</>
} 