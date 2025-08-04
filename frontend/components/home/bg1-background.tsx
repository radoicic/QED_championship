"use client"

import Image from "next/image"

export default function Bg1Background() {
  return (
    <section className="relative w-full overflow-hidden" style={{ height: '4810px' }}>
      {/* Bg1 Background */}
      <div className="absolute inset-0 -z-10">
        <Image 
          src="/bg1.png" 
          alt="Background 1" 
          fill 
          className="object-cover"
          priority
        />
      </div>
    </section>
  )
} 