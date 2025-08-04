"use client";

import type React from "react";

import Link from "next/link";
import { Film } from "lucide-react";
import { useLanguage } from "@/lib/language-provider";
import Image from "next/image";

export default function Footer() {
  const { t } = useLanguage();

  const currentYear = new Date().getFullYear();

  const handleNavClick = (
    e: React.MouseEvent<HTMLAnchorElement>,
    href: string
  ) => {
    e.preventDefault();

    // Extract the section ID from the href
    const sectionId = href.includes("#") ? href.split("#")[1] : null;

    if (sectionId && typeof document !== "undefined") {
      // Find the section element and scroll to it
      const section = document.getElementById(sectionId);
      if (section) {
        section.scrollIntoView({ behavior: "smooth" });
      }
    } else if (typeof window !== "undefined") {
      // If it's the home link, scroll to top
      window.scrollTo({ top: 0, behavior: "smooth" });
    }
  };

  const scrollToSection = (sectionId: string) => {
    if (typeof document !== "undefined") {
      const section = document.getElementById(sectionId);
      if (section) {
        section.scrollIntoView({ behavior: "smooth" });
      }
    }
  };

  return (
    <footer className="relative w-full border-t overflow-hidden h-[632px]">
      {/* Footer Background */}
      <div className="absolute inset-0 -z-10">
        <Image 
          src="/footer-bg.png" 
          alt="Footer background" 
          fill 
          className="object-cover"
          priority
        />
      </div>
      
      <div className="container py-10 relative z-10 h-[632px] flex flex-col justify-center">
        {/* Legal Information Section */}
        <div className="max-w-3xl mx-auto text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold mb-8 text-white">{t("legal.title")}</h2>
          <p className="text-xl text-white/80 mb-8">{t("legal.subtitle")}</p>

          <div className="flex flex-col sm:flex-row gap-6 justify-center">
            <Link
              href=""
              className="text-lg text-white/80 hover:text-white underline underline-offset-4 transition-colors"
            >
              {t("legal.terms")}
            </Link>
            <Link
              href=""
              className="text-lg text-white/80 hover:text-white underline underline-offset-4 transition-colors"
            >
              {t("legal.privacy")}
            </Link>
            <Link
              href=""
              className="text-lg text-white/80 hover:text-white underline underline-offset-4 transition-colors"
            >
              {t("legal.cookies")}
            </Link>
            <Link
              href=""
              className="text-lg text-white/80 hover:text-white underline underline-offset-4 transition-colors"
            >
              {t("legal.gdpr")}
            </Link>
          </div>
        </div>

        {/* Footer Content */}
        <div className="grid grid-cols-1 gap-8 md:grid-cols-4">
          <div className="flex flex-col gap-2">
            <Link
              href="/"
              className="flex items-center gap-2"
              onClick={(e) => handleNavClick(e, "/")}
            >
              <Image
                src="/logo/main_logo.png"
                alt="Quantum Vision Logo"
                width={24}
                height={24}
                style={{ width: 'auto', height: '36px' }}
              />
            </Link>
            <p className="text-sm text-white/80">
              {t("footer.tagline")}
            </p>
          </div>

          <div>
            <h3 className="mb-3 text-sm font-medium text-white">
              {t("footer.navigation")}
            </h3>
            <ul className="space-y-2 text-sm">
              <li>
                <Link
                  href="/"
                  className="text-white/80 hover:text-white"
                  onClick={(e) => handleNavClick(e, "/")}
                >
                  {t("nav.home")}
                </Link>
              </li>
              <li>
                <Link
                  href="/#categories"
                  className="text-white/80 hover:text-white"
                  onClick={(e) => handleNavClick(e, "/#categories")}
                >
                  {t("nav.categories")}
                </Link>
              </li>
              <li>
                <Link
                  href="/#submit"
                  className="text-white/80 hover:text-white"
                  onClick={(e) => handleNavClick(e, "/#submit")}
                >
                  {t("nav.submit")}
                </Link>
              </li>
              <li>
                <Link
                  href="/#vote"
                  className="text-white/80 hover:text-white"
                  onClick={(e) => handleNavClick(e, "/#vote")}
                >
                  {t("nav.vote")}
                </Link>
              </li>
            </ul>
          </div>

          <div>
            <h3 className="mb-3 text-sm font-medium text-white">{t("footer.legal")}</h3>
            <ul className="space-y-2 text-sm">
              <li>
                <Link
                  href=""
                  className="text-white/80 hover:text-white"
                >
                  {t("legal.terms")}
                </Link>
              </li>
              <li>
                <Link
                  href=""
                  className="text-white/80 hover:text-white"
                >
                  {t("legal.privacy")}
                </Link>
              </li>
              <li>
                <Link
                  href=""
                  className="text-white/80 hover:text-white"
                >
                  {t("legal.cookies")}
                </Link>
              </li>
            </ul>
          </div>

          <div>
            <h3 className="mb-3 text-sm font-medium text-white">{t("footer.connect")}</h3>
            <ul className="space-y-2 text-sm">
              <li>
                <Link
                  href=""
                  className="text-white/80 hover:text-white"
                >
                  Twitter
                </Link>
              </li>
              <li>
                <Link
                  href=""
                  className="text-white/80 hover:text-white"
                >
                  Instagram
                </Link>
              </li>
              <li>
                <Link
                  href=""
                  className="text-white/80 hover:text-white"
                >
                  Facebook
                </Link>
              </li>
              <li>
                <Link
                  href=""
                  className="text-white/80 hover:text-white"
                >
                  Contact Us
                </Link>
              </li>
            </ul>
          </div>
        </div>

        <div className="text-center mt-8 pt-8 border-t border-white/20">
          <p className="text-sm text-white/60">
            © {currentYear} Quantum Vision Filmfest. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
}
