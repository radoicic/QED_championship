"use client"

import { useEffect, useState } from "react"
import { useRouter } from "next/navigation"
import Image from "next/image"
import { Award, Edit, Star, Trash2, Trophy, TrendingUp } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import { useToast } from "@/components/ui/use-toast"
import { useLanguage } from "@/lib/language-provider"
import { useAuth } from "@/lib/auth-provider"
import { getMyVideos, deleteVideo, updateVideo, Video, VideoUpdateData } from "@/lib/services/video-service"
import { VideoEditForm } from "@/components/video/video-edit-form"
import dynamic from "next/dynamic"

// Dynamically import VideoCard with SSR disabled
const VideoCard = dynamic(() => import("@/components/video/video-card"), { ssr: false })

export default function ProfilePage() {
  const { t } = useLanguage()
  const { user } = useAuth()
  const router = useRouter()
  const { toast } = useToast()
  const [userVideos, setUserVideos] = useState<Video[]>([])
  const [votedVideos, setVotedVideos] = useState<Video[]>([])
  const [isLoading, setIsLoading] = useState(true)
  const [editingVideo, setEditingVideo] = useState<Video | null>(null);
  const [isEditing, setIsEditing] = useState(false);

  // Redirect if not logged in
  useEffect(() => {
    if (!user) {
      router.push("/")
    }
  }, [user, router])

  useEffect(() => {
    const fetchUserVideos = async () => {
    if (user) {
        try {
          const videos = await getMyVideos(user.id)
          setUserVideos(videos)
        } catch (error) {
          console.error('Error fetching user videos:', error)
          toast({
            title: t("profile.error_fetching_videos"),
            description: t("profile.error_fetching_videos_desc"),
            variant: "destructive"
          })
        } finally {
          setIsLoading(false)
        }
      }
    }

    fetchUserVideos()
  }, [user, toast, t])

  useEffect(() => {
    const fetchVotedVideos = async () => {
      if (user) {
        try {
          // TODO: Implement getVotedVideos in video service
          // For now, we'll use the same videos as user videos
          const videos = await getMyVideos(user.id)
          setVotedVideos(videos)
        } catch (error) {
          console.error('Error fetching voted videos:', error)
          toast({
            title: t("profile.error_fetching_voted_videos"),
            description: t("profile.error_fetching_voted_videos_desc"),
            variant: "destructive"
          })
    }
      }
    }

    fetchVotedVideos()
  }, [user, toast, t])

  if (!user) {
    return null
  }

  const handleDeleteVideo = async (videoId: string) => {
    try {
      await deleteVideo(videoId)
    setUserVideos(userVideos.filter((video) => video.id !== videoId))
      toast({
        title: t("profile.video_deleted"),
        description: t("profile.video_deleted_desc"),
      })
    } catch (error) {
      console.error('Error deleting video:', error)
    toast({
        title: t("profile.error_deleting_video"),
        description: t("profile.error_deleting_video_desc"),
        variant: "destructive"
      })
    }
  }

  const handleEditVideo = async (video: Video) => {
    setEditingVideo(video);
    setIsEditing(true);
  };

  const handleUpdateVideo = async (updatedData: VideoUpdateData) => {
    if (!editingVideo) return;

    try {
      const updatedVideo = await updateVideo(editingVideo.id, updatedData);
      
      // Refetch videos to get the latest data
      const videos = await getMyVideos(user.id);
      setUserVideos(videos);
      
      toast({
        title: t("profile.video_updated"),
        description: t("profile.video_updated_desc"),
      });
      setIsEditing(false);
      setEditingVideo(null);
    } catch (error) {
      console.error('Error updating video:', error);
      toast({
        title: t("profile.error_updating_video"),
        description: t("profile.error_updating_video_desc"),
        variant: "destructive"
      });
    }
  };

  // Calculate progress to next level
  const getProgressToNextLevel = () => {
    const pointsForCurrentLevel = (user.level - 1) * 100
    const pointsForNextLevel = user.level * 100
    const pointsNeeded = pointsForNextLevel - pointsForCurrentLevel
    const pointsEarned = user.points - pointsForCurrentLevel

    return Math.round((pointsEarned / pointsNeeded) * 100)
  }

  // Check if user has Super Voter badge
  const hasSuperVoterBadge = user.badges.includes("Super Voter")

  return (
    <div className="container py-12">
      <div className="max-w-4xl mx-auto">
        <div className="flex flex-col md:flex-row gap-8 mb-10">
          <div className="flex-shrink-0">
            <div className="relative h-32 w-32 rounded-full overflow-hidden border-4 border-background shadow-lg">
              <Image
                src={user.avatar || "/hero-bg.png"}
                alt={`${user.name}'s profile picture`}
                fill
                className="object-cover"
              />
            </div>
          </div>

          <div className="flex-grow">
            <div className="flex items-center gap-3 mb-2">
              <h1 className="text-3xl font-bold">{user.name}</h1>
              {hasSuperVoterBadge && (
                <Badge className="bg-primary">
                  <Star className="h-3 w-3 mr-1" />
                  Super Voter
                </Badge>
              )}
            </div>
            <p className="text-muted-foreground mb-4">{user.email}</p>

            <div className="space-y-4 mb-4">
              <div className="flex items-center gap-2">
                <Trophy className="h-5 w-5 text-primary" />
                <div className="flex-1">
                  <div className="flex justify-between">
                    <span className="text-sm font-medium">{t("profile.level", { level: user.level })}</span>
                    <span className="text-sm text-muted-foreground">{t("profile.points", { points: user.points })}</span>
                  </div>
                  <Progress value={getProgressToNextLevel()} className="h-2 mt-1" />
                </div>
              </div>

              <div className="flex items-center gap-2">
                <Award className="h-5 w-5 text-primary" />
                <div>
                  <span className="text-sm font-medium">{t("profile.votes_available", { count: user.votes })}</span>
                  <p className="text-xs text-muted-foreground">{t("profile.total_votes", { count: user.votesUsed })}</p>
                </div>
              </div>
            </div>

            <div className="flex flex-wrap gap-2 mb-4">
              {user.badges.map((badge) => (
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

          <div className="flex-shrink-0 flex flex-col gap-2">
            <Button variant="outline" onClick={() => router.push("/settings")}>
              {t("profile.edit_profile")}
            </Button>

            {user.role === "agent" && (
              <Button onClick={() => router.push("/upload")}>{t("profile.upload_video")}</Button>
            )}

            <Button variant="outline" className="gap-1">
              <TrendingUp className="h-4 w-4" />
              {t("profile.buy_votes")}
            </Button>
          </div>
        </div>

        <Tabs defaultValue={user.role === "agent" ? "my_videos" : "voted_videos"}>
          <TabsList className="mb-6">
            {user.role === "agent" && <TabsTrigger value="my_videos">{t("profile.my_videos")}</TabsTrigger>}
            <TabsTrigger value="voted_videos">{t("profile.voted_videos")}</TabsTrigger>
            <TabsTrigger value="badges">{t("profile.badges")}</TabsTrigger>
          </TabsList>

          {user.role === "agent" && (
            <TabsContent value="my_videos">
              {isLoading ? (
                <div className="text-center py-12">
                  <p className="text-muted-foreground">{t("profile.loading_videos")}</p>
                </div>
              ) : userVideos.length > 0 ? (
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {userVideos.map((video) => (
                    <Card key={video.id}>
                      {isEditing && editingVideo?.id === video.id ? (
                        <CardContent className="p-4">
                          <VideoEditForm
                            video={{
                              title: video.title,
                              description: video.description,
                              category: video.category
                            }}
                            onUpdate={handleUpdateVideo}
                            onCancel={() => {
                              setIsEditing(false);
                              setEditingVideo(null);
                            }}
                          />
                        </CardContent>
                      ) : (
                        <>
                      <CardHeader className="p-0">
                        <div className="relative aspect-video">
                          <Image
                            src={video.thumbnail || "/placeholder.svg?height=720&width=1280"}
                            alt={video.title}
                            fill
                            className="object-cover rounded-t-lg"
                          />
                        </div>
                      </CardHeader>
                      <CardContent className="p-4">
                        <CardTitle className="text-xl mb-1">{video.title}</CardTitle>
                        <CardDescription className="line-clamp-2">{video.description}</CardDescription>
                      </CardContent>
                      <CardFooter className="p-4 pt-0 flex justify-between">
                        <div className="flex items-center gap-1 text-sm text-muted-foreground">
                          <Award className="h-4 w-4" />
                          <span>{video.votes} votes</span>
                        </div>
                        <div className="flex gap-2">
                              <Button 
                                variant="outline" 
                                size="sm"
                                onClick={() => handleEditVideo(video)}
                              >
                            <Edit className="h-4 w-4 mr-1" />
                                {t("profile.edit")}
                          </Button>
                              <Button 
                                variant="destructive" 
                                size="sm" 
                                onClick={() => handleDeleteVideo(video.id)}
                              >
                            <Trash2 className="h-4 w-4 mr-1" />
                                {t("profile.delete")}
                          </Button>
                        </div>
                      </CardFooter>
                        </>
                      )}
                    </Card>
                  ))}
                </div>
              ) : (
                <div className="text-center py-12 bg-muted/30 rounded-lg">
                  <p className="text-muted-foreground mb-4">{t("profile.no_videos")}</p>
                  <Button onClick={() => router.push("/upload")}>{t("profile.upload_first_video")}</Button>
                </div>
              )}
            </TabsContent>
          )}

          <TabsContent value="voted_videos">
            {votedVideos.length > 0 ? (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {votedVideos.map((video: Video) => (
                  <VideoCard key={video.id} video={video} />
                ))}
              </div>
            ) : (
              <div className="text-center py-12 bg-muted/30 rounded-lg">
                <p className="text-muted-foreground">{t("profile.no_voted_videos")}</p>
              </div>
            )}
          </TabsContent>

          <TabsContent value="badges">
            <div className="bg-muted/30 rounded-lg p-6">
              <h2 className="text-xl font-bold mb-6">{t("profile.badges")}</h2>

              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
                {user.badges.map((badge) => (
                  <Card key={badge} className={badge === "Super Voter" ? "border-primary" : ""}>
                    <CardHeader className="pb-2">
                      <div className="flex items-center gap-2">
                        {badge === "Super Voter" ? (
                          <Star className="h-5 w-5 text-primary" />
                        ) : badge.includes("Votes") ? (
                          <Award className="h-5 w-5 text-primary" />
                        ) : (
                          <Trophy className="h-5 w-5 text-primary" />
                        )}
                        <CardTitle className="text-lg">{badge}</CardTitle>
                      </div>
                    </CardHeader>
                    <CardContent>
                      <p className="text-sm text-muted-foreground">
                        {badge === "Super Voter"
                          ? t("profile.badge_super_voter")
                          : badge === "Regular Voter"
                            ? t("profile.badge_regular_voter")
                            : badge === "10 Votes"
                              ? t("profile.badge_10_votes")
                              : badge === "50 Votes"
                                ? t("profile.badge_50_votes")
                                : badge === "100 Votes"
                                  ? t("profile.badge_100_votes")
                                  : badge === "Newcomer"
                                    ? t("profile.badge_newcomer")
                                    : badge === "Early Supporter"
                                      ? t("profile.badge_early_supporter")
                                      : t("profile.badge_default")}
                      </p>
                    </CardContent>
                  </Card>
                ))}

                {/* Locked badges */}
                {!user.badges.includes("50 Votes") && (
                  <Card className="border-dashed opacity-70">
                    <CardHeader className="pb-2">
                      <div className="flex items-center gap-2">
                        <Award className="h-5 w-5 text-muted-foreground" />
                        <CardTitle className="text-lg text-muted-foreground">50 Votes</CardTitle>
                      </div>
                    </CardHeader>
                    <CardContent>
                      <p className="text-sm text-muted-foreground">
                        {t("profile.unlock_50_votes", { current: user.votesUsed })}
                      </p>
                    </CardContent>
                  </Card>
                )}

                {!user.badges.includes("Super Voter") && (
                  <Card className="border-dashed opacity-70">
                    <CardHeader className="pb-2">
                      <div className="flex items-center gap-2">
                        <Star className="h-5 w-5 text-muted-foreground" />
                        <CardTitle className="text-lg text-muted-foreground">Super Voter</CardTitle>
                      </div>
                    </CardHeader>
                    <CardContent>
                      <p className="text-sm text-muted-foreground">
                        {t("profile.unlock_super_voter", { current: user.level })}
                      </p>
                    </CardContent>
                  </Card>
                )}
              </div>
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  )
}
