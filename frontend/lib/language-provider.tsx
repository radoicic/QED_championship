"use client"

import type React from "react"
import { createContext, useContext, useEffect, useState } from "react"
import { translations, Language } from "./translations"

type TranslationKey = keyof typeof translations.en

type LanguageContextType = {
  language: Language
  setLanguage: (language: Language) => void
  t: (key: string, params?: Record<string, any>) => string
  languages: { code: Language; name: string }[]
}

const LanguageContext = createContext<LanguageContextType | undefined>(undefined)

export function LanguageProvider({ children }: { children: React.ReactNode }) {
  const [language, setLanguage] = useState<Language>("en")

  useEffect(() => {
    // Check if language preference is stored
    const storedLanguage = localStorage.getItem("language") as Language
    if (storedLanguage && Object.keys(translations).includes(storedLanguage)) {
      setLanguage(storedLanguage)
    }
  }, [])

  const changeLanguage = (newLanguage: Language) => {
    setLanguage(newLanguage)
    localStorage.setItem("language", newLanguage)
  }

  const t = (key: string, params?: Record<string, any>): string => {
    const keys = key.split(".")
    let value: any = translations[language]

    for (const k of keys) {
      if (value[k] === undefined) {
        console.warn(`Translation key not found: ${key}`)
        return key
      }
      value = value[k]
    }

    if (typeof value !== "string") {
      console.warn(`Translation value is not a string: ${key}`)
      return key
    }

    if (params) {
      return Object.entries(params).reduce((acc, [paramKey, paramValue]) => {
        return acc.replace(new RegExp(`{{${paramKey}}}`, "g"), String(paramValue))
      }, value)
    }

    return value
  }

  const languages: { code: Language; name: string }[] = [
    { code: "en", name: "English" },
    { code: "es", name: "Español" },
    { code: "zh", name: "中文" },
  ]

  return (
    <LanguageContext.Provider value={{ language, setLanguage: changeLanguage, t, languages }}>
      {children}
    </LanguageContext.Provider>
  )
}

export function useLanguage() {
  const context = useContext(LanguageContext)
  if (context === undefined) {
    throw new Error("useLanguage must be used within a LanguageProvider")
  }
  return context
}
