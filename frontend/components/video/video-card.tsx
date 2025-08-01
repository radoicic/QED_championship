"use client"

import type React from "react"

import { useState } from "react"
import Image from "next/image"
import Link from "next/link"
import { Play, ThumbsUp } from "lucide-react"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardFooter } from "@/components/ui/card"
import { useLanguage } from "@/lib/language-provider"
import EnhancedVideoPlayer from "@/components/video/enhanced-video-player"
import { cn } from "@/lib/utils"

interface VideoCardProps {
  video: {
    id: string
    title: string
    description: string
    thumbnail: string
    videoUrl: string
    category: string
    votes: number
    duration: string
  }
  showVoteButton?: boolean
  onVoteClick?: () => void
}

export default function VideoCard({ video, showVoteButton = false, onVoteClick }: VideoCardProps) {
  const { t } = useLanguage()
  const [isPlaying, setIsPlaying] = useState(false)

  const handlePlayClick = (e: React.MouseEvent) => {
    e.preventDefault()
    setIsPlaying(true)
  }

  const handleVoteClick = (e: React.MouseEvent) => {
    e.preventDefault()
    e.stopPropagation()
    if (onVoteClick) {
      onVoteClick()
    }
  }

  // Get color class based on category
  const getCategoryColor = (category: string) => {
    const categoryMap: Record<string, string> = {
      narrative: "blue",
      documentary: "orange", 
      experimental: "purple",
      animation: "yellow",
      dystopian: "red",
      ai: "green"
    }
    
    const categoryKey = category.toLowerCase().replace(/[\s&]+/g, '')
    return categoryMap[categoryKey] || "blue"
  }
  
  const categoryColor = getCategoryColor(video.category)

  return (
    <div className="relative group hover:scale-[1.02] transition-all duration-500">
      {/* Animated border container */}
      <div className="absolute -inset-0.5 bg-transparent rounded-xl z-0 overflow-hidden opacity-0 group-hover:opacity-100 transition-opacity duration-500">
        <div 
          className="absolute top-[-50%] left-[-50%] right-[-50%] bottom-[-50%] animate-spin-slow"
          style={{
            background: `conic-gradient(from 0deg, rgb(var(--${categoryColor}-rgb)), rgb(139, 92, 246), rgb(217, 70, 239), rgb(var(--${categoryColor}-rgb)))`
          }}
        ></div>
      </div>
      
      <Card className="overflow-hidden relative z-10 border-slate-700/50 bg-slate-900/80 backdrop-blur-md group-hover:bg-slate-900/90 transition-colors duration-500">
        <div className="relative aspect-video">
          {isPlaying ? (
            <EnhancedVideoPlayer
              videoUrl={video.videoUrl}
              poster={video.thumbnail}
              onClose={() => setIsPlaying(false)}
              autoplay={true}
            />
          ) : (
            <>
              <Link href={`/videos/${video.id}`}>
                <Image
                  src={video.thumbnail || "/placeholder.svg?height=720&width=1280"}
                  alt={video.title}
                  fill
                  className="object-cover"
                />
                <div className="absolute inset-0 bg-black/30 flex items-center justify-center group-hover:bg-black/40 transition-colors duration-300">
                  <Button
                    variant="ghost"
                    size="icon"
                    className="rounded-full bg-black/50 hover:bg-black/70 text-white h-12 w-12 transform scale-90 group-hover:scale-100 transition-transform duration-300"
                    onClick={handlePlayClick}
                  >
                    <Play className="h-6 w-6" />
                    <span className="sr-only">{t("video.play")}</span>
                  </Button>
                </div>
                <div className="absolute bottom-2 right-2 bg-black/70 text-white text-xs px-2 py-1 rounded">
                  {video.duration}
                </div>
              </Link>
            </>
          )}
        </div>

        <CardContent className="p-4 group-hover:bg-slate-900/90 transition-colors duration-300">
          <div className="flex justify-between items-start gap-2">
            <div>
              <Link href={`/videos/${video.id}`}>
                <h3 className="font-semibold line-clamp-1 text-white group-hover:text-primary transition-colors duration-300">{video.title}</h3>
              </Link>
              <p className="text-sm text-slate-300 line-clamp-2 mt-1">{video.description}</p>
            </div>
            <Badge 
              variant="outline" 
              className={cn(
                "transition-all duration-300",
                `border-${categoryColor}-500/50 text-${categoryColor}-400 group-hover:border-${categoryColor}-400/70 group-hover:text-${categoryColor}-300`
              )}
            >
              {t(`categories.${video.category}`)}
            </Badge>
          </div>
        </CardContent>

        <CardFooter className="p-4 pt-0 flex justify-between items-center">
          <div className="flex items-center gap-1 text-sm text-slate-400 group-hover:text-slate-300 transition-colors duration-300">
            <ThumbsUp className="h-4 w-4" />
            <span>{video.votes}</span>
          </div>

          {showVoteButton && (
            <Button 
              size="sm" 
              className={cn(
                "transition-all duration-300 shadow-sm",
                `bg-${categoryColor}-600 hover:bg-${categoryColor}-500 group-hover:shadow-[0_0_15px_rgba(var(--${categoryColor}-rgb),0.4)]`
              )}
              onClick={handleVoteClick}
            >
              <ThumbsUp className="h-4 w-4 mr-2" />
              {t("video.vote")}
            </Button>
          )}
        </CardFooter>
      </Card>
    </div>
  )
}
