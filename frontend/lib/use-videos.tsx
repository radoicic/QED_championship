"use client"

import { useEffect, useState } from "react"
import { useToast } from "@/components/ui/use-toast"

type Video = {
  id: string
  title: string
  description: string
  thumbnail: string
  videoUrl: string
  category: string
  votes: number
  duration: string
}

export function useVideos() {
  const [videos, setVideos] = useState<Video[]>([])
  const [featuredVideos, setFeaturedVideos] = useState<Video[]>([])
  const [isLoading, setIsLoading] = useState(true)
  const { toast } = useToast()

  useEffect(() => {
    const fetchVideos = async () => {
      // Simulate API call
      await new Promise((resolve) => setTimeout(resolve, 1500))

      // Mock data
      const mockVideos: Video[] = [
        {
          id: "1",
          title: "The Silent Echo",
          description: "A journey through abandoned spaces and the echoes they contain.",
          thumbnail: "/placeholder.svg?height=720&width=1280",
          videoUrl: "https://example.com/videos/silent-echo.mp4",
          category: "documentary",
          votes: 127,
          duration: "12:34",
        },
        {
          id: "2",
          title: "Beyond the Horizon",
          description: "A sci-fi short about discovering new worlds beyond our perception.",
          thumbnail: "/placeholder.svg?height=720&width=1280",
          videoUrl: "https://example.com/videos/beyond-horizon.mp4",
          category: "narrative",
          votes: 89,
          duration: "15:21",
        },
        {
          id: "3",
          title: "Fragments of Memory",
          description: "An experimental film exploring the nature of human memory.",
          thumbnail: "/placeholder.svg?height=720&width=1280",
          videoUrl: "https://example.com/videos/fragments.mp4",
          category: "experimental",
          votes: 64,
          duration: "08:47",
        },
        {
          id: "4",
          title: "The Last Leaf",
          description: "A touching animation about resilience and hope.",
          thumbnail: "/placeholder.svg?height=720&width=1280",
          videoUrl: "https://example.com/videos/last-leaf.mp4",
          category: "animation",
          votes: 152,
          duration: "07:15",
        },
        {
          id: "5",
          title: "Urban Symphony",
          description: "A day in the life of a bustling metropolis, told through sound and visuals.",
          thumbnail: "/placeholder.svg?height=720&width=1280",
          videoUrl: "https://example.com/videos/urban-symphony.mp4",
          category: "documentary",
          votes: 73,
          duration: "18:03",
        },
        {
          id: "6",
          title: "The Encounter",
          description: "A mysterious meeting between strangers changes their lives forever.",
          thumbnail: "/placeholder.svg?height=720&width=1280",
          videoUrl: "https://example.com/videos/encounter.mp4",
          category: "narrative",
          votes: 108,
          duration: "21:42",
        },
      ]

      setVideos(mockVideos)
      setFeaturedVideos(mockVideos.slice(0, 3))
      setIsLoading(false)
    }

    fetchVideos()
  }, [])

  const voteForVideo = async (videoId: string, userId: string) => {
    try {
      // In a real app, you would make an API call to record the vote
      // For now, we'll update the state locally

      // Make a copy of the videos array
      const updatedVideos = videos.map((video) => {
        if (video.id === videoId) {
          // Increment the vote count
          return { ...video, votes: video.votes + 1 }
        }
        return video
      })

      // Update both videos and featuredVideos
      setVideos(updatedVideos)
      setFeaturedVideos(updatedVideos.slice(0, 3))

      // Simulate API call to backend
      await new Promise((resolve) => setTimeout(resolve, 500))

      return true
    } catch (error) {
      console.error("Error voting for video:", error)
      toast({
        title: "Vote Failed",
        description: "There was an error recording your vote.",
        variant: "destructive",
      })
      throw error
    }
  }

  return { videos, featuredVideos, isLoading, voteForVideo }
}
