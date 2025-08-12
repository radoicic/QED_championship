"use client"

import { useEffect, useState } from "react"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { useLanguage } from "@/lib/language-provider"

export default function VideosPage() {
  const { t } = useLanguage()
  const router = useRouter()
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    // Simulate loading
    const timer = setTimeout(() => {
      setIsLoading(false)
    }, 1000)
    
    return () => clearTimeout(timer)
  }, [])

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-primary mx-auto mb-4"></div>
          <p>Loading videos...</p>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-900 via-purple-900 to-indigo-900">
      <div className="text-center text-white">
        <h1 className="text-4xl font-bold mb-6">
          Videos Page
        </h1>
        <p className="text-xl mb-8">
          This page is temporarily simplified for deployment
        </p>
        <div className="space-y-4">
          <div className="p-4 bg-white/10 rounded-lg backdrop-blur-sm">
            <h2 className="text-2xl font-semibold mb-2">🚧 Under Construction</h2>
            <p>Full videos functionality will be restored after successful deployment</p>
          </div>
          <Button 
            onClick={() => router.push('/')}
            className="bg-white text-blue-900 hover:bg-gray-100"
          >
            Back to Home
          </Button>
        </div>
      </div>
    </div>
  )
} 