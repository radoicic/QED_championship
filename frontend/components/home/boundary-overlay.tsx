"use client"

import Image from "next/image"

export default function BoundaryOverlay() {
  return (
    <div className="absolute inset-0 flex items-center justify-center z-30 pointer-events-none">
      <div className="relative w-[800px] h-[600px]">
        <Image
          src="/bg.png"
          alt="Boundary overlay"
          fill
          className="object-contain"
          priority
        />
      </div>
    </div>
  )
} 