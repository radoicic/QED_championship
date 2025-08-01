"use client"

import Link from "next/link"
import { useLanguage } from "@/lib/language-provider"

export default function LegalSection() {
  const { t } = useLanguage()

  return (
    <section className="w-full py-12 bg-muted/30">
      <div className="container">
        <div className="max-w-3xl mx-auto text-center">
          <h2 className="text-2xl font-bold tracking-tight mb-4">{t("legal.title")}</h2>
          <p className="text-muted-foreground mb-6">{t("legal.subtitle")}</p>

          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              // href="/terms"
              href=""
              className="text-sm text-muted-foreground hover:text-foreground underline underline-offset-4"
            >
              {t("legal.terms")}
            </Link>
            <Link
              // href="/privacy"
              href=""
              className="text-sm text-muted-foreground hover:text-foreground underline underline-offset-4"
            >
              {t("legal.privacy")}
            </Link>
            <Link
              // href="/cookies"
              href=""
              className="text-sm text-muted-foreground hover:text-foreground underline underline-offset-4"
            >
              {t("legal.cookies")}
            </Link>
            <Link
              // href="/gdpr"
              href=""
              className="text-sm text-muted-foreground hover:text-foreground underline underline-offset-4"
            >
              {t("legal.gdpr")}
            </Link>
          </div>
        </div>
      </div>
    </section>
  )
}
