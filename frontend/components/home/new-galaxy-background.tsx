"use client"

import Image from "next/image"

export default function NewGalaxyBackground() {
  return (
    <section className="relative w-full overflow-hidden min-h-screen">
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
      <div className="relative z-20 h-full flex flex-col justify-center items-center text-center px-4 sm:px-8 pt-10 sm:pt-20">
        {/* Main Title */}
        <div className="mb-8 sm:mb-16 mt-20 sm:mt-40">
          <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl xl:text-8xl font-bold text-white mb-4 sm:mb-8 drop-shadow-[0_0_20px_rgba(255,255,255,0.5)]">
            Quantum vision filmfest
          </h1>
        </div>

        {/* Grid Structure - Above FILM X BLOCHAIN */}
        <div className="absolute top-8 sm:top-16 md:top-32 lg:top-48 xl:top-65 right-2 sm:right-4 md:right-8 lg:right-16 xl:right-48 z-30">
          <div className="grid grid-cols-2 gap-x-2 sm:gap-x-4 md:gap-x-8 lg:gap-x-16 xl:gap-x-32 gap-y-2 sm:gap-y-4 md:gap-y-8">
            {/* Row 1 */}
            <div className="w-8 h-8 sm:w-12 sm:h-12 md:w-16 md:h-16 border-2 border-white rounded-lg bg-black/20 hover:bg-white/20 hover:scale-110 hover:shadow-[0_0_20px_rgba(255,255,255,0.8)] transition-all duration-300 cursor-pointer"></div>
            <div className="w-8 h-8 sm:w-12 sm:h-12 md:w-16 md:h-16 border-2 border-white rounded-lg bg-black/20 hover:bg-white/20 hover:scale-110 hover:shadow-[0_0_20px_rgba(255,255,255,0.8)] transition-all duration-300 cursor-pointer"></div>
            
            {/* Row 2 with connecting line */}
            <div className="relative">
              <div className="w-8 h-8 sm:w-12 sm:h-12 md:w-16 md:h-16 border-2 border-white rounded-lg bg-black/20 hover:bg-white/20 hover:scale-110 hover:shadow-[0_0_20px_rgba(255,255,255,0.8)] transition-all duration-300 cursor-pointer"></div>
              <div className="absolute top-[100%] left-6 sm:left-8 md:left-12 w-8 sm:w-16 md:w-36 h-0.5 bg-white transform -translate-y-1/2"></div>
              <div className="absolute top-[100%] left-12 sm:left-16 md:left-40 w-2 h-2 sm:w-3 sm:h-3 bg-white rounded-full transform -translate-y-1/2"></div>
            </div>
            <div className="w-8 h-8 sm:w-12 sm:h-12 md:w-16 md:h-16 border-2 border-white rounded-lg bg-black/20 hover:bg-white/20 hover:scale-110 hover:shadow-[0_0_20px_rgba(255,255,255,0.8)] transition-all duration-300 cursor-pointer"></div>
            
            {/* Row 3 with center dot */}
            <div className="w-8 h-8 sm:w-12 sm:h-12 md:w-16 md:h-16 border-2 border-white rounded-lg bg-black/20 hover:bg-white/20 hover:scale-110 hover:shadow-[0_0_20px_rgba(255,255,255,0.8)] transition-all duration-300 cursor-pointer"></div>
            <div className="relative">
              <div className="w-8 h-8 sm:w-12 sm:h-12 md:w-16 md:h-16 border-2 border-white rounded-lg bg-black/20 hover:bg-white/20 hover:scale-110 hover:shadow-[0_0_20px_rgba(255,255,255,0.8)] transition-all duration-300 cursor-pointer"></div>
              <div className="absolute top-1/2 -left-8 sm:-left-12 md:-left-16 w-2 h-2 sm:w-3 sm:h-3 bg-white rounded-full transform -translate-x-1/2 -translate-y-1/2"></div>
            </div>
            
            {/* Row 4 with connecting line */}
            <div className="relative">
              <div className="w-8 h-8 sm:w-12 sm:h-12 md:w-16 md:h-16 border-2 border-white rounded-lg bg-black/20 hover:bg-white/20 hover:scale-110 hover:shadow-[0_0_20px_rgba(255,255,255,0.8)] transition-all duration-300 cursor-pointer"></div>
              <div className="absolute top-[0%] left-6 sm:left-8 md:left-12 w-8 sm:w-16 md:w-36 h-0.5 bg-white transform -translate-y-1/2"></div>
              <div className="absolute top-[0%] left-12 sm:left-16 md:left-40 w-2 h-2 sm:w-3 sm:h-3 bg-white rounded-full transform -translate-y-1/2"></div>
            </div>
            <div className="w-8 h-8 sm:w-12 sm:h-12 md:w-16 md:h-16 border-2 border-white rounded-lg bg-black/20 hover:bg-white/20 hover:scale-110 hover:shadow-[0_0_20px_rgba(255,255,255,0.8)] transition-all duration-300 cursor-pointer"></div>
            
            {/* Row 5 */}
            <div className="w-8 h-8 sm:w-12 sm:h-12 md:w-16 md:h-16 border-2 border-white rounded-lg bg-black/20 hover:bg-white/20 hover:scale-110 hover:shadow-[0_0_20px_rgba(255,255,255,0.8)] transition-all duration-300 cursor-pointer"></div>
            <div className="w-8 h-8 sm:w-12 sm:h-12 md:w-16 md:h-16 border-2 border-white rounded-lg bg-black/20 hover:bg-white/20 hover:scale-110 hover:shadow-[0_0_20px_rgba(255,255,255,0.8)] transition-all duration-300 cursor-pointer"></div>
          </div>
        </div>

        {/* Main Content Container */}
        <div className="flex flex-col lg:flex-row w-full max-w-7xl gap-6 sm:gap-8 lg:gap-12 mt-2">
          {/* Left Side - Text Content */}
          <div className="flex-1 space-y-4 sm:space-y-6 lg:space-y-8 ml-0 sm:ml-8 lg:ml-20">
            {/* First Text Block */}
            <div className="text-base sm:text-lg md:text-xl lg:text-2xl xl:text-3xl text-white leading-relaxed text-left font-semibold" style={{ fontFamily: 'Inter, -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", Arial, sans-serif' }}>
              <p className="mb-3 sm:mb-4 lg:mb-6 mt-2">
                Quantum Vision is not just a film festival.
              </p>
              <p className="mb-3 sm:mb-4 lg:mb-6">
                It's a creative revolution born from the fusion of film and blockchain.
              </p>
            </div>

            {/* Second Text Block */}
            <div className="text-base sm:text-lg md:text-xl lg:text-2xl xl:text-3xl text-white/90 leading-relaxed text-left font-normal" style={{ fontFamily: 'Inter, -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", Arial, sans-serif' }}>
              <p className="mb-3 sm:mb-4 lg:mb-6">
                We believe stories should be free—to travel, to inspire, to change minds.
              </p>
              <p className="mb-3 sm:mb-4 lg:mb-6">
                That's why we built a platform where filmmakers aren't just
              </p>
              <p className="mb-3 sm:mb-4 lg:mb-6">participants</p>
              <p className="mb-3 sm:mb-4 lg:mb-6">
                —they're <span className="font-bold">pioneers.</span>
              </p>
              <p className="mb-3 sm:mb-4 lg:mb-6">
                <span>Through a future-ready DApp, creator-owned tokens and a radically</span>
                <br className="hidden sm:block" />
                <span>transparent system,we're redefining how films are funded,distributed</span>
                <br className="hidden sm:block" />
                <span>and experienced.</span>
              </p>
            </div>
          </div>
        </div>

        {/* Simple Triangle Buttons */}
        <div className="flex flex-col sm:flex-row justify-center space-y-8 sm:space-y-0 sm:space-x-8 md:space-x-16 lg:space-x-48 mt-8 sm:mt-12 lg:mt-[9rem] px-4 sm:px-0">
          {/* Submit Your Film Triangle - Green Glow */}
          <div className="relative group cursor-pointer transition-all duration-300 touch-manipulation" style={{
            filter: 'drop-shadow(0 0 30px rgba(0, 255, 170, 0.8)) drop-shadow(0 0 60px rgba(0, 255, 170, 0.6)) drop-shadow(0 0 90px rgba(0, 255, 170, 0.4))'
          }}>
            <svg width="120" height="120" viewBox="0 0 240 240" className="w-24 h-24 sm:w-32 sm:h-32 md:w-48 md:h-48 lg:w-60 lg:h-60 xl:w-60 xl:h-60 transition-all duration-300 hover:scale-105 active:scale-95">
              <defs>
                <filter id="greenGlow">
                  <feGaussianBlur stdDeviation="3" result="coloredBlur"/>
                  <feMerge> 
                    <feMergeNode in="coloredBlur"/>
                    <feMergeNode in="SourceGraphic"/>
                  </feMerge>
                </filter>
                <filter id="dualGlow">
                  <feGaussianBlur stdDeviation="8" result="blur"/>
                  <feFlood floodColor="#00ff00" floodOpacity="0.8" result="greenGlow"/>
                  <feFlood floodColor="#0080ff" floodOpacity="0.8" result="blueGlow"/>
                  <feComposite in="greenGlow" in2="blur" operator="in" result="greenEffect"/>
                  <feComposite in="blueGlow" in2="blur" operator="in" result="blueEffect"/>
                  <feMerge> 
                    <feMergeNode in="greenEffect"/>
                    <feMergeNode in="blueEffect"/>
                  </feMerge>
                </filter>
                <filter id="outerGlow">
                  <feGaussianBlur stdDeviation="6" result="blur"/>
                  <feFlood floodColor="#00ff00" floodOpacity="0.7" result="greenGlow"/>
                  <feFlood floodColor="#0080ff" floodOpacity="0.7" result="blueGlow"/>
                  <feComposite in="greenGlow" in2="blur" operator="in" result="greenEffect"/>
                  <feComposite in="blueGlow" in2="blur" operator="in" result="blueEffect"/>
                  <feMerge> 
                    <feMergeNode in="greenEffect"/>
                    <feMergeNode in="blueEffect"/>
                  </feMerge>
                </filter>
                <filter id="greenOuterGlow" x="-100%" y="-100%" width="300%" height="300%">
                  <feGaussianBlur stdDeviation="12" result="blur"/>
                  <feFlood floodColor="#00ff00" floodOpacity="0.9" result="greenColor"/>
                  <feComposite in="greenColor" in2="blur" operator="in" result="greenGlow"/>
                  <feComposite in="greenGlow" in2="SourceGraphic" operator="screen" result="screenEffect"/>
                  <feMerge> 
                    <feMergeNode in="screenEffect"/>
                    <feMergeNode in="SourceGraphic"/>
                  </feMerge>
                </filter>
                <filter id="blueOuterGlow" x="-100%" y="-100%" width="300%" height="300%">
                  <feGaussianBlur stdDeviation="12" result="blur"/>
                  <feFlood floodColor="#0080ff" floodOpacity="0.9" result="blueColor"/>
                  <feComposite in="blueColor" in2="blur" operator="in" result="blueGlow"/>
                  <feComposite in="blueGlow" in2="SourceGraphic" operator="screen" result="screenEffect"/>
                  <feMerge> 
                    <feMergeNode in="screenEffect"/>
                    <feMergeNode in="SourceGraphic"/>
                  </feMerge>
                </filter>
                <filter id="innerBlur">
                  <feGaussianBlur stdDeviation="3" result="blur"/>
                </filter>
                <filter id="cleanGreenGlow" x="-100%" y="-100%" width="300%" height="300%">
                  <feGaussianBlur stdDeviation="8" result="blur"/>
                  <feFlood floodColor="#00ff00" floodOpacity="0.8" result="greenColor"/>
                  <feComposite in="greenColor" in2="blur" operator="in" result="greenGlow"/>
                  <feMerge> 
                    <feMergeNode in="greenGlow"/>
                    <feMergeNode in="SourceGraphic"/>
                  </feMerge>
                </filter>
                <filter id="cleanBlueGlow" x="-100%" y="-100%" width="300%" height="300%">
                  <feGaussianBlur stdDeviation="8" result="blur"/>
                  <feFlood floodColor="#0080ff" floodOpacity="0.8" result="blueColor"/>
                  <feComposite in="blueColor" in2="blur" operator="in" result="blueGlow"/>
                  <feMerge> 
                    <feMergeNode in="blueGlow"/>
                    <feMergeNode in="SourceGraphic"/>
                  </feMerge>
                </filter>
                <filter id="outerAmbientGlow" x="-300%" y="-300%" width="700%" height="700%">
                  <feGaussianBlur stdDeviation="30" result="outerBlur"/>
                  <feFlood floodColor="#00ffaa" floodOpacity="0.8" result="ambientColor"/>
                  <feComposite in="ambientColor" in2="outerBlur" operator="in" result="ambientGlow"/>
                  <feMerge> 
                    <feMergeNode in="ambientGlow"/>
                  </feMerge>
                </filter>
              </defs>

              {/* Left Edge Green Glow */}
              <path 
                d="M 120 0 L 0 240 L 110 240" 
                fill="transparent" 
                stroke="#00ff00" 
                strokeWidth="3"
                strokeLinejoin="round"
                strokeLinecap="round"
                transform="rotate(90 120 120)"
                filter="url(#greenOuterGlow)"
              />
              {/* Right Edge Blue Glow */}
              <path 
                d="M 120 0 L 240 240 L 130 240" 
                fill="transparent" 
                stroke="#0080ff" 
                strokeWidth="3"
                strokeLinejoin="round"
                strokeLinecap="round"
                transform="rotate(90 120 120)"
                filter="url(#blueOuterGlow)"
              />
              {/* Dark Interior Triangle */}
              <polygon 
                points="120,0 0,240 240,240" 
                fill="rgba(0,0,0,0.85)" 
                stroke="none"
                strokeLinejoin="round"
                strokeLinecap="round"
                transform="rotate(90 120 120)"
              />
              {/* Main White Stroke Triangle */}
              <polygon 
                points="120,0 0,240 240,240" 
                fill="transparent" 
                stroke="#ffffff" 
                strokeWidth="1"
                transform="rotate(90 120 120)"
              />
              <text x="60" y="120" textAnchor="middle" fill="white" fontSize="12" fontWeight="bold">
                <tspan x="60" dy="-10">Submit</tspan>
                <tspan x="60" dy="12">Your</tspan>
                <tspan x="60" dy="12">Film</tspan>
              </text>
            </svg>
            
            {/* Hover Glow Styles */}
            <style jsx>{`
              .group:hover {
                filter: drop-shadow(0 0 20px rgba(0, 255, 170, 0.8)) 
                        drop-shadow(0 0 40px rgba(0, 255, 170, 0.6)) 
                        drop-shadow(0 0 80px rgba(0, 255, 170, 0.4)) !important;
                transform: scale(1.03);
              }
              
              .group:hover svg {
                filter: brightness(1.2) saturate(1.3);
              }
              
              @keyframes pulse-glow {
                0%, 100% { 
                  filter: drop-shadow(0 0 20px rgba(0, 255, 170, 0.8)) 
                          drop-shadow(0 0 40px rgba(0, 255, 170, 0.6)) 
                          drop-shadow(0 0 80px rgba(0, 255, 170, 0.4));
                }
                50% { 
                  filter: drop-shadow(0 0 30px rgba(0, 255, 170, 0.9)) 
                          drop-shadow(0 0 60px rgba(0, 255, 170, 0.7)) 
                          drop-shadow(0 0 100px rgba(0, 255, 170, 0.5));
                }
              }
              
              .group:hover {
                animation: pulse-glow 2s ease-in-out infinite;
              }
            `}</style>
          </div>

          {/* Connect Wallet Triangle - Blue Glow */}
          <div className="relative group cursor-pointer transition-all duration-300 touch-manipulation" style={{
            filter: 'drop-shadow(0 0 30px rgba(255, 0, 128, 0.6)) drop-shadow(0 0 60px rgba(255, 255, 255, 0.6)) drop-shadow(0 0 90px rgba(0, 128, 255, 0.6))'
          }}>
            <svg width="120" height="120" viewBox="0 0 240 240" className="w-24 h-24 sm:w-32 sm:h-32 md:w-48 md:h-48 lg:w-60 lg:h-60 xl:w-60 xl:h-60 transition-all duration-300 hover:scale-105 active:scale-95">
              <defs>
                <filter id="pinkGlow2" x="-100%" y="-100%" width="300%" height="300%">
                  <feGaussianBlur stdDeviation="12" result="blur"/>
                  <feFlood floodColor="#ff0080" floodOpacity="0.9" result="pinkColor"/>
                  <feComposite in="pinkColor" in2="blur" operator="in" result="pinkGlow"/>
                  <feComposite in="pinkGlow" in2="SourceGraphic" operator="screen" result="screenEffect"/>
                  <feMerge> 
                    <feMergeNode in="screenEffect"/>
                    <feMergeNode in="SourceGraphic"/>
                  </feMerge>
                </filter>
                <filter id="whiteGlow2" x="-100%" y="-100%" width="300%" height="300%">
                  <feGaussianBlur stdDeviation="12" result="blur"/>
                  <feFlood floodColor="#ffffff" floodOpacity="0.9" result="whiteColor"/>
                  <feComposite in="whiteColor" in2="blur" operator="in" result="whiteGlow"/>
                  <feComposite in="whiteGlow" in2="SourceGraphic" operator="screen" result="screenEffect"/>
                  <feMerge> 
                    <feMergeNode in="screenEffect"/>
                    <feMergeNode in="SourceGraphic"/>
                  </feMerge>
                </filter>
                <filter id="blueGlow2" x="-100%" y="-100%" width="300%" height="300%">
                  <feGaussianBlur stdDeviation="12" result="blur"/>
                  <feFlood floodColor="#0080ff" floodOpacity="0.9" result="blueColor"/>
                  <feComposite in="blueColor" in2="blur" operator="in" result="blueGlow"/>
                  <feComposite in="blueGlow" in2="SourceGraphic" operator="screen" result="screenEffect"/>
                  <feMerge> 
                    <feMergeNode in="screenEffect"/>
                    <feMergeNode in="SourceGraphic"/>
                  </feMerge>
                </filter>
              </defs>

              {/* First Third - Pink Glow */}
              <path 
                d="M 120 0 L 0 240 L 80 240" 
                fill="transparent" 
                stroke="#ff0080" 
                strokeWidth="3"
                strokeLinejoin="round"
                strokeLinecap="round"
                transform="rotate(90 120 120)"
                filter="url(#pinkGlow2)"
              />
              {/* Second Third - White Glow */}
              <path 
                d="M 120 0 L 80 240 L 160 240" 
                fill="transparent" 
                stroke="#ffffff" 
                strokeWidth="3"
                strokeLinejoin="round"
                strokeLinecap="round"
                transform="rotate(90 120 120)"
                filter="url(#whiteGlow2)"
              />
              {/* Third Third - Blue Glow */}
              <path 
                d="M 120 0 L 160 240 L 240 240" 
                fill="transparent" 
                stroke="#0080ff" 
                strokeWidth="3"
                strokeLinejoin="round"
                strokeLinecap="round"
                transform="rotate(90 120 120)"
                filter="url(#blueGlow2)"
              />
              {/* Black Interior Triangle */}
              <polygon 
                points="120,0 0,240 240,240" 
                fill="rgba(0,0,0,1)" 
                stroke="none"
                strokeLinejoin="round"
                strokeLinecap="round"
                transform="rotate(90 120 120)"
              />
              {/* Main White Stroke Triangle */}
              <polygon 
                points="120,0 0,240 240,240" 
                fill="transparent" 
                stroke="#ffffff" 
                strokeWidth="1"
                transform="rotate(90 120 120)"
              />
              <text x="60" y="120" textAnchor="middle" fill="white" fontSize="12" fontWeight="bold">
                <tspan x="60" dy="-10">Connect</tspan>
                <tspan x="60" dy="12">Wallet</tspan>
              </text>
            </svg>
            
            {/* Hover Glow Styles */}
            <style jsx>{`
              .group:hover {
                filter: drop-shadow(0 0 20px rgba(255, 0, 128, 0.8)) 
                        drop-shadow(0 0 40px rgba(255, 255, 255, 0.6)) 
                        drop-shadow(0 0 80px rgba(0, 128, 255, 0.4)) !important;
                transform: scale(1.03);
              }
              
              .group:hover svg {
                filter: brightness(1.2) saturate(1.3);
              }
              
              @keyframes pulse-glow {
                0%, 100% { 
                  filter: drop-shadow(0 0 20px rgba(255, 0, 128, 0.8)) 
                          drop-shadow(0 0 40px rgba(255, 255, 255, 0.6)) 
                          drop-shadow(0 0 80px rgba(0, 128, 255, 0.4));
                }
                50% { 
                  filter: drop-shadow(0 0 30px rgba(255, 0, 128, 0.9)) 
                          drop-shadow(0 0 60px rgba(255, 255, 255, 0.7)) 
                          drop-shadow(0 0 100px rgba(0, 128, 255, 0.5));
                }
              }
              
              .group:hover {
                animation: pulse-glow 2s ease-in-out infinite;
              }
            `}</style>
          </div>

          {/* Presale Info Triangle - Pink Glow */}
          <div className="relative group cursor-pointer transition-all duration-300 touch-manipulation" style={{
            filter: 'drop-shadow(0 0 30px rgba(255, 255, 255, 0.6)) drop-shadow(0 0 60px rgba(255, 0, 128, 0.6)) drop-shadow(0 0 90px rgba(255, 0, 128, 0.4))'
          }}>
            <svg width="120" height="120" viewBox="0 0 240 240" className="w-24 h-24 sm:w-32 sm:h-32 md:w-48 md:h-48 lg:w-60 lg:h-60 xl:w-60 xl:h-60 transition-all duration-300 hover:scale-105 active:scale-95">
              <defs>
                <filter id="greenOuterGlow3" x="-100%" y="-100%" width="300%" height="300%">
                  <feGaussianBlur stdDeviation="12" result="blur"/>
                  <feFlood floodColor="#ffffff" floodOpacity="0.9" result="whiteColor"/>
                  <feComposite in="whiteColor" in2="blur" operator="in" result="whiteGlow"/>
                  <feComposite in="whiteGlow" in2="SourceGraphic" operator="screen" result="screenEffect"/>
                  <feMerge> 
                    <feMergeNode in="screenEffect"/>
                    <feMergeNode in="SourceGraphic"/>
                  </feMerge>
                </filter>
                <filter id="blueOuterGlow3" x="-100%" y="-100%" width="300%" height="300%">
                  <feGaussianBlur stdDeviation="12" result="blur"/>
                  <feFlood floodColor="#ff0080" floodOpacity="0.9" result="pinkColor"/>
                  <feComposite in="pinkColor" in2="blur" operator="in" result="pinkGlow"/>
                  <feComposite in="pinkGlow" in2="SourceGraphic" operator="screen" result="screenEffect"/>
                  <feMerge> 
                    <feMergeNode in="screenEffect"/>
                    <feMergeNode in="SourceGraphic"/>
                  </feMerge>
                </filter>
              </defs>

              {/* Upper Half White Glow */}
              <path 
                d="M 120 0 L 0 240 L 110 240" 
                fill="transparent" 
                stroke="#ffffff" 
                strokeWidth="3"
                strokeLinejoin="round"
                strokeLinecap="round"
                transform="rotate(90 120 120)"
                filter="url(#greenOuterGlow3)"
              />
              {/* Lower Half Pink Glow */}
              <path 
                d="M 120 0 L 240 240 L 130 240" 
                fill="transparent" 
                stroke="#ff0080" 
                strokeWidth="3"
                strokeLinejoin="round"
                strokeLinecap="round"
                transform="rotate(90 120 120)"
                filter="url(#blueOuterGlow3)"
              />
              {/* Dark Interior Triangle */}
              <polygon 
                points="120,0 0,240 240,240" 
                fill="rgba(0,0,0,0.85)" 
                stroke="none"
                strokeLinejoin="round"
                strokeLinecap="round"
                transform="rotate(90 120 120)"
              />
              {/* Main White Stroke Triangle */}
              <polygon 
                points="120,0 0,240 240,240" 
                fill="transparent" 
                stroke="#ffffff" 
                strokeWidth="1"
                transform="rotate(90 120 120)"
              />
              <text x="60" y="120" textAnchor="middle" fill="white" fontSize="12" fontWeight="bold">
                <tspan x="60" dy="-10">Presale</tspan>
                <tspan x="60" dy="12">Info</tspan>
              </text>
            </svg>
            
            {/* Hover Glow Styles */}
            <style jsx>{`
              .group:hover {
                filter: drop-shadow(0 0 20px rgba(255, 255, 255, 0.8)) 
                        drop-shadow(0 0 40px rgba(255, 0, 128, 0.6)) 
                        drop-shadow(0 0 80px rgba(255, 0, 128, 0.4)) !important;
                transform: scale(1.03);
              }
              
              .group:hover svg {
                filter: brightness(1.2) saturate(1.3);
              }
              
              @keyframes pulse-glow {
                0%, 100% { 
                  filter: drop-shadow(0 0 20px rgba(255, 255, 255, 0.8)) 
                          drop-shadow(0 0 40px rgba(255, 0, 128, 0.6)) 
                          drop-shadow(0 0 80px rgba(255, 0, 128, 0.4));
                }
                50% { 
                  filter: drop-shadow(0 0 30px rgba(255, 255, 255, 0.9)) 
                          drop-shadow(0 0 60px rgba(255, 0, 128, 0.7)) 
                          drop-shadow(0 0 100px rgba(255, 0, 128, 0.5));
                }
              }
              
              .group:hover {
                animation: pulse-glow 2s ease-in-out infinite;
              }
            `}</style>
          </div>
        </div>

        {/* FILM X BLOCKCHAIN Text */}
        <div className="absolute top-16 sm:top-32 md:top-48 lg:top-64 xl:top-80 2xl:top-[105rem] right-2 sm:right-4 md:right-8 lg:right-16 xl:right-44 transform -translate-y-1/2">
          <h2 className="text-xl sm:text-2xl md:text-3xl lg:text-4xl xl:text-5xl font-extrabold text-white tracking-widest" style={{ fontFamily: 'Inter, -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", Arial, sans-serif' }}>
            <span>FILM</span>
            <br/> X <br/>
            <span>BLOCHAIN</span>
          </h2>
        </div>
      </div>
    </section>
  )
} 