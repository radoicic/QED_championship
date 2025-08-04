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
    <section className="relative w-full overflow-hidden" style={{ height: '800px' }}>
      <div className="absolute inset-0 -z-10">
        <Image 
          src="/hero-bg.png" 
          alt="Hero background" 
          fill 
          className="object-cover"
          priority
        />
      </div>
      
      <div className="container mx-auto px-4 text-center relative z-10 h-full flex flex-col justify-center">
        <div className="max-w-6xl mx-auto">
          <div className="flex justify-center mb-16">
            <div className="relative">
              <div className="w-32 h-32 bg-gradient-to-br from-blue-400 to-purple-600 rounded-lg flex items-center justify-center neon-glow-blue">
                <span className="text-6xl font-bold text-white">Q</span>
              </div>
              <div className="absolute -inset-4 bg-gradient-to-br from-blue-400 to-purple-600 rounded-lg blur-lg opacity-50"></div>
            </div>
          </div>

          <h1 className="text-8xl md:text-9xl font-bold mb-12 quantum-text-glow">
            <span className="bg-gradient-to-r from-blue-400 to-teal-400 bg-clip-text text-transparent">
              Discover and Vote
            </span>
            <br />
            <span className="text-4xl md:text-5xl text-white/90 font-medium">
              and
            </span>
          </h1>

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
