"use client"

import { useEffect, useState } from "react"
import { useParams, useRouter } from "next/navigation"
import Image from "next/image"
import Link from "next/link"
import dynamic from "next/dynamic"
import { Calendar, ChevronLeft, Clock, Download, Share2, ThumbsUp, User } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Skeleton } from "@/components/ui/skeleton"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { useToast } from "@/components/ui/use-toast"
import { useLanguage } from "@/lib/language-provider"
import { useAuth } from "@/lib/auth-provider"
import BuyVotesDialog from "@/components/voting/buy-votes-dialog"
import LoginDialog from "@/components/auth/login-dialog"
import { getVideoById, voteForVideo } from "@/lib/services/video-service"
import { Video } from "@/lib/services/video-service"

// Import video player with no SSR to avoid document/window references during server rendering
const EnhancedVideoPlayer = dynamic(() => import("@/components/video/enhanced-video-player"), { ssr: false })

export default function VideoDetailPage() {
  const params = useParams()
  const router = useRouter()
  const { t } = useLanguage()
  const { user, updateUser, canVoteThisWeek, addVotingPoints } = useAuth()
  const { toast } = useToast()
  const [video, setVideo] = useState<Video | null>(null)
  const [isLoading, setIsLoading] = useState(true)
  const [showLoginDialog, setShowLoginDialog] = useState(false)
  const [showBuyVotesDialog, setShowBuyVotesDialog] = useState(false)

  useEffect(() => {
    const fetchVideo = async () => {
      setIsLoading(true)

      try {
        const videoId = typeof params.id === "string" ? params.id : Array.isArray(params.id) ? params.id[0] : ""
        if (!videoId) {
          throw new Error("Invalid video ID")
        }

        const fetchedVideo = await getVideoById(videoId)
        setVideo(fetchedVideo)
      } catch (error) {
        console.error("Error fetching video:", error)
        toast({
          title: t("video.error.title"),
          description: t("video.error.description"),
          variant: "destructive",
        })
      } finally {
        setIsLoading(false)
      }
    }

    if (params.id) {
      fetchVideo()
    }
  }, [params.id, toast, t])

  const handleVoteClick = async () => {
    if (!user) {
      setShowLoginDialog(true)
      return
    }

    // Check if user has the correct role - only "user" role can vote
    if (user.role !== "user") {
      toast({
        title: t("voting.restricted.title"),
        description: t("voting.restricted.description"),
        variant: "destructive",
      })
      return
    }

    // Check if user can vote this week
    if (!canVoteThisWeek()) {
      toast({
        title: t("voting.limit.title"),
        description: t("voting.limit.description"),
        variant: "destructive",
      })
      return
    }

    // Check if user has votes available
    if ((user.votes || 0) > 0) {
      try {
        if (video) {
          await voteForVideo(video.id, user.id)

          // Update the local video state to reflect the vote
          setVideo({
            ...video,
            votes: (video.votes || 0) + 1,
          })

          // Update the user's vote count and last voted timestamp
          await updateUser({
            ...user,
            votes: (user.votes || 0) - 1,
            lastVotedAt: new Date().toISOString(),
          })

          // Add points for voting
          await addVotingPoints(10)

          toast({
            title: t("voting.success.title"),
            description: t("voting.success.description"),
          })
        }
      } catch (error) {
        toast({
          title: t("voting.error.title"),
          description: t("voting.error.description"),
          variant: "destructive",
        })
      }
    } else {
      setShowBuyVotesDialog(true)
    }
  }

  const handleAfterPurchase = () => {
    if (video && user && (user.votes || 0) > 0) {
      handleVoteClick()
    }
  }

  const handleDownloadScript = () => {
    if (video?.scriptUrl) {
      window.open(video.scriptUrl, '_blank')
    } else {
      toast({
        title: t("video.script.error.title"),
        description: t("video.script.error.description"),
        variant: "destructive",
      })
    }
  }

  // Determine if vote button should be shown
  const shouldShowVoteButton = () => {
    if (!user) return true // Show for non-logged in users (will prompt login)
    return user.role === "user" && canVoteThisWeek()
  }

  if (isLoading) {
    return (
      <div className="container py-12">
        <div className="max-w-4xl mx-auto">
          <Skeleton className="h-[600px] w-full rounded-lg mb-6" />
          <Skeleton className="h-10 w-3/4 mb-4" />
          <Skeleton className="h-4 w-full mb-2" />
          <Skeleton className="h-4 w-full mb-2" />
          <Skeleton className="h-4 w-2/3" />
        </div>
      </div>
    )
  }

  if (!video) {
    return (
      <div className="container py-12 text-center">
        <h1 className="text-2xl font-bold mb-4">{t("video.not_found.title")}</h1>
        <p className="text-muted-foreground mb-6">{t("video.not_found.description")}</p>
        <Button asChild>
          <Link href="/">{t("common.return_home")}</Link>
        </Button>
      </div>
    )
  }

  return (
    <div className="container py-12">
      <div className="max-w-4xl mx-auto">
        <div className="mb-6">
          <Button variant="ghost" onClick={() => router.back()} className="mb-4">
            <ChevronLeft className="mr-2 h-4 w-4" />
            {t("common.back")}
          </Button>

          <div className="relative aspect-video rounded-lg overflow-hidden bg-black">
            <EnhancedVideoPlayer
              videoUrl={video.videoUrl}
              poster={video.thumbnail}
            />
          </div>
        </div>

        <div className="flex flex-col md:flex-row justify-between items-start gap-6 mb-8">
          <div className="flex-1">
            <h1 className="text-3xl font-bold mb-2">{video.title}</h1>
            <p className="text-muted-foreground mb-4">{video.description}</p>
            
            <div className="flex flex-wrap gap-4 text-sm text-muted-foreground">
              <div className="flex items-center gap-2">
                <User className="h-4 w-4" />
                <span>{video.uploader?.username || t("video.unknown_uploader")}</span>
              </div>
              <div className="flex items-center gap-2">
                <Calendar className="h-4 w-4" />
                <span>{new Date(video.createdAt || '').toLocaleDateString()}</span>
              </div>
              <div className="flex items-center gap-2">
                <Clock className="h-4 w-4" />
                <span>{video.duration}</span>
              </div>
            </div>
          </div>

          <div className="flex flex-col gap-4">
            <Button
              variant="default"
              size="lg"
              onClick={handleVoteClick}
              disabled={!shouldShowVoteButton()}
              className="gap-2"
            >
              <ThumbsUp className="h-5 w-5" />
              {t("video.vote")} ({video.votes || 0})
            </Button>

            {video.scriptUrl && (
              <Button
                variant="outline"
                size="lg"
                onClick={handleDownloadScript}
                className="gap-2"
              >
                <Download className="h-5 w-5" />
                {t("video.download_script")}
              </Button>
            )}

            <Button variant="outline" size="lg" className="gap-2">
              <Share2 className="h-5 w-5" />
              {t("video.share")}
            </Button>
          </div>
        </div>

        <Tabs defaultValue="details" className="w-full">
          <TabsList className="grid w-full grid-cols-2">
            <TabsTrigger value="details">{t("video.tabs.details")}</TabsTrigger>
            <TabsTrigger value="comments">{t("video.tabs.comments")}</TabsTrigger>
          </TabsList>
          <TabsContent value="details" className="mt-6">
            <div className="space-y-4">
              <div>
                <h3 className="font-semibold mb-2">{t("video.details.category")}</h3>
                <p className="text-muted-foreground">{t(`categories.${video.category}`)}</p>
              </div>
              <div>
                <h3 className="font-semibold mb-2">{t("video.details.uploader")}</h3>
                <p className="text-muted-foreground">{video.uploader?.username || t("video.unknown_uploader")}</p>
              </div>
              <div>
                <h3 className="font-semibold mb-2">{t("video.details.upload_date")}</h3>
                <p className="text-muted-foreground">{new Date(video.createdAt || '').toLocaleDateString()}</p>
              </div>
            </div>
          </TabsContent>
          <TabsContent value="comments" className="mt-6">
            <p className="text-muted-foreground">{t("video.comments.coming_soon")}</p>
          </TabsContent>
        </Tabs>
      </div>

      <LoginDialog open={showLoginDialog} onOpenChange={setShowLoginDialog} />
      <BuyVotesDialog
        open={showBuyVotesDialog}
        onOpenChange={setShowBuyVotesDialog}
        onSuccessfulPurchase={handleAfterPurchase}
      />
    </div>
  )
}
