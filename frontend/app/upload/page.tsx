"use client"

import type React from "react"

import { useState, useRef } from "react"
import { useRouter } from "next/navigation"
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import { z } from "zod"
import { AlertCircle, FileText, Loader2, Upload, Video } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Textarea } from "@/components/ui/textarea"
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert"
import { useToast } from "@/components/ui/use-toast"
import { useLanguage } from "@/lib/language-provider"
import { useAuth } from "@/lib/auth-provider"
import { Progress } from "@/components/ui/progress"
import ClientWrapper from "@/components/client-wrapper"
import { uploadVideo, VideoUploadData } from "@/lib/services/video-service"
import { useSnackbar } from 'notistack'
import Image from "next/image"

const MAX_VIDEO_SIZE = 500 * 1024 * 1024 // 500MB in bytes
const MAX_PDF_SIZE = 5 * 1024 * 1024 // 5MB in bytes

function UploadPageContent() {
  const { t } = useLanguage()
  const { user } = useAuth()
  const router = useRouter()
  const { toast } = useToast()
  const { enqueueSnackbar } = useSnackbar()
  const [isUploading, setIsUploading] = useState(false)
  const [uploadProgress, setUploadProgress] = useState(0)
  const [videoError, setVideoError] = useState<string | null>(null)
  const videoRef = useRef<HTMLVideoElement>(null)
  const [videoDuration, setVideoDuration] = useState<string>("")

  const formSchema = z.object({
    title: z.string().min(2, t("upload.validation.title_min")).max(100, t("upload.validation.title_max")),
    description: z.string().max(500, t("upload.validation.description_max")),
    category: z.string().min(1, t("upload.validation.category_required")),
    duration: z.string().min(1, t("upload.validation.duration_required")),
    videoFile: z
      .any()
      .refine((file) => file, "upload.validation.video_required")
      .refine((file) => file?.size <= MAX_VIDEO_SIZE, "upload.validation.video_size")
      .refine((file) => file?.type === "video/mp4", "upload.validation.video_format"),
    scriptFile: z
      .any()
      .refine((file) => file, "upload.validation.script_required")
      .refine((file) => file?.size <= MAX_PDF_SIZE, "upload.validation.script_size")
      .refine((file) => file?.type === "application/pdf", "upload.validation.script_format"),
    thumbnailFile: z
      .any()
      .optional()
      .refine((file) => !file || file?.type.startsWith("image/"), "upload.validation.thumbnail_format"),
  })
  
  type FormValues = z.infer<typeof formSchema>

  const form = useForm<FormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      title: "",
      description: "",
      category: "",
      duration: "",
    },
  })

  // Redirect if not logged in or not an agent
  if (!user || user.role !== "agent") {
    router.push("/")
    return null
  }

  const formatDuration = (seconds: number): string => {
    const hours = Math.floor(seconds / 3600)
    const minutes = Math.floor((seconds % 3600) / 60)
    const remainingSeconds = Math.floor(seconds % 60)

    if (hours > 0) {
      return `${hours.toString().padStart(2, '0')}:${minutes.toString().padStart(2, '0')}:${remainingSeconds.toString().padStart(2, '0')}`
    }
    return `${minutes.toString().padStart(2, '0')}:${remainingSeconds.toString().padStart(2, '0')}`
  }

  const checkVideoResolution = (file: File): Promise<boolean> => {
    return new Promise((resolve) => {
      if (typeof document === 'undefined') {
        resolve(true)
        return
      }
      
      const video = document.createElement("video")
      video.preload = "metadata"

      video.onloadedmetadata = () => {
        URL.revokeObjectURL(video.src)

        const isValidResolution = video.videoWidth >= 1280 && video.videoHeight >= 720
        const aspectRatio = video.videoWidth / video.videoHeight
        const isValidAspectRatio = Math.abs(aspectRatio - 16 / 9) < 0.1

        // if (!isValidResolution) {
        //   setVideoError(t("upload.validation.video_resolution"))
        //   resolve(false)
        // } else if (!isValidAspectRatio) {
        //   setVideoError(t("upload.validation.video_aspect_ratio"))
        //   resolve(false)
        // } else 
        {
          setVideoError(null)
          resolve(true)
        }
      }

      video.onerror = () => {
        setVideoError(t("upload.validation.video_error"))
        resolve(false)
      }

      video.src = URL.createObjectURL(file)
    })
  }

  const handleVideoChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (file) {
      form.setValue("videoFile", file)

      const isValid = await checkVideoResolution(file)
      if (!isValid) {
        form.setError("videoFile", {
          type: "manual",
          message: videoError || t("upload.validation.video_error"),
        })
      }
    }
  }

  const simulateUpload = () => {
    let progress = 0
    const interval = setInterval(() => {
      progress += Math.random() * 10
      if (progress > 100) {
        progress = 100
        clearInterval(interval)
      }
      setUploadProgress(progress)
    }, 300)

    return new Promise<void>((resolve) => {
      setTimeout(() => {
        clearInterval(interval)
        setUploadProgress(100)
        resolve()
      }, 3000)
    })
  }

  const onSubmit = async (values: FormValues) => {
    setIsUploading(true)
    setUploadProgress(0)

    try {
      const uploadData: VideoUploadData = {
        title: values.title,
        description: values.description,
        category: values.category,
        duration: values.duration,
        video: values.videoFile,
        script: values.scriptFile,
        thumbnail: values.thumbnailFile
      }

      await uploadVideo(uploadData, (progress) => {
        setUploadProgress(progress)
        if (progress === 100) {
          enqueueSnackbar(t("upload.success.title"), {
            variant: "success",
            autoHideDuration: 2000
          })
        }
      })

      router.push("/profile")
    } catch (error) {
      console.error('Upload error:', error)
      enqueueSnackbar(
        error instanceof Error ? error.message : t("upload.error.description"),
        { variant: "error", autoHideDuration: 2000 }
      )
    } finally {
      setIsUploading(false)
    }
  }

  return (
    <div className="relative min-h-screen bg-[#0A0A1B]">
      {/* Background image using CSS */}
      <div 
        className="absolute inset-0 -z-10 bg-cover bg-center bg-no-repeat opacity-60"
        style={{
          backgroundImage: 'url(/bg.png)',
        }}
        onError={() => {
          console.error('Failed to load upload background image');
        }}
      />
      
      <div className="container py-12 relative z-10">
        <div className="max-w-2xl mx-auto">
          <div className="text-center mb-8">
            <h1 className="text-3xl font-bold mb-2">{t("upload.title")}</h1>
            <p className="text-muted-foreground">{t("upload.description")}</p>
          </div>

          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
              <FormField
                control={form.control}
                name="title"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>{t("upload.form.title")}</FormLabel>
                    <FormControl>
                      <Input placeholder={t("upload.form.title_placeholder")} {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="description"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>{t("upload.form.description")}</FormLabel>
                    <FormControl>
                      <Textarea 
                        placeholder={t("upload.form.description_placeholder")} 
                        className="min-h-[100px]" 
                        {...field} 
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <FormField
                  control={form.control}
                  name="category"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>{t("upload.form.category")}</FormLabel>
                      <Select onValueChange={field.onChange} defaultValue={field.value}>
                        <FormControl>
                          <SelectTrigger>
                            <SelectValue placeholder={t("upload.form.category_placeholder")} />
                          </SelectTrigger>
                        </FormControl>
                        <SelectContent>
                          <SelectItem value="narrative">{t("upload.categories.narrative")}</SelectItem>
                          <SelectItem value="documentary">{t("upload.categories.documentary")}</SelectItem>
                          <SelectItem value="experimental">{t("upload.categories.experimental")}</SelectItem>
                          <SelectItem value="animation">{t("upload.categories.animation")}</SelectItem>
                          <SelectItem value="dystopian">{t("upload.categories.dystopian")}</SelectItem>
                          <SelectItem value="ai-identity">{t("upload.categories.ai_identity")}</SelectItem>
                        </SelectContent>
                      </Select>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="duration"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>{t("upload.form.duration")}</FormLabel>
                      <FormControl>
                        <Input 
                          placeholder="MM:SS" 
                          value={videoDuration}
                          readOnly
                          {...field} 
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>

              <FormField
                control={form.control}
                name="videoFile"
                render={({ field: { value, onChange, ...field } }) => (
                  <FormItem>
                    <FormLabel>{t("upload.form.video_file")}</FormLabel>
                    <FormControl>
                      <div className="flex items-center gap-4">
                        <Input
                          type="file"
                          accept="video/mp4"
                          onChange={(e) => {
                            const file = e.target.files?.[0]
                            if (file) {
                              handleVideoChange(e)
                              form.setValue("videoFile", file)
                            }
                          }}
                          {...field}
                        />
                        {value && (
                          <div className="flex items-center gap-2 text-sm text-muted-foreground">
                            <Video className="h-4 w-4" />
                            <span>{value.name}</span>
                          </div>
                        )}
                      </div>
                    </FormControl>
                    <FormDescription>
                      {t("upload.form.video_description")}
                    </FormDescription>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="scriptFile"
                render={({ field: { value, onChange, ...field } }) => (
                  <FormItem>
                    <FormLabel>{t("upload.form.script_file")}</FormLabel>
                    <FormControl>
                      <div className="flex items-center gap-4">
                        <Input
                          type="file"
                          accept="application/pdf"
                          onChange={(e) => {
                            const file = e.target.files?.[0]
                            if (file) {
                              form.setValue("scriptFile", file)
                            }
                          }}
                          {...field}
                        />
                        {value && (
                          <div className="flex items-center gap-2 text-sm text-muted-foreground">
                            <FileText className="h-4 w-4" />
                            <span>{value.name}</span>
                          </div>
                        )}
                      </div>
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="thumbnailFile"
                render={({ field: { value, onChange, ...field } }) => (
                  <FormItem>
                    <FormLabel>{t("upload.form.thumbnail_file")}</FormLabel>
                    <FormControl>
                      <div className="flex items-center gap-4">
                        <Input
                          type="file"
                          accept="image/*"
                          onChange={(e) => {
                            const file = e.target.files?.[0]
                            if (file) {
                              form.setValue("thumbnailFile", file)
                            }
                          }}
                          {...field}
                        />
                        {value && (
                          <div className="flex items-center gap-2 text-sm text-muted-foreground">
                            <img
                              src={URL.createObjectURL(value)}
                              alt="Thumbnail preview"
                              className="h-8 w-8 object-cover rounded"
                            />
                          </div>
                        )}
                      </div>
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              {isUploading && (
                <div className="space-y-2">
                  <div className="flex items-center justify-between text-sm">
                    <span>Uploading...</span>
                    <span>{Math.round(uploadProgress)}%</span>
                  </div>
                  <Progress value={uploadProgress} />
                </div>
              )}

              <div className="flex justify-end gap-4">
                <Button
                  type="button"
                  variant="outline"
                  onClick={() => router.push("/profile")}
                  disabled={isUploading}
                >
                  {t("upload.form.cancel_button")}
                </Button>
                <Button type="submit" disabled={isUploading}>
                  {isUploading ? (
                    <>
                      <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                      {t("upload.form.upload_button")}
                    </>
                  ) : (
                    <>
                      <Upload className="mr-2 h-4 w-4" />
                      {t("upload.form.upload_button")}
                    </>
                  )}
                </Button>
              </div>
            </form>
          </Form>
        </div>
      </div>
    </div>
  )
}

export default function UploadPage() {
  return (
    <ClientWrapper>
      <UploadPageContent />
    </ClientWrapper>
  )
}
