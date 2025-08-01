"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { useLanguage } from "@/lib/language-provider"
import { useAuth } from "@/lib/auth-provider"
import LoginDialog from "@/components/auth/login-dialog"
import RegisterDialog from "@/components/auth/register-dialog"
import UserMenu from "@/components/auth/user-menu"

export default function AuthButtons() {
  const { t } = useLanguage()
  const { user } = useAuth()
  const [showLoginDialog, setShowLoginDialog] = useState(false)
  const [showRegisterDialog, setShowRegisterDialog] = useState(false)

  if (user) {
    return <UserMenu user={user} />
  }

  return (
    <>
      <div className="flex items-center gap-2">
        <Button variant="ghost" onClick={() => setShowLoginDialog(true)}>
          {t("auth.login")}
        </Button>
        <Button onClick={() => setShowRegisterDialog(true)}>{t("auth.register")}</Button>
      </div>

      <LoginDialog
        open={showLoginDialog}
        onOpenChange={setShowLoginDialog}
        onRegisterClick={() => {
          setShowLoginDialog(false)
          setShowRegisterDialog(true)
        }}
      />

      <RegisterDialog
        open={showRegisterDialog}
        onOpenChange={setShowRegisterDialog}
        onLoginClick={() => {
          setShowRegisterDialog(false)
          setShowLoginDialog(true)
        }}
      />
    </>
  )
}
