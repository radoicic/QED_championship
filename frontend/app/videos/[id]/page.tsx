"use client"

import { useEffect, useState } from "react"
import { useParams, useRouter } from "next/navigation"
import Link from "next/link"
import { ChevronLeft } from "lucide-react"
import { Button } from "@/components/ui/button"
import { useLanguage } from "@/lib/language-provider"

export default function VideoDetailPage() {
  const params = useParams()
  const router = useRouter()
  const { t } = useLanguage()
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
          <p>Loading video...</p>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-900 via-purple-900 to-indigo-900">
      <div className="container py-8">
        <div className="mb-6">
          <Button 
            onClick={() => router.push('/videos')}
            variant="outline"
            className="text-white border-white/20 hover:bg-white/10"
          >
            <ChevronLeft className="h-4 w-4 mr-2" />
            Back to Videos
          </Button>
        </div>
        
        <div className="text-center text-white">
          <h1 className="text-4xl font-bold mb-6">
            Video Detail Page
          </h1>
          <p className="text-xl mb-8">
            This page is temporarily simplified for deployment
          </p>
          <div className="space-y-4">
            <div className="p-4 bg-white/10 rounded-lg backdrop-blur-sm">
              <h2 className="text-2xl font-semibold mb-2">🚧 Under Construction</h2>
              <p>Full video player functionality will be restored after successful deployment</p>
            </div>
            <div className="p-4 bg-white/10 rounded-lg backdrop-blur-sm">
              <p className="text-sm">Video ID: {params.id}</p>
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
    </div>
  )
}
