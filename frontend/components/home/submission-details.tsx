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

export default function SubmissionDetails() {
  return (
    <section className="relative w-full h-[974px] overflow-hidden">
      {/* Background image */}
      <div className="absolute inset-0 -z-10">
        <Image 
          src="/bg.png" 
          alt="Submission background" 
          fill 
          className="object-cover"
          priority
        />
      </div>
    </section>
  )
}
