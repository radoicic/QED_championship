"use client";

import { useState, useEffect } from "react";
import { Wallet, Info, ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useLanguage } from "@/lib/language-provider";
import { useTheme } from "next-themes";
import { cn } from "@/lib/utils";
import Image from "next/image";

export default function Hero() {
  const { t } = useLanguage();
  const { theme, resolvedTheme } = useTheme();
  const [mounted, setMounted] = useState(false);
  const [isConnecting, setIsConnecting] = useState(false);

  // Avoid hydration mismatch
  useEffect(() => {
    setMounted(true);
  }, []);

  const handleConnectWallet = () => {
    setIsConnecting(true);
    // Simulate wallet connection
    setTimeout(() => {
      setIsConnecting(false);
      // Show success message or redirect
    }, 1500);
  };

  // Determine if we're in dark mode
  const isDarkMode = mounted && (resolvedTheme === "dark" || theme === "dark");

  return (
    <section className="relative w-full min-h-[90vh] flex flex-col items-center justify-center text-center px-4 overflow-hidden">
      {/* Background image */}
      <div className="absolute inset-0 -z-10">
        {/* <div className="absolute inset-0 bg-black/40 z-10"></div> Overlay for better text readability */}
        <div className="absolute inset-0">
          <Image 
            src="/hero-bg.png" 
            alt="Hero background" 
            fill 
            priority
            className="object-cover"
          />
        </div>
      </div>

      <div className="max-w-3xl mx-auto z-10">
        {/* Logo */}
        <div className="mb-6 relative w-48 h-32 mx-auto">
          <div className="absolute inset-[15%] flex items-center justify-center">
            <Image
              src="/logo/quantum.png"
              alt="Quantum Vision Logo"
              width={24}
              height={24}
              style={{ width: "auto", height: "150%" }}
            />
          </div>
        </div>

        {/* Title */}
        <h1 className="text-4xl font-extrabold tracking-tight sm:text-5xl md:text-6xl lg:text-7xl mb-4 text-white">
          {t("hero.title")}
        </h1>

        {/* Subtitle */}
        <p className="text-xl mb-10 max-w-2xl mx-auto text-slate-100">
          {t("hero.subtitle")}
        </p>

        {/* Enhanced buttons with fantastic effects */}
        <div className="flex flex-wrap justify-center gap-6">
          <Button
            size="lg"
            className={cn(
              "relative px-8 py-6 text-white font-medium text-lg",
              "border border-blue-300/50 rounded-full",
              "shadow-[0_0_30px_rgba(59,130,246,0.8)]",
              "transition-all duration-300 hover:shadow-[0_0_40px_rgba(59,130,246,0.9)] hover:scale-105",
              "overflow-hidden group"
            )}
            style={{
              WebkitBackdropFilter: "blur(8px)",
              backdropFilter: "blur(8px)",
            }}
          >
            <span className="absolute inset-0 bg-gradient-to-r from-transparent via-blue-300/20 to-transparent translate-x-[-100%] group-hover:translate-x-[100%] transition-all duration-1000"></span>
            <span className="flex items-center justify-center">
              {t("hero.submit_button")} <ArrowRight className="ml-2 h-5 w-5 animate-pulse" />
            </span>
          </Button>

          <Button
            size="lg"
            onClick={handleConnectWallet}
            disabled={isConnecting}
            className={cn(
              "relative px-8 py-6 text-white font-medium text-lg",
              "border border-indigo-300/50 rounded-full",
              "shadow-[0_0_30px_rgba(79,70,229,0.8)]",
              "transition-all duration-300 hover:shadow-[0_0_40px_rgba(79,70,229,0.9)] hover:scale-105",
              "overflow-hidden group"
            )}
            style={{
              WebkitBackdropFilter: "blur(8px)",
              backdropFilter: "blur(8px)",
            }}
          >
            <span className="absolute inset-0 bg-gradient-to-r from-transparent via-indigo-300/20 to-transparent translate-x-[-100%] group-hover:translate-x-[100%] transition-all duration-1000"></span>
            <span className="flex items-center justify-center">
              <Wallet className={cn("mr-2 h-5 w-5", isConnecting ? "animate-spin" : "")} />
              {isConnecting ? t("auth.connecting") : t("auth.connect_wallet")}
            </span>
          </Button>

          <Button
            size="lg"
            className={cn(
              "relative px-8 py-6 text-white font-medium text-lg",
              "border border-purple-300/50 rounded-full",
              "shadow-[0_0_30px_rgba(147,51,234,0.8)]",
              "transition-all duration-300 hover:shadow-[0_0_40px_rgba(147,51,234,0.9)] hover:scale-105",
              "overflow-hidden group"
            )}
            style={{
              WebkitBackdropFilter: "blur(8px)",
              backdropFilter: "blur(8px)",
            }}
          >
            <span className="absolute inset-0 bg-gradient-to-r from-transparent via-fuchsia-300/20 to-transparent translate-x-[-100%] group-hover:translate-x-[100%] transition-all duration-1000"></span>
            <span className="flex items-center justify-center">
              <Info className="mr-2 h-5 w-5 animate-pulse" />
              {t("hero.presale_info")}
            </span>
          </Button>
        </div>
      </div>
    </section>
  );
}
