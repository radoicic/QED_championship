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
          </div>
        </div>

        {/* Interactive Triangle Buttons */}
        <div className="flex justify-center space-x-48" style={{ marginTop: '700px' }}>
          {/* Submit Your Film Button */}
          <div className="relative group cursor-pointer transform rotate-45">
            <div className="w-40 h-40 bg-transparent border-4 border-cyan-300 transform rotate-45 flex items-center justify-center shadow-[0_0_20px_rgba(34,211,238,0.8)] hover:shadow-[0_0_40px_rgba(34,211,238,1)] hover:border-cyan-200 transition-all duration-300 hover:scale-110" style={{ clipPath: 'polygon(50% 0%, 0% 100%, 100% 100%)' }}>
              <div className="transform -rotate-90 text-center">
                <p className="text-white text-sm font-bold group-hover:text-cyan-300 transition-colors duration-300">Submit</p>
                <p className="text-white text-sm font-bold group-hover:text-cyan-300 transition-colors duration-300">Your Film</p>
              </div>
            </div>
          </div>

          {/* Connect Wallet Button */}
          <div className="relative group cursor-pointer transform rotate-45">
            <div className="w-40 h-40 bg-black border-2 border-blue-400 transform rotate-45 flex items-center justify-center shadow-[0_0_20px_rgba(59,130,246,0.8)] hover:shadow-[0_0_40px_rgba(59,130,246,1)] hover:border-blue-300 transition-all duration-300 hover:scale-110" style={{ clipPath: 'polygon(50% 0%, 0% 100%, 100% 100%)' }}>
              <div className="transform -rotate-90 text-center">
                <p className="text-white text-sm font-bold group-hover:text-blue-300 transition-colors duration-300">Connect</p>
                <p className="text-white text-sm font-bold group-hover:text-blue-300 transition-colors duration-300">Wallet</p>
              </div>
            </div>
          </div>

          {/* Presale Info Button */}
          <div className="relative group cursor-pointer transform rotate-45">
            <div className="w-40 h-40 bg-transparent border-4 border-pink-300 transform rotate-45 flex items-center justify-center shadow-[0_0_20px_rgba(236,72,153,0.8)] hover:shadow-[0_0_40px_rgba(236,72,153,1)] hover:border-pink-200 transition-all duration-300 hover:scale-110" style={{ clipPath: 'polygon(50% 0%, 0% 100%, 100% 100%)' }}>
              <div className="transform -rotate-90 text-center">
                <p className="text-white text-sm font-bold group-hover:text-pink-300 transition-colors duration-300">Presale</p>
                <p className="text-white text-sm font-bold group-hover:text-pink-300 transition-colors duration-300">Info</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
