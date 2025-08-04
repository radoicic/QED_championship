"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { useLanguage } from "@/lib/language-provider";
import { useTheme } from "next-themes";
import { cn } from "@/lib/utils";
import { Menu, X, Wallet, User, ChevronDown } from "lucide-react";
import { useSession, signOut } from "next-auth/react";
import UserMenu from "@/components/auth/user-menu";
import LoginDialog from "@/components/auth/login-dialog";
import RegisterDialog from "@/components/auth/register-dialog";
import LanguageSwitcher from "@/components/layout/language-switcher";
import Image from "next/image";

export default function Header() {
  const { t } = useLanguage();
  const { theme, resolvedTheme } = useTheme();
  const { data: session } = useSession();
  const [mounted, setMounted] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isLoginOpen, setIsLoginOpen] = useState(false);
  const [isRegisterOpen, setIsRegisterOpen] = useState(false);

  // Avoid hydration mismatch
  useEffect(() => {
    setMounted(true);
  }, []);

  // Transform session user to match UserMenu props
  const user = session?.user ? {
    id: "1", // Default ID since session.user doesn't have id
    name: session.user.name || "User",
    email: session.user.email || "user@example.com",
    role: "user" as const, // Default role since session.user doesn't have role
    avatar: session.user.image || undefined
  } : null;

  // Don't render until mounted to prevent hydration mismatch
  if (!mounted) {
    return (
      <header className="sticky top-0 z-50 bg-black border-b border-gray-800">
        <div className="container mx-auto px-6 py-4">
          <div className="flex items-center justify-between">
            {/* Logo */}
            <Link href="/" className="flex items-center space-x-4 group">
              <div className="relative w-12 h-12 flex items-center justify-center">
                <div className="absolute inset-0 bg-gradient-to-br from-blue-400 to-purple-600 rounded-lg transform rotate-45"></div>
                <div className="relative z-10 text-white font-bold text-2xl">
                  Q
                </div>
              </div>
              <div className="flex flex-col space-y-1">
                <span className="text-white font-bold text-xl quantum-text-glow">
                  Quantum
                </span>
                <span className="text-blue-300 text-sm font-light tracking-wider">
                  REELS & CRYPTO GALLERY
                </span>
              </div>
            </Link>

            {/* Desktop Navigation */}
            <nav className="hidden md:flex items-center space-x-8">
              <Link 
                href="/" 
                className="text-white hover:text-blue-300 transition-colors duration-200 text-base font-medium"
              >
                {t("nav.home")}
              </Link>
              <Link 
                href="/about" 
                className="text-white hover:text-blue-300 transition-colors duration-200 text-base font-medium"
              >
                About
              </Link>
              <Link 
                href="/categories" 
                className="text-white hover:text-blue-300 transition-colors duration-200 text-base font-medium"
              >
                Categories
              </Link>
              <Link 
                href="/upload" 
                className="text-white hover:text-blue-300 transition-colors duration-200 text-base font-medium"
              >
                {t("nav.submit")}
              </Link>
              <Link 
                href="/videos" 
                className="text-white hover:text-blue-300 transition-colors duration-200 text-base font-medium"
              >
                {t("nav.vote")}
              </Link>
            </nav>

            {/* Right side - Auth and Language */}
            <div className="flex items-center space-x-6">
              {/* Auth Buttons */}
              <div className="flex items-center space-x-6">
                <Button
                  variant="ghost"
                  size="sm"
                  className="text-white hover:text-blue-300 hover:bg-transparent text-base font-medium px-0"
                >
                  {t("auth.login")}
                </Button>
                <Button
                  variant="ghost"
                  size="sm"
                  className="text-white hover:text-blue-300 hover:bg-transparent text-base font-medium px-0"
                >
                  {t("auth.register")}
                </Button>
              </div>

              {/* Language Switcher */}
              <LanguageSwitcher />

              {/* Mobile Menu Button */}
              <Button
                variant="ghost"
                size="sm"
                className="md:hidden text-white hover:text-blue-300"
              >
                <Menu className="w-6 h-6" />
              </Button>
            </div>
          </div>
        </div>
      </header>
    );
  }

  return (
    <header className="sticky top-0 z-50 bg-black border-b border-gray-800">
      <div className="container mx-auto px-6 py-4">
        <div className="flex items-center justify-between">
          {/* Logo */}
          <Link href="/" className="flex items-center space-x-4 group">
            <div className="relative w-12 h-12 flex items-center justify-center">
              <div className="absolute inset-0 bg-gradient-to-br from-blue-400 to-purple-600 rounded-lg transform rotate-45"></div>
              <div className="relative z-10 text-white font-bold text-2xl">
                Q
              </div>
            </div>
            <div className="flex flex-col space-y-1">
              <span className="text-white font-bold text-xl quantum-text-glow">
                Quantum
              </span>
              <span className="text-blue-300 text-sm font-light tracking-wider">
                REELS & CRYPTO GALLERY
              </span>
            </div>
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center space-x-8">
            <Link 
              href="/" 
              className="text-white hover:text-blue-300 transition-colors duration-200 text-base font-medium"
            >
              {t("nav.home")}
            </Link>
            <Link 
              href="/about" 
              className="text-white hover:text-blue-300 transition-colors duration-200 text-base font-medium"
            >
              About
            </Link>
            <Link 
              href="/categories" 
              className="text-white hover:text-blue-300 transition-colors duration-200 text-base font-medium"
            >
              Categories
            </Link>
            <Link 
              href="/upload" 
              className="text-white hover:text-blue-300 transition-colors duration-200 text-base font-medium"
            >
              {t("nav.submit")}
            </Link>
            <Link 
              href="/videos" 
              className="text-white hover:text-blue-300 transition-colors duration-200 text-base font-medium"
            >
              {t("nav.vote")}
            </Link>
          </nav>

          {/* Right side - Auth and Language */}
          <div className="flex items-center space-x-6">
            {/* Auth Buttons */}
            {session ? (
              <UserMenu user={user} />
            ) : (
              <div className="flex items-center space-x-6">
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => setIsLoginOpen(true)}
                  className="text-white hover:text-blue-300 hover:bg-transparent text-base font-medium px-0"
                >
                  {t("auth.login")}
                </Button>
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => setIsRegisterOpen(true)}
                  className="text-white hover:text-blue-300 hover:bg-transparent text-base font-medium px-0"
                >
                  {t("auth.register")}
                </Button>
              </div>
            )}

            {/* Language Switcher */}
            <LanguageSwitcher />

            {/* Mobile Menu Button */}
            <Button
              variant="ghost"
              size="sm"
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="md:hidden text-white hover:text-blue-300"
            >
              {isMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </Button>
          </div>
        </div>

        {/* Mobile Navigation */}
        {isMenuOpen && (
          <div className="md:hidden mt-4 pb-4 border-t border-gray-800">
            <nav className="flex flex-col space-y-4 pt-4">
              <Link 
                href="/" 
                className="text-white hover:text-blue-300 transition-colors duration-200 text-base font-medium"
                onClick={() => setIsMenuOpen(false)}
              >
                {t("nav.home")}
              </Link>
              <Link 
                href="/about" 
                className="text-white hover:text-blue-300 transition-colors duration-200 text-base font-medium"
                onClick={() => setIsMenuOpen(false)}
              >
                About
              </Link>
              <Link 
                href="/categories" 
                className="text-white hover:text-blue-300 transition-colors duration-200 text-base font-medium"
                onClick={() => setIsMenuOpen(false)}
              >
                Categories
              </Link>
              <Link 
                href="/upload" 
                className="text-white hover:text-blue-300 transition-colors duration-200 text-base font-medium"
                onClick={() => setIsMenuOpen(false)}
              >
                {t("nav.submit")}
              </Link>
              <Link 
                href="/videos" 
                className="text-white hover:text-blue-300 transition-colors duration-200 text-base font-medium"
                onClick={() => setIsMenuOpen(false)}
              >
                {t("nav.vote")}
              </Link>
            </nav>
          </div>
        )}
      </div>

      {/* Auth Dialogs */}
      <LoginDialog open={isLoginOpen} onOpenChange={setIsLoginOpen} />
      <RegisterDialog open={isRegisterOpen} onOpenChange={setIsRegisterOpen} />
    </header>
  );
}
