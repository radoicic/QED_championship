"use client"

import Image from "next/image"

export default function NewGalaxyBackground() {
  return (
    <section className="relative w-full overflow-hidden" style={{ height: '2603px' }}>
      {/* New Galaxy Background */}
      <div className="absolute inset-0 -z-10">
        <Image 
          src="/galaxy-bg (1).png" 
          alt="New Galaxy background" 
          fill 
          className="object-cover"
          priority
        />
      </div>
      
      {/* 3 Triangles Image */}
      <div className="absolute inset-0 flex items-center justify-center z-10">
        <div className="relative w-[2000px] h-[2000px]">
          <Image
            src="/3_triangles.png"
            alt="Three triangles"
            fill
            className="object-contain"
            priority
          />
        </div>
      </div>
    </section>
  )
} 