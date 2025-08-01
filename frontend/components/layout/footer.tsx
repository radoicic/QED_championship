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
    <footer className="w-full border-t bg-background">
      <div className="container py-10">
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
              {/* <span className="font-bold">Quantum Vision</span> */}
            </Link>
            <p className="text-sm text-muted-foreground">
              {t("footer.tagline")}
            </p>
          </div>

          <div>
            <h3 className="mb-3 text-sm font-medium">
              {t("footer.navigation")}
            </h3>
            <ul className="space-y-2 text-sm">
              <li>
                <Link
                  href="/"
                  className="text-muted-foreground hover:text-foreground"
                  onClick={(e) => handleNavClick(e, "/")}
                >
                  {t("nav.home")}
                </Link>
              </li>
              <li>
                <Link
                  href="/#categories"
                  className="text-muted-foreground hover:text-foreground"
                  onClick={(e) => handleNavClick(e, "/#categories")}
                >
                  {t("nav.categories")}
                </Link>
              </li>
              <li>
                <Link
                  href="/#submit"
                  className="text-muted-foreground hover:text-foreground"
                  onClick={(e) => handleNavClick(e, "/#submit")}
                >
                  {t("nav.submit")}
                </Link>
              </li>
              <li>
                <Link
                  href="/#vote"
                  className="text-muted-foreground hover:text-foreground"
                  onClick={(e) => handleNavClick(e, "/#vote")}
                >
                  {t("nav.vote")}
                </Link>
              </li>
            </ul>
          </div>

          <div>
            <h3 className="mb-3 text-sm font-medium">{t("footer.legal")}</h3>
            <ul className="space-y-2 text-sm">
              <li>
                <Link
                  // href="/terms"
                  href=""
                  className="text-muted-foreground hover:text-foreground"
                >
                  {t("footer.terms")}
                </Link>
              </li>
              <li>
                <Link
                  // href="/privacy"
                  href=""
                  className="text-muted-foreground hover:text-foreground"
                >
                  {t("footer.privacy")}
                </Link>
              </li>
              <li>
                <Link
                  // href="/cookies"
                  href=""
                  className="text-muted-foreground hover:text-foreground"
                >
                  {t("footer.cookies")}
                </Link>
              </li>
            </ul>
          </div>

          <div>
            <h3 className="mb-3 text-sm font-medium">{t("footer.connect")}</h3>
            <ul className="space-y-2 text-sm">
              <li>
                <Link
                  href="https://twitter.com/quantumvision"
                  className="text-muted-foreground hover:text-foreground"
                >
                  Twitter
                </Link>
              </li>
              <li>
                <Link
                  href="https://instagram.com/quantumvision"
                  className="text-muted-foreground hover:text-foreground"
                >
                  Instagram
                </Link>
              </li>
              <li>
                <Link
                  href="https://facebook.com/quantumvision"
                  className="text-muted-foreground hover:text-foreground"
                >
                  Facebook
                </Link>
              </li>
              <li>
                <Link
                  href="mailto:info@quantumvision.com"
                  className="text-muted-foreground hover:text-foreground"
                >
                  {t("footer.contact")}
                </Link>
              </li>
            </ul>
          </div>
        </div>

        <div className="mt-10 border-t pt-6 text-center text-sm text-muted-foreground">
          <p>
            &copy; {currentYear} Quantum Vision Filmfest. {t("footer.rights")}
          </p>
        </div>
      </div>
    </footer>
  );
}
