"use client"

import type React from "react"

import { useEffect, useState } from "react"
import { MessageSquare, FileText, FlaskRoundIcon as Flask, Gamepad2, AlertTriangle, Cpu } from "lucide-react"
import { useTheme } from "next-themes"
import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import { useLanguage } from "@/lib/language-provider"
import Image from "next/image"
import Link from "next/link"

interface CategoryCardProps {
  icon: React.ReactNode
  title: string
  description: string
  color: string
  isDarkMode: boolean
  slug: string
}

function CategoryCard({ icon, title, description, color, isDarkMode, slug }: CategoryCardProps) {
  const { t } = useLanguage()
  
  return (
    <div
      className={cn(
        "relative rounded-xl p-8 transition-all duration-300 h-full flex flex-col",
        "bg-slate-900/70 backdrop-blur-md hover:bg-slate-900/90",
        "hover:scale-[1.02] hover:shadow-2xl group"
      )}
      style={{
        boxShadow: `0 0 20px rgba(var(--${color}-rgb), 0.2)`,
        border: `1px solid rgb(var(--${color}-rgb), 0.5)`,
      }}
    >
      <div className={`text-${color}-500 mb-6 text-opacity-90 group-hover:text-opacity-100 transition-all duration-300 transform group-hover:scale-110`}>
        {icon}
      </div>
      <h3 className="text-2xl font-bold mb-3 text-white">{title}</h3>
      <p className="mb-6 flex-grow text-slate-300">{description}</p>
      <Link href={`/videos?category=${slug}`} passHref>
      <Button
        variant="link"
        className={`text-${color}-400 p-0 h-auto font-medium hover:text-${color}-300 hover:translate-x-1 transition-transform duration-300 hover:no-underline`}
      >
        {t("categories.see_details")}
      </Button>
      </Link>
      
      {/* Glowing corner effect */}
      <div className={`absolute top-0 right-0 w-20 h-20 opacity-0 group-hover:opacity-100 transition-opacity duration-500 bg-gradient-to-bl from-${color}-500/30 to-transparent rounded-tr-xl`}></div>
      
      {/* Glowing border on hover */}
      <div className={`absolute inset-0 rounded-xl opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none`}
        style={{
          boxShadow: `0 0 15px 2px rgb(var(--${color}-rgb), 0.4)`,
          border: `1px solid rgb(var(--${color}-rgb), 0.8)`,
        }}
      ></div>
    </div>
  )
}

export default function CategoryOverview() {
  const { t } = useLanguage()
  const { resolvedTheme } = useTheme()
  const [mounted, setMounted] = useState(false)

  // Avoid hydration mismatch
  useEffect(() => {
    setMounted(true)
  }, [])

  // Determine if we're in dark mode
  const isDarkMode = mounted && resolvedTheme === "dark"

  // Define CSS variables for colors - only on client side
  useEffect(() => {
    if (typeof document !== 'undefined') {
      document.documentElement.style.setProperty("--blue-rgb", "59, 130, 246")
      document.documentElement.style.setProperty("--orange-rgb", "249, 115, 22")
      document.documentElement.style.setProperty("--purple-rgb", "139, 92, 246")
      document.documentElement.style.setProperty("--yellow-rgb", "234, 179, 8")
      document.documentElement.style.setProperty("--red-rgb", "239, 68, 68")
      document.documentElement.style.setProperty("--green-rgb", "34, 197, 94")
    }
  }, [])

  const categories = [
    {
      icon: <MessageSquare className="h-10 w-10" />,
      title: t("categories.narrative"),
      description: t("categories.narrative_description"),
      color: "blue",
      slug: "narrative"
    },
    {
      icon: <FileText className="h-10 w-10" />,
      title: t("categories.documentary"),
      description: t("categories.documentary_description"),
      color: "orange",
      slug: "documentary"
    },
    {
      icon: <Flask className="h-10 w-10" />,
      title: t("categories.experimental"),
      description: t("categories.experimental_description"),
      color: "purple",
      slug: "experimental"
    },
    {
      icon: <Gamepad2 className="h-10 w-10" />,
      title: t("categories.animation"),
      description: t("categories.animation_description"),
      color: "yellow",
      slug: "animation"
    },
    {
      icon: <AlertTriangle className="h-10 w-10" />,
      title: t("categories.dystopian"),
      description: t("categories.dystopian_description"),
      color: "red",
      slug: "dystopian"
    },
    {
      icon: <Cpu className="h-10 w-10" />,
      title: t("categories.ai_identity"),
      description: t("categories.ai_identity_description"),
      color: "green",
      slug: "ai-identity"
    },
  ]

  return (
    <section id="categories" className="relative w-full py-24 overflow-hidden">
      {/* Background image */}
      <div className="absolute inset-0 -z-10">
        {/* Semi-transparent overlay for better readability */}
        {/* <div className="absolute inset-0 bg-black/70 z-10"></div> */}
        <div className="absolute inset-0">
          <Image 
            src="/bg1.png" 
            alt="Categories background" 
            fill 
            className="object-cover"
            priority
          />
        </div>
      </div>

      <div className="container">
        <h2 className="text-4xl md:text-5xl font-bold mb-16 text-center text-white">
          {t("categories.title")}
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-12 mx-8">
          {categories.map((category, index) => (
            <CategoryCard
              key={index}
              icon={category.icon}
              title={category.title}
              description={category.description}
              color={category.color}
              isDarkMode={isDarkMode}
              slug={category.slug}
            />
          ))}
        </div>
      </div>
    </section>
  )
}
