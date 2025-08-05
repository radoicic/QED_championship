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
      className="relative w-full h-[1015px] overflow-hidden"
    >


      <div className="container flex items-center h-[1015px] px-8">
        <div className="text-left z-20 relative max-w-2xl">
          <h2 className="text-5xl md:text-6xl font-bold mb-8 text-white">
            Quantum vision filmfest
          </h2>
          <div className="bg-gray-900/90 backdrop-blur-lg p-10 rounded-2xl border-4 border-blue-400/50 shadow-2xl ring-2 ring-blue-300/30">
            <p className="text-2xl text-white mb-6 leading-relaxed">
              Quantum Vision is not just a film festival. It's a creative revolution born from the fusion of film and blockchain.
            </p>
            <p className="text-xl text-white/90 mb-6 leading-relaxed">
              We believe stories should be free—to travel, to inspire, to change minds. That's why we built a platform where filmmakers aren't just participants—they're <span className="font-bold text-white">pioneers</span>.
            </p>
            <p className="text-xl text-white/90 leading-relaxed">
              Through a future-ready DApp, creator-owned tokens, and a radically transparent system, we're redefining how films are funded, distributed, and experienced.
            </p>
          </div>
        </div>
        
        {/* FILM X BLOCKCHAIN Graphic */}
        <div className="text-right z-20 relative ml-auto">
          <div className="flex flex-col items-center space-y-4">
            <div className="text-white text-xl font-bold">FILM</div>
            <div className="w-1 h-16 bg-gradient-to-b from-blue-400 to-purple-400"></div>
            <div className="w-1 h-16 bg-gradient-to-b from-purple-400 to-pink-400"></div>
            <div className="w-1 h-16 bg-gradient-to-b from-pink-400 to-red-400"></div>
            <div className="text-white text-xl font-bold">BLOCKCHAIN</div>
          </div>
        </div>
      </div>
    </section>
  );
}
