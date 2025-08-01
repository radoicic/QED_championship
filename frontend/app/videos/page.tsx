"use client"

import { useEffect, useState } from "react"
import { useSearchParams, useRouter } from "next/navigation"
import { ChevronLeft, ChevronRight, MessageSquare, FileText, TestTube2, Gamepad2, AlertTriangle, Cpu } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { useLanguage } from "@/lib/language-provider"
import VideoCard from "@/components/video/video-card"
import { getVideos, getVideosByCategory } from "@/lib/services/video-service"
import { Video } from "@/lib/services/video-service"

export default function VideosPage() {
  const { t } = useLanguage()
  const router = useRouter()
  const searchParams = useSearchParams()
  const [videos, setVideos] = useState<Video[]>([])
  const [isLoading, setIsLoading] = useState(true)
  const [currentPage, setCurrentPage] = useState(1)
  const [totalPages, setTotalPages] = useState(1)
  const [activeTab, setActiveTab] = useState("all")

  const categories = [
    {
      id: "all",
      title: "All Videos",
      icon: null
    },
    {
      id: "narrative",
      title: "Narrative",
      icon: MessageSquare,
      color: "text-[#60A5FA]",
      activeColor: "data-[state=active]:text-[#3B82F6]"
    },
    {
      id: "documentary",
      title: "Documentary",
      icon: FileText,
      color: "text-[#FB923C]",
      activeColor: "data-[state=active]:text-[#F97316]"
    },
    {
      id: "experimental",
      title: "Experimental",
      icon: TestTube2,
      color: "text-[#C084FC]",
      activeColor: "data-[state=active]:text-[#A855F7]"
    },
    {
      id: "animation",
      title: "Animation",
      icon: Gamepad2,
      color: "text-[#EAB308]",
      activeColor: "data-[state=active]:text-[#CA8A04]"
    },
    {
      id: "dystopian",
      title: "Dystopian",
      icon: AlertTriangle,
      color: "text-[#EF4444]",
      activeColor: "data-[state=active]:text-[#DC2626]"
    },
    {
      id: "ai-identity",
      title: "AI & Identity",
      icon: Cpu,
      color: "text-[#22C55E]",
      activeColor: "data-[state=active]:text-[#16A34A]"
    }
  ]

  useEffect(() => {
    const fetchVideos = async () => {
      try {
        setIsLoading(true)
        const page = parseInt(searchParams.get('page') || '1')
        const category = searchParams.get('category')
        
        let response
        if (category) {
          response = await getVideosByCategory(category, page)
          setActiveTab(category)
        } else {
          response = await getVideos(page)
          setActiveTab("all")
        }
        
        setVideos(response.videos)
        setCurrentPage(response.currentPage)
        setTotalPages(response.totalPages)
      } catch (error) {
        console.error('Error fetching videos:', error)
      } finally {
        setIsLoading(false)
      }
    }

    fetchVideos()
  }, [searchParams])

  const handlePageChange = (newPage: number) => {
    const category = searchParams.get('category')
    if (category) {
      router.push(`/videos?category=${category}&page=${newPage}`)
    } else {
      router.push(`/videos?page=${newPage}`)
    }
  }

  const handleTabChange = (value: string) => {
    if (value === "all") {
      router.push("/videos")
    } else {
      router.push(`/videos?category=${value}`)
    }
  }

  return (
    <div className="min-h-screen bg-[#0A0A1B] bg-[radial-gradient(ellipse_80%_80%_at_50%_-20%,rgba(120,119,198,0.3),rgba(255,255,255,0))]">
      <div className="container py-24">
        <div className="max-w-7xl mx-auto">
          <Tabs value={activeTab} onValueChange={handleTabChange} className="mb-12">
            <TabsList className="bg-[#0A0A1B]/50 backdrop-blur-sm border border-gray-800 p-1 mb-8">
              {categories.map((category) => {
                const Icon = category.icon
                return (
                  <TabsTrigger 
                    key={category.id} 
                    value={category.id}
                    className={`${category.color || 'text-gray-400'} ${category.activeColor || 'data-[state=active]:text-white'} data-[state=active]:bg-white/10`}
                  >
                    {Icon && <Icon className="w-4 h-4 mr-2" />}
                    {category.title}
                  </TabsTrigger>
                )
              })}
            </TabsList>

            {categories.map((category) => (
              <TabsContent key={category.id} value={category.id}>
                {renderVideoGrid()}
              </TabsContent>
            ))}
          </Tabs>
        </div>
      </div>
    </div>
  )

  function renderVideoGrid() {
    return (
      <>
        {isLoading ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {Array.from({ length: 6 }).map((_, i) => (
              <div key={i} className="animate-pulse bg-[#0A0A1B]/50 backdrop-blur-sm rounded-lg overflow-hidden">
                <div className="aspect-video bg-[#1A1A2E]" />
                <div className="p-4">
                  <div className="h-4 bg-[#1A1A2E] rounded w-3/4 mb-2" />
                  <div className="h-4 bg-[#1A1A2E] rounded w-1/2" />
                </div>
              </div>
            ))}
          </div>
        ) : videos.length > 0 ? (
          <>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
              {videos.map((video) => (
                <VideoCard key={video.id} video={video} />
              ))}
            </div>

            <div className="flex justify-center gap-2">
              <Button
                variant="outline"
                onClick={() => handlePageChange(currentPage - 1)}
                disabled={currentPage === 1}
                className="bg-[#0A0A1B]/50 border-gray-800 text-white hover:bg-white/10"
              >
                <ChevronLeft className="h-4 w-4 mr-2" />
                {t("common.previous")}
              </Button>
              <Button
                variant="outline"
                onClick={() => handlePageChange(currentPage + 1)}
                disabled={currentPage === totalPages}
                className="bg-[#0A0A1B]/50 border-gray-800 text-white hover:bg-white/10"
              >
                {t("common.next")}
                <ChevronRight className="h-4 w-4 ml-2" />
              </Button>
            </div>
          </>
        ) : (
          <div className="text-center py-12 bg-[#0A0A1B]/50 backdrop-blur-sm rounded-lg">
            <p className="text-gray-400">{t("videos.no_videos")}</p>
          </div>
        )}
      </>
    )
  }
} 