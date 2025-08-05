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
      
      {/* Content Overlay */}
      <div className="relative z-20 h-full flex flex-col justify-center items-center text-center px-8 pt-20">
        {/* Main Title */}
        <div className="mb-16 mt-8">
          <h1 className="text-5xl md:text-6xl font-bold text-white mb-8 drop-shadow-[0_0_20px_rgba(255,255,255,0.5)]">
            Quantum Vision Filmfest
          </h1>
        </div>

        {/* Main Content Container */}
        <div className="flex flex-col lg:flex-row w-full max-w-7xl gap-12 mt-16">
          {/* Left Side - Text Content */}
          <div className="flex-1 space-y-8">
            {/* First Text Block */}
            <div className="text-xl md:text-2xl text-white leading-relaxed text-left font-normal">
              <p className="mb-4 mt-16">
                Quantum Vision is not just a film festival.
              </p>
              <p>
                It's a creative revolution born from the fusion of film and blockchain.
              </p>
            </div>

            {/* Second Text Block */}
            <div className="text-lg md:text-xl text-white/90 leading-relaxed text-left">
              <p className="mb-4">
                We believe stories should be free—to travel, to inspire, to change minds.
              </p>
              <p className="mb-4">
                That's why we built a platform where filmmakers aren't just
              </p>
              <p className="mb-4">participants</p>
              <p>
                —they're <span className="font-bold text-xl">pioneers.</span>
              </p>
              <p className="mb-4">
                <span>Through a future-ready DApp, creator-owned tokens and a radically</span>
                <br />
                <span>transparent system, we're redefining how films are funded, distributed and experienced.</span>
              </p>
            </div>
          </div>
        </div>

        {/* Simple Triangle Buttons */}
        <div className="flex justify-center space-x-48 mt-[28rem]">
          {/* Submit Your Film Triangle - Green Glow */}
          <div className="relative group cursor-pointer">
            <svg width="240" height="240" viewBox="0 0 240 240" className="transition-all duration-300 hover:scale-105">
              <defs>
                <filter id="greenGlow">
                  <feGaussianBlur stdDeviation="3" result="coloredBlur"/>
                  <feMerge> 
                    <feMergeNode in="coloredBlur"/>
                    <feMergeNode in="SourceGraphic"/>
                  </feMerge>
                </filter>
              </defs>
              <polygon 
                points="120,0 0,240 240,240" 
                fill="rgba(0,0,0,0.7)" 
                stroke="#00ff00" 
                strokeWidth="4"
                transform="rotate(90 120 120)"
                filter="url(#greenGlow)"
              />
              <text x="60" y="120" textAnchor="middle" fill="white" fontSize="28" fontWeight="bold">
                <tspan x="60" dy="-25">Submit</tspan>
                <tspan x="60" dy="25">Your</tspan>
                <tspan x="60" dy="25">Film</tspan>
              </text>
            </svg>
          </div>

          {/* Connect Wallet Triangle - Blue Glow */}
          <div className="relative group cursor-pointer">
            <svg width="240" height="240" viewBox="0 0 240 240" className="transition-all duration-300 hover:scale-105">
              <defs>
                <filter id="blueGlow">
                  <feGaussianBlur stdDeviation="3" result="coloredBlur"/>
                  <feMerge> 
                    <feMergeNode in="coloredBlur"/>
                    <feMergeNode in="SourceGraphic"/>
                  </feMerge>
                </filter>
              </defs>
              <polygon 
                points="120,0 0,240 240,240" 
                fill="rgba(0,0,0,0.7)" 
                stroke="#0080ff" 
                strokeWidth="4"
                transform="rotate(90 120 120)"
                filter="url(#blueGlow)"
              />
              <text x="60" y="120" textAnchor="middle" fill="white" fontSize="28" fontWeight="bold">
                <tspan x="60" dy="-25">Connect</tspan>
                <tspan x="60" dy="25">Wallet</tspan>
              </text>
            </svg>
          </div>

          {/* Presale Info Triangle - Pink Glow */}
          <div className="relative group cursor-pointer">
            <svg width="240" height="240" viewBox="0 0 240 240" className="transition-all duration-300 hover:scale-105">
              <defs>
                <filter id="pinkGlow">
                  <feGaussianBlur stdDeviation="3" result="coloredBlur"/>
                  <feMerge> 
                    <feMergeNode in="coloredBlur"/>
                    <feMergeNode in="SourceGraphic"/>
                  </feMerge>
                </filter>
              </defs>
              <polygon 
                points="120,0 0,240 240,240" 
                fill="rgba(0,0,0,0.7)" 
                stroke="#ff0080" 
                strokeWidth="4"
                transform="rotate(90 120 120)"
                filter="url(#pinkGlow)"
              />
              <text x="60" y="120" textAnchor="middle" fill="white" fontSize="28" fontWeight="bold">
                <tspan x="60" dy="-25">Presale</tspan>
                <tspan x="60" dy="25">Info</tspan>
              </text>
            </svg>
          </div>
        </div>

        {/* FILM X BLOCKCHAIN Text */}
        <div className="absolute top-2/4 right-3 transform -translate-y-1/2">
          <h2 className="text-4xl md:text-5xl font-bold text-white tracking-widest">
            <span>FILM</span>
            <br/> X <br/>
            <span>BLOCHAIN</span>
          </h2>
        </div>
      </div>
    </section>
  )
} 