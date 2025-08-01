"use client"

import { useEffect, useRef, useState } from "react"
import Plyr from "plyr"
import "plyr/dist/plyr.css"
import { X } from "lucide-react"
import { Button } from "@/components/ui/button"

interface EnhancedVideoPlayerProps {
  videoUrl: string
  poster?: string
  onClose?: () => void
  autoplay?: boolean
}

export default function EnhancedVideoPlayer({ videoUrl, poster, onClose, autoplay = false }: EnhancedVideoPlayerProps) {
  const videoRef = useRef<HTMLVideoElement>(null)
  const playerRef = useRef<Plyr | null>(null)
  const [isFullscreen, setIsFullscreen] = useState(false)

  useEffect(() => {
    if (typeof window === 'undefined' || !videoRef.current) return
    
    // Initialize Plyr
    const player = new Plyr(videoRef.current, {
      controls: [
        "play-large",
        "play",
        "progress",
        "current-time",
        "mute",
        "volume",
        "captions",
        "settings",
        "pip",
        "airplay",
        "fullscreen",
      ],
      ratio: "16:9",
      seekTime: 10,
      tooltips: { controls: true, seek: true },
      captions: { active: true, language: "auto", update: true },
    })

    playerRef.current = player

    // Handle fullscreen changes
    const handleFullscreenChange = () => {
      if (typeof document !== 'undefined') {
        setIsFullscreen(!!document.fullscreenElement)
      }
    }

    if (typeof document !== 'undefined') {
      document.addEventListener("fullscreenchange", handleFullscreenChange)
    }

    // Handle keyboard events
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape" && !isFullscreen && onClose) {
        onClose()
      }
    }

    if (typeof window !== 'undefined') {
      window.addEventListener("keydown", handleKeyDown)
    }

    // Autoplay if specified
    if (autoplay && videoRef.current) {
      videoRef.current.play().catch((error) => {
        console.error("Error playing video:", error)
      })
    }

    return () => {
      if (playerRef.current) {
        playerRef.current.destroy()
      }
      if (typeof document !== 'undefined') {
        document.removeEventListener("fullscreenchange", handleFullscreenChange)
      }
      if (typeof window !== 'undefined') {
        window.removeEventListener("keydown", handleKeyDown)
      }
    }
  }, [autoplay, isFullscreen, onClose])

  return (
    <div className="relative w-full h-full bg-black">
      <video ref={videoRef} className="plyr-react plyr" poster={poster} controls crossOrigin="anonymous">
        <source src={videoUrl} type="video/mp4" />
        <track kind="captions" label="English" srcLang="en" src="" default />
        Your browser does not support the video tag.
      </video>

      {onClose && !isFullscreen && (
        <Button
          variant="ghost"
          size="icon"
          className="absolute top-2 right-2 bg-black/50 hover:bg-black/70 text-white rounded-full h-8 w-8 z-10"
          onClick={onClose}
        >
          <X className="h-4 w-4" />
          <span className="sr-only">Close</span>
        </Button>
      )}
    </div>
  )
}
