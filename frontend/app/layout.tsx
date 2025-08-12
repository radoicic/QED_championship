"use client"

import type React from "react"
import { Inter } from "next/font/google"
import "./globals.css"
import { AuthProvider } from "@/lib/auth-provider"
import { LanguageProvider } from "@/lib/language-provider"
import { ThemeProvider } from "@/components/theme-provider"
import { SnackbarProvider } from "notistack"
import { SessionProvider } from "next-auth/react"
import Header from "@/components/layout/header"
// import Footer from "@/components/layout/footer"
import { Toaster } from "@/components/ui/toaster"

const inter = Inter({ subsets: ["latin"] })

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={inter.className}>
        <ThemeProvider
          attribute="class"
          defaultTheme="dark"
          enableSystem={false}
          disableTransitionOnChange
        >
          <LanguageProvider>
            <AuthProvider>
              <SessionProvider>
                <SnackbarProvider
                  maxSnack={3}
                  anchorOrigin={{
                    vertical: 'top',
                    horizontal: 'right',
                  }}
                  autoHideDuration={2000}
                  preventDuplicate
                >
                  <Header />
                  {children}
                  {/* <Footer /> */}
                  <Toaster />
                </SnackbarProvider>
              </SessionProvider>
            </AuthProvider>
          </LanguageProvider>
        </ThemeProvider>
      </body>
    </html>
  )
}