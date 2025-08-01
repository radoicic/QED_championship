"use client"

import { Suspense } from "react"
import dynamic from 'next/dynamic'
import Loading from "@/components/ui/loading"

// Use dynamic imports with no SSR to avoid document/window errors
const Hero = dynamic(() => import("@/components/home/hero"), { ssr: false })
const AboutMission = dynamic(() => import("@/components/home/about-mission"), { ssr: false })
const CategoryOverview = dynamic(() => import("@/components/home/category-overview"), { ssr: false })
const SubmissionDetails = dynamic(() => import("@/components/home/submission-details"), { ssr: false })
const VotingSection = dynamic(() => import("@/components/home/voting-section"), { ssr: false })
const LegalSection = dynamic(() => import("@/components/home/legal-section"), { ssr: false })

export default function Home() {
  return (
    <main className="flex min-h-screen flex-col items-center">
      <Hero />
      <AboutMission />
      <Suspense fallback={<Loading />}>
        <CategoryOverview />
      </Suspense>
      <Suspense fallback={<Loading />}>
        <SubmissionDetails />
      </Suspense>
      <Suspense fallback={<Loading />}>
        <VotingSection />
      </Suspense>
      <LegalSection />
    </main>
  )
}
