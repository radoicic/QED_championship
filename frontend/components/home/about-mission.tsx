"use client"

import { useEffect, useState } from "react"
import { ChevronDown } from "lucide-react"
import { useTheme } from "next-themes"
import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import Image from "next/image"
import { useLanguage } from "@/lib/language-provider"

export default function AboutMission() {
  const { resolvedTheme } = useTheme()
  const { t } = useLanguage()
  const [mounted, setMounted] = useState(false)

  // Avoid hydration mismatch
  useEffect(() => {
    setMounted(true)
  }, [])

  // Determine if we're in dark mode
  const isDarkMode = mounted && resolvedTheme === "dark"

  return (
    <section
      id="about"
      className="relative w-full py-20 overflow-hidden"
      style={{
        background: isDarkMode
          ? "linear-gradient(to bottom, rgba(15, 23, 42, 0.8), rgba(15, 23, 42, 0.9))"
          : "linear-gradient(to bottom, rgba(255, 255, 255, 0.8), rgba(255, 255, 255, 0.9))",
      }}
    >
      {/* Background image */}
      <div className="absolute inset-0 -z-10">
        {/* Semi-transparent overlay for better readability */}
        <div className="absolute inset-0 bg-black/50 z-10"></div>
        <div className="absolute inset-0">
          <Image 
            src="/bg1.png" 
            alt="About section background" 
            fill 
            className="object-cover"
            priority
          />
        </div>
      </div>

      <div className="container">
        <h2 className="text-4xl md:text-5xl font-bold mb-16 text-center text-white">
          {t("about.title")}
        </h2>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center ml-8">
          {/* Left side - Text content */}
          <div className="p-8 rounded-xl border border-slate-700/50 bg-slate-900/50 backdrop-blur-sm">
            <div className="space-y-6">
              <p className="text-xl leading-relaxed text-white">
                {t("about.description1")}
              </p>

              <p className="text-xl leading-relaxed text-white">
                {t("about.description2")}
              </p>

              <p className="text-xl leading-relaxed text-white">
                {t("about.description3")}
              </p>
            </div>
          </div>

          {/* Right side - Graphic */}
          <div className="flex flex-col items-center justify-center">
            <div className="relative w-64 h-64 mb-6 opacity-100 scale-100">
              {/* Film strip and blockchain graphic */}
              <div className="absolute inset-0 rounded-xl border-2 border-purple-500/50 shadow-[0_0_20px_rgba(139,92,246,0.3)]">
                {/* Film strip side */}
                <div className="absolute left-0 top-0 bottom-0 w-1/2 flex flex-col justify-evenly items-center">
                  {[1, 2, 3, 4, 5].map((i) => (
                    <div
                      key={i}
                      className="w-8 h-8 rounded-md border border-purple-400/70"
                    ></div>
                  ))}
                </div>

                {/* Blockchain side */}
                <div className="absolute right-0 top-0 bottom-0 w-1/2 flex flex-col justify-evenly items-center">
                  {[1, 2, 3, 4, 5].map((i) => (
                    <div
                      key={i}
                      className="w-8 h-8 rounded-md border border-orange-400/70"
                    ></div>
                  ))}
                </div>

                {/* Connection lines */}
                <div className="absolute inset-0 flex items-center justify-center">
                  <div className="relative w-32 h-32">
                    <div className="absolute left-0 top-1/4 w-full h-[2px] bg-purple-400"></div>
                    <div className="absolute left-0 bottom-1/4 w-full h-[2px] bg-purple-400"></div>
                    <div className="absolute left-1/2 top-1/4 w-3 h-3 rounded-full -translate-x-1/2 -translate-y-1/2 bg-purple-400"></div>
                    <div className="absolute left-1/2 bottom-1/4 w-3 h-3 rounded-full -translate-x-1/2 translate-y-1/2 bg-purple-400"></div>
                    <div className="absolute left-1/2 top-1/2 w-4 h-4 rounded-full -translate-x-1/2 -translate-y-1/2 bg-purple-400"></div>
                  </div>
                </div>
              </div>
            </div>

            <div className="text-center font-bold text-2xl text-orange-300">
              FILM
            </div>
            <div className="text-center font-bold text-2xl text-purple-400">
              ✕
            </div>
            <div className="text-center font-bold text-2xl text-orange-300">
              BLOCKCHAIN
            </div>
          </div>
        </div>

        <div className="flex justify-center mt-16">
          <Button
            variant="ghost"
            size="lg"
            className="rounded-full text-white hover:bg-slate-800/50"
            onClick={() => {
              if (typeof document !== 'undefined') {
                document.getElementById("categories")?.scrollIntoView({ behavior: "smooth" })
              }
            }}
          >
            <ChevronDown className="h-6 w-6" />
          </Button>
        </div>
      </div>
    </section>
  );
}
