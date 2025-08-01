"use client"

import { useState, useEffect } from "react"
import { Award, Gift, Star, TrendingUp, Trophy } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Progress } from "@/components/ui/progress"
import { Badge } from "@/components/ui/badge"
import { useLanguage } from "@/lib/language-provider"
import { useAuth } from "@/lib/auth-provider"
import { getFeaturedVideos, voteForVideo } from "@/lib/services/video-service"
import VideoCard from "@/components/video/video-card"
import LoginDialog from "@/components/auth/login-dialog"
import BuyVotesDialog from "@/components/voting/buy-votes-dialog"
import Image from "next/image"
import { useRouter } from "next/navigation"
import { Video } from "@/lib/services/video-service"
import { useSnackbar } from 'notistack'

export default function VotingSection() {
  const { t } = useLanguage()
  const { user, updateUser, canVoteThisWeek, addVotingPoints } = useAuth()
  const { enqueueSnackbar } = useSnackbar()
  const [featuredVideos, setFeaturedVideos] = useState<Video[]>([])
  const [isLoading, setIsLoading] = useState(true)
  const [showLoginDialog, setShowLoginDialog] = useState(false)
  const [showBuyVotesDialog, setShowBuyVotesDialog] = useState(false)
  const [votingVideoId, setVotingVideoId] = useState<string | null>(null)
  const router = useRouter()

  useEffect(() => {
    const fetchFeaturedVideos = async () => {
      try {
        setIsLoading(true)
        const videos = await getFeaturedVideos()
        setFeaturedVideos(videos)
      } catch (error) {
        console.error('Error fetching featured videos:', error)
        enqueueSnackbar(t("voting.fetch_error"), {
          variant: "error",
          autoHideDuration: 2000
        })
      } finally {
        setIsLoading(false)
      }
    }

    fetchFeaturedVideos()
  }, [t, enqueueSnackbar])

  const handleVoteClick = (videoId: string) => {
    if (!user) {
      setShowLoginDialog(true)
      return
    }

    // Check if user has the correct role - only "user" role can vote
    if (user.role !== "user") {
      enqueueSnackbar("Only regular users can vote on films. Filmmakers and agents cannot vote.", {
        variant: "error",
        autoHideDuration: 2000
      })
      return
    }

    // Check if user can vote this week
    if (!canVoteThisWeek()) {
      enqueueSnackbar("You've already used your weekly vote. Purchase extra votes or wait until next week.", {
        variant: "error",
        autoHideDuration: 2000
      })
      return
    }

    // Check if user has votes available
    if ((user.votes || 0) > 0) {
      submitVote(videoId)
    } else {
      setVotingVideoId(videoId)
      setShowBuyVotesDialog(true)
    }
  }

  const submitVote = async (videoId: string) => {
    try {
      if (!user) return

      // Call the vote function from video service
      await voteForVideo(videoId, user.id)

      // Update the user's vote count and last voted timestamp
      await updateUser({
        ...user,
        votes: (user.votes || 0) - 1,
        lastVotedAt: new Date().toISOString(),
      })

      // Add points for voting
      await addVotingPoints(10)

      // Update the featured videos list to reflect the new vote
      const updatedVideos = featuredVideos.map(video => {
        if (video.id === videoId) {
          return {
            ...video,
            votes: (video.votes || 0) + 1
          }
        }
        return video
      })
      setFeaturedVideos(updatedVideos)

      enqueueSnackbar(t("voting.vote_success"), {
        variant: "success",
        autoHideDuration: 2000
      })
    } catch (error) {
      enqueueSnackbar(t("voting.vote_error"), {
        variant: "error",
        autoHideDuration: 2000
      })
    }
  }

  const handleAfterPurchase = () => {
    if (votingVideoId && user && (user.votes || 0) > 0) {
      submitVote(votingVideoId)
      setVotingVideoId(null)
    }
  }

  // Calculate progress to next level
  const getProgressToNextLevel = () => {
    if (!user) return 0

    const pointsForCurrentLevel = (user.level - 1) * 100
    const pointsForNextLevel = user.level * 100
    const pointsNeeded = pointsForNextLevel - pointsForCurrentLevel
    const pointsEarned = user.points - pointsForCurrentLevel

    return Math.round((pointsEarned / pointsNeeded) * 100)
  }

  // Check if user has Super Voter badge
  const hasSuperVoterBadge = user?.badges?.includes("Super Voter") || false

  // Determine if vote button should be shown
  const shouldShowVoteButton = (user: any) => {
    return user?.role === "user" && canVoteThisWeek()
  }

  return (
    <section id="vote" className="relative w-full py-20 overflow-hidden">
      {/* Background image */}
      <div className="absolute inset-0 -z-10">
        {/* Semi-transparent overlay for better readability */}
        <div className="absolute inset-0 bg-black/60 z-10"></div>
        <div className="absolute inset-0">
          <Image 
            src="/bg1.png" 
            alt="Voting background" 
            fill 
            className="object-cover"
            priority
          />
        </div>
      </div>

      <div className="container">
        <div className="max-w-2xl mx-auto text-center mb-12">
          <h2 className="text-3xl font-bold tracking-tight mb-4 text-white">{t("voting.title")}</h2>
          <p className="text-slate-300">{t("voting.subtitle")}</p>
        </div>

        {user && (
          <div className="mb-8">
            <div className="bg-slate-900/70 backdrop-blur-sm border border-slate-700/50 rounded-lg p-6">
              <div className="flex flex-col md:flex-row justify-between items-center gap-4 mb-6">
                <div className="flex items-center gap-3">
                  <div className="bg-primary/10 p-3 rounded-full">
                    <Trophy className="h-6 w-6 text-primary" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-white">Level {user.level} Voter</h3>
                    <p className="text-sm text-slate-300">
                      {user.points} points • {user.votesUsed} votes cast
                    </p>
                  </div>
                </div>

                <div className="flex flex-wrap gap-2">
                  {user.badges?.map((badge) => (
                    <Badge
                      key={badge}
                      variant={badge === "Super Voter" ? "default" : "outline"}
                      className={badge === "Super Voter" ? "bg-primary" : ""}
                    >
                      {badge === "Super Voter" && <Star className="h-3 w-3 mr-1" />}
                      {badge}
                    </Badge>
                  ))}
                </div>
              </div>

              <div className="space-y-2 mb-6">
                <div className="flex justify-between text-sm text-slate-200">
                  <span>Progress to Level {user.level + 1}</span>
                  <span>{getProgressToNextLevel()}%</span>
                </div>
                <Progress value={getProgressToNextLevel()} className="h-2" />
              </div>

              <div className="flex flex-col sm:flex-row gap-4 justify-between items-center">
                <div className="flex items-center gap-2 text-slate-200">
                  <Award className="h-5 w-5 text-primary" />
                  <p>{user.votes > 0 ? `${user.votes} votes available` : "No votes available"}</p>
                  {!canVoteThisWeek() && user.votes > 0 && (
                    <Badge variant="outline" className="ml-2">
                      Weekly limit reached
                    </Badge>
                  )}
                </div>

                <div className="flex gap-2">
                  {hasSuperVoterBadge && (
                    <Button variant="outline" size="sm" className="gap-1 bg-slate-800/70 text-white border-slate-600 hover:bg-slate-700">
                      <Gift className="h-4 w-4" />
                      Claim Reward
                    </Button>
                  )}
                  {user.role === "user" && (
                    <Button variant="outline" size="sm" onClick={() => setShowBuyVotesDialog(true)} className="gap-1 bg-slate-800/70 text-white border-slate-600 hover:bg-slate-700">
                      <TrendingUp className="h-4 w-4" />
                      Buy Extra Votes
                    </Button>
                  )}
                </div>
              </div>
            </div>
          </div>
        )}

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8 mx-8">
          {isLoading ? (
            Array.from({ length: 3 }).map((_, i) => (
              <Card key={i} className="overflow-hidden bg-slate-900/70 backdrop-blur-sm border-slate-700/50">
                <CardContent className="p-0">
                  <div className="h-48 bg-slate-800 animate-pulse" />
                  <div className="p-4 space-y-2">
                    <div className="h-4 bg-slate-800 animate-pulse rounded" />
                    <div className="h-3 bg-slate-800 animate-pulse rounded w-2/3" />
                  </div>
                </CardContent>
              </Card>
            ))
          ) : featuredVideos.length > 0 ? (
            featuredVideos.map((video) => (
              <VideoCard
                key={video.id}
                video={video}
                showVoteButton={user ? user.role === "user" && canVoteThisWeek() : false}
                onVoteClick={() => handleVoteClick(video.id)}
              />
            ))
          ) : (
            <div className="col-span-full text-center py-12 text-white">
              <p className="text-slate-300">{t("voting.no_videos")}</p>
            </div>
          )}
        </div>

        <div className="text-center">
          <Button variant="outline" size="lg" onClick={() => router.push("/videos")} className="bg-slate-800/70 text-white border-slate-600 hover:bg-slate-700">
            {t("voting.view_all")}
          </Button>
        </div>
      </div>

      <LoginDialog open={showLoginDialog} onOpenChange={setShowLoginDialog} />
      <BuyVotesDialog
        open={showBuyVotesDialog}
        onOpenChange={setShowBuyVotesDialog}
        onSuccessfulPurchase={handleAfterPurchase}
      />
    </section>
  )
}
