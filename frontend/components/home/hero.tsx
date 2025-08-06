"use client";

import { useState, useEffect } from "react";
import { Play } from "lucide-react";
import { useLanguage } from "@/lib/language-provider";
import { useTheme } from "next-themes";
import Image from "next/image";
import { Button } from "@/components/ui/button";

export default function Hero() {
  const { t } = useLanguage();
  const { theme, resolvedTheme } = useTheme();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  const isDarkMode = mounted && (resolvedTheme === "dark" || theme === "dark");

  return (
    <section className="relative w-full overflow-hidden" style={{ height: '998px' }}>
      <div className="absolute inset-0 -z-10">
        <Image 
          src="/hero-bg.png" 
          alt="Hero background" 
          fill 
          className="object-cover"
          priority
        />
      </div>
      
      <div className="container mx-auto px-4 text-center relative z-10 h-full flex flex-col justify-center min-h-screen">
        <div className="max-w-6xl mx-auto">
          {/* Q logo removed */}

          <h1 className="text-7xl md:text-9xl font-bold mb-12 quantum-text-glow mt-96">
            <span className="bg-gradient-to-r from-blue-400 to-teal-400 bg-clip-text text-transparent">
              Discover and Vote
            </span>
          </h1>

          {/* Subtitle Text */}
          <div className="text-center mb-16">
            {/* <p className="text-2xl md:text-3xl text-white/80 font-medium mb-4">
              Experience the future of filmmaking
            </p> */}
            <p className="text-lg md:text-xl text-white/60 font-light">
              for the most innovtaive reel videos around the world
            </p>
          </div>

          {/* Call-to-Action Buttons */}
          <div className="flex justify-center mb-16">
            <div className="flex flex-col md:flex-row gap-4">
              <Button 
                size="lg"
                className="bg-transparent border-2 border-green-400 text-green-400 hover:bg-green-400 hover:text-black px-8 py-4 text-lg font-bold rounded-full shadow-[0_0_30px_rgba(34,197,94,0.6)] hover:shadow-[0_0_40px_rgba(34,197,94,0.8)] transition-all duration-300"
              >
                Submit Your Film
              </Button>
              <Button 
                size="lg"
                className="bg-transparent border-2 border-blue-400 text-blue-400 hover:bg-blue-400 hover:text-black px-8 py-4 text-lg font-bold rounded-full shadow-[0_0_30px_rgba(59,130,246,0.6)] hover:shadow-[0_0_40px_rgba(59,130,246,0.8)] transition-all duration-300"
              >
                Connect Wallet
              </Button>
              <Button 
                size="lg"
                className="bg-transparent border-2 border-purple-400 text-purple-400 hover:bg-purple-400 hover:text-black px-8 py-4 text-lg font-bold rounded-full shadow-[0_0_30px_rgba(147,51,234,0.6)] hover:shadow-[0_0_40px_rgba(147,51,234,0.8)] transition-all duration-300"
              >
                Presale Info
              </Button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
