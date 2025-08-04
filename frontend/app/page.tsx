"use client"

import { Suspense } from "react"
import dynamic from 'next/dynamic'
import Loading from "@/components/ui/loading"

// Use dynamic imports with no SSR to avoid document/window errors
const Hero = dynamic(() => import("@/components/home/hero"), { ssr: false })
const GalaxySection = dynamic(() => import("@/components/home/galaxy-section"), { ssr: false })
const BgSection = dynamic(() => import("@/components/home/bg-section"), { ssr: false })

export default function Home() {
  return (
    <main className="flex min-h-screen flex-col items-center overflow-x-hidden">
      <Hero />
      <GalaxySection />
      <BgSection />
    </main>
  )
}
