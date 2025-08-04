"use client"

import type React from "react"
import { useState, useEffect } from "react"
import { useRouter } from "next/navigation"
import { Video, FileText, File, Upload } from "lucide-react"
import { Button } from "@/components/ui/button"
import { useTheme } from "next-themes"
import { cn } from "@/lib/utils"
import { useLanguage } from "@/lib/language-provider"
import { useAuth } from "@/lib/auth-provider"
import { useSnackbar } from "notistack"
import LoginDialog from "@/components/auth/login-dialog"
import Image from "next/image"

interface RequirementCardProps {
  icon: React.ReactNode
  title: string
  subtitle: string
  details: string
  isDarkMode: boolean
}

function RequirementCard({ icon, title, subtitle, details, isDarkMode }: RequirementCardProps) {
  return (
    <div className="relative group">
      {/* Card Content - Completely transparent, no glow effects */}
      <div className="relative p-8 flex flex-col items-center text-center z-10 h-full transform group-hover:scale-[0.98] transition-all duration-500 ease-out rounded-xl">
        <div className="text-white mb-6 opacity-90 group-hover:opacity-100 transition-all duration-300 group-hover:scale-110 transform">{icon}</div>
        <h3 className="text-2xl font-bold mb-2 text-white">{title}</h3>
        <p className="text-xl font-medium mb-3 text-white/90">{subtitle}</p>
        <p className="text-lg text-slate-300">{details}</p>
      </div>
    </div>
  )
}

export default function DesignBackground() {
  const { t } = useLanguage()
  const { isAuthenticated, user } = useAuth()
  const { enqueueSnackbar } = useSnackbar()
  const [showLoginDialog, setShowLoginDialog] = useState(false)
  const router = useRouter()
  const { resolvedTheme } = useTheme()
  const [mounted, setMounted] = useState(false)

  // Avoid hydration mismatch
  useEffect(() => {
    setMounted(true)
  }, [])

  // Determine if we're in dark mode
  const isDarkMode = mounted && resolvedTheme === "dark"

  const handleSubmitClick = () => {
    if (!isAuthenticated) {
      setShowLoginDialog(true)
      return
    }

    if (user?.role !== "agent") {
      enqueueSnackbar(t("submission.agent_only"), { 
        variant: "error",
        autoHideDuration: 2000
      })
      return
    }

    // Navigate to submission form
    router.push("/upload")
  }

  return (
    <section id="submit" className="relative w-full min-h-screen overflow-hidden">
      {/* Design Background */}
      <div className="absolute inset-0 -z-10">
        <Image 
          src="/bg.png" 
          alt="Design background" 
          fill 
          className="object-cover"
          priority
        />
      </div>
      
      <div className="container flex items-center justify-center min-h-screen">
        <div className="text-center w-full">
          <h2 className="text-4xl md:text-5xl font-bold mb-16 text-white">
            {t("submission.entry_title")}
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-16 mx-8">
            <RequirementCard
              icon={<Video className="h-16 w-16" />}
              title={t("submission.requirements.video.title")}
              subtitle={t("submission.requirements.video.subtitle")}
              details={t("submission.requirements.video.details")}
              isDarkMode={isDarkMode}
            />
            <RequirementCard
              icon={<FileText className="h-16 w-16" />}
              title={t("submission.requirements.storyline.title")}
              subtitle={t("submission.requirements.storyline.subtitle")}
              details={t("submission.requirements.storyline.details")}
              isDarkMode={isDarkMode}
            />
            <RequirementCard
              icon={<File className="h-16 w-16" />}
              title={t("submission.requirements.script.title")}
              subtitle={t("submission.requirements.script.subtitle")}
              details={t("submission.requirements.script.details")}
              isDarkMode={isDarkMode}
            />
          </div>

          <div className="flex justify-center">
            <Button
              size="lg"
              className={cn(
                "relative px-8 py-6 text-white font-medium text-lg",
                "border border-purple-300/50 rounded-full",
                "shadow-[0_0_30px_rgba(147,51,234,0.8)]",
                "transition-all duration-300 hover:shadow-[0_0_40px_rgba(147,51,234,0.9)] hover:scale-105",
                "overflow-hidden group"
              )}
              style={{
                WebkitBackdropFilter: "blur(8px)",
                backdropFilter: "blur(8px)",
              }}
              onClick={handleSubmitClick}
            >
              <Upload className="mr-2 h-5 w-5" />
              {t("submission.upload_button")}
            </Button>
          </div>
        </div>
      </div>

      <LoginDialog open={showLoginDialog} onOpenChange={setShowLoginDialog} />
    </section>
  )
} 