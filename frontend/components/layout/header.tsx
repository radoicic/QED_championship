"use client"

import type React from "react"

import { useState, useEffect } from "react"
import Link from "next/link"
import { usePathname, useRouter } from "next/navigation"
import { Film, Menu, X } from "lucide-react"
import { Button } from "@/components/ui/button"
import { useAuth } from "@/lib/auth-provider"
import { useLanguage } from "@/lib/language-provider"
import LanguageSwitcher from "@/components/layout/language-switcher"
import AuthButtons from "@/components/auth/auth-buttons"
import { ThemeToggle } from "@/components/theme-toggle"
import Image from "next/image"

export default function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const pathname = usePathname()
  const router = useRouter()
  const { user } = useAuth()
  const { t } = useLanguage()

  const toggleMenu = () => setIsMenuOpen(!isMenuOpen)
  const closeMenu = () => setIsMenuOpen(false)

  const navItems = [
    { name: t("nav.home"), href: "/" },
    { name: t("nav.about"), href: "/#about" },
    { name: t("nav.categories"), href: "/#categories" },
    { name: t("nav.submit"), href: "/#submit" },
    { name: t("nav.vote"), href: "/#vote" },
  ]

  const handleNavClick = (e: React.MouseEvent<HTMLAnchorElement>, href: string) => {
    e.preventDefault()
    closeMenu()

    // If we're not on the home page, navigate to home first
    if (pathname !== "/") {
      router.push(href)
      return
    }

    // Extract the section ID from the href
    const sectionId = href.includes("#") ? href.split("#")[1] : null

    if (sectionId && typeof document !== 'undefined') {
      // Find the section element and scroll to it
      const section = document.getElementById(sectionId)
      if (section) {
        section.scrollIntoView({ behavior: "smooth" })
      }
    } else if (typeof window !== 'undefined') {
      // If it's the home link, scroll to top
      window.scrollTo({ top: 0, behavior: "smooth" })
    }
  }

  // Add scroll event listener to highlight active section
  const [activeSection, setActiveSection] = useState("")

  useEffect(() => {
    if (typeof window === 'undefined' || typeof document === 'undefined') return;
    
    const handleScroll = () => {
      if (pathname !== "/") return

      const sections = ["about", "categories", "submit", "vote"]
      const scrollPosition = window.scrollY + 100 // Offset for header

      for (const section of sections) {
        const element = document.getElementById(section)
        if (element) {
          const { offsetTop, offsetHeight } = element
          if (scrollPosition >= offsetTop && scrollPosition < offsetTop + offsetHeight) {
            setActiveSection(section)
            return
          }
        }
      }

      // If no section is active, we're at the top (home)
      setActiveSection("")
    }

    window.addEventListener("scroll", handleScroll)
    handleScroll() // Call once on mount

    return () => {
      window.removeEventListener("scroll", handleScroll)
    }
  }, [pathname])

  const scrollToSection = (section: string) => {
    if (typeof document !== 'undefined') {
      const element = document.getElementById(section)
      if (element) {
        element.scrollIntoView({ behavior: "smooth" })
      }
    }
  }

  return (
    <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container flex h-16 items-center justify-between">
        <div className="flex items-center gap-2">
          <Link href="/" className="flex items-center gap-2" onClick={(e) => handleNavClick(e, "/")}>
            <Image 
              src="https://presale-53df2.web.app/images/logo1.png" 
              alt="Quantum Vision Logo" 
              width={24} 
              height={24} 
              style={{ width: 'auto', height: '180px' }}
            />
            {/* <span className="font-bold">Quantum Vision</span> */}
          </Link>
        </div>

        {/* Desktop Navigation */}
        <nav className="hidden md:flex items-center gap-6">
          {navItems.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              onClick={(e) => handleNavClick(e, item.href)}
              className={`text-sm font-medium transition-colors hover:text-primary ${
                pathname === item.href || (item.href.includes("#") && activeSection === item.href.split("#")[1])
                  ? "text-primary"
                  : "text-muted-foreground"
              }`}
            >
              {item.name}
            </Link>
          ))}
          {/* <ThemeToggle /> */}
          <LanguageSwitcher />
          <AuthButtons />
        </nav>

        {/* Mobile Menu Button */}
        <div className="flex items-center gap-2 md:hidden">
          {/* <ThemeToggle /> */}
          <Button variant="ghost" size="icon" onClick={toggleMenu} aria-label="Toggle menu">
            {isMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
          </Button>
        </div>

        {/* Mobile Navigation */}
        {isMenuOpen && (
          <div className="absolute top-16 left-0 right-0 bg-background border-b md:hidden">
            <nav className="container flex flex-col py-4">
              {navItems.map((item) => (
                <Link
                  key={item.href}
                  href={item.href}
                  onClick={(e) => handleNavClick(e, item.href)}
                  className={`py-2 text-sm font-medium transition-colors hover:text-primary ${
                    pathname === item.href || (item.href.includes("#") && activeSection === item.href.split("#")[1])
                      ? "text-primary"
                      : "text-muted-foreground"
                  }`}
                >
                  {item.name}
                </Link>
              ))}
              <div className="py-2">
                <LanguageSwitcher />
              </div>
              <div className="py-2">
                <AuthButtons />
              </div>
            </nav>
          </div>
        )}
      </div>
    </header>
  )
}
