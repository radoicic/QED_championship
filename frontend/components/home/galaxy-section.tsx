"use client";

import Image from "next/image";
import { Button } from "@/components/ui/button";
import { useLanguage } from "@/lib/language-provider";

export default function GalaxySection() {
  const { t } = useLanguage();

  return (
    <section
      className="relative w-full overflow-hidden"
      style={{ height: "2561px" }}
    >
      {/* Galaxy Background */}
      <div className="absolute inset-0 -z-10">
        <Image
          src="/galaxy-bg (1).png"
          alt="Galaxy background"
          fill
          className="object-cover"
          priority
        />
      </div>

      {/* Content Overlay */}
      <div className="relative z-20 h-full flex flex-col justify-center items-center text-center px-8 pt-20">
        {/* Main Title */}
        <div className="mb-16">
          <h1 className="text-4xl md:text-5xl font-bold text-white mb-8 drop-shadow-[0_0_20px_rgba(255,255,255,0.5)]">
            Quantum Vision Filmfest
          </h1>
        </div>

        {/* Main Content Container */}
        <div className="flex flex-col lg:flex-row w-full max-w-7xl gap-12">
          {/* Left Side - Text Content */}
          <div className="flex-1 space-y-8">
            {/* First Text Block */}
            <div className="text-xl md:text-2xl text-white leading-relaxed text-left">
              <p className="mb-4">
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
            </div>

            {/* Third Text Block */}
            <div className="text-lg md:text-xl text-white/90 leading-relaxed text-left">
              <p className="mb-4">
                Through a future-ready DApp, creator-owned tokens, and a radically
              </p>
              <p className="mb-4">
                transparent system, we're redefining how films are funded, distributed,
              </p>
              <p>and experienced.</p>
            </div>
          </div>
        </div>

        {/* Wave Pulse Pattern at Bottom */}
        <div className="flex space-x-2 mt-16">
          {Array.from({ length: 50 }).map((_, i) => (
            <div
              key={i}
              className="w-2 h-8 bg-purple-400 rounded-full animate-pulse shadow-[0_0_15px_rgba(147,51,234,0.6)]"
              style={{
                animationDelay: `${i * 0.1}s`,
                animationDuration: "2s",
              }}
            />
          ))}
        </div>

        {/* Interactive Triangle Buttons */}
        <div className="flex justify-center space-x-32 mt-20">
          {/* Submit Your Film Button */}
          <div className="relative group cursor-pointer transform rotate-45">
            <div className="w-32 h-32 bg-transparent border-2 border-cyan-800 transform rotate-45 flex items-center justify-center shadow-[0_0_20px_rgba(34,211,238,0.6)] hover:shadow-[0_0_30px_rgba(34,211,238,0.8)] transition-all duration-300" style={{ clipPath: 'polygon(50% 0%, 0% 100%, 100% 100%)' }}>
              <div className="transform -rotate-90 text-center">
                <p className="text-white text-sm font-bold">Submit</p>
                <p className="text-white text-sm font-bold">Your Film</p>
              </div>
            </div>
          </div>

          {/* Connect Wallet Button */}
          <div className="relative group cursor-pointer transform rotate-45">
            <div className="w-32 h-32 bg-black border-2 border-blue-800 transform rotate-45 flex items-center justify-center shadow-[0_0_20px_rgba(59,130,246,0.6)] hover:shadow-[0_0_30px_rgba(59,130,246,0.8)] transition-all duration-300" style={{ clipPath: 'polygon(50% 0%, 0% 100%, 100% 100%)' }}>
              <div className="transform -rotate-90 text-center">
                <p className="text-white text-sm font-bold">Connect</p>
                <p className="text-white text-sm font-bold">Wallet</p>
              </div>
            </div>
          </div>

          {/* Presale Info Button */}
          <div className="relative group cursor-pointer transform rotate-45">
            <div className="w-32 h-32 bg-transparent border-2 border-pink-800 transform rotate-45 flex items-center justify-center shadow-[0_0_20px_rgba(236,72,153,0.6)] hover:shadow-[0_0_30px_rgba(236,72,153,0.8)] transition-all duration-300" style={{ clipPath: 'polygon(50% 0%, 0% 100%, 100% 100%)' }}>
              <div className="transform -rotate-90 text-center">
                <p className="text-white text-sm font-bold">Presale</p>
                <p className="text-white text-sm font-bold">Info</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
