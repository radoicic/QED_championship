"use client"

import Link from "next/link"
import { useLanguage } from "@/lib/language-provider"
import Image from "next/image"

export default function LegalSection() {
  const { t } = useLanguage()

  return (
    <section className="relative w-full min-h-screen overflow-hidden">
      {/* Footer Background */}
      <div className="absolute inset-0 -z-10">
        <Image 
          src="/footer-bg.png" 
          alt="Legal section background" 
          fill 
          className="object-cover"
          priority
        />
      </div>
      
      <div className="container flex items-center justify-center min-h-screen">
        <div className="max-w-3xl mx-auto text-center z-10">
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
      </div>
    </section>
  )
}
