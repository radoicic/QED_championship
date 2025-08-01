"use client"

import { useState, useEffect } from "react"
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import { z } from "zod"
import { Loader2, Wallet, Eye, EyeOff } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { useLanguage } from "@/lib/language-provider"
import { useTheme } from "next-themes"
import { cn } from "@/lib/utils"
import Image from "next/image"
import api, { handleAuthResponse } from "@/lib/api"
import { useRouter } from "next/navigation"
import { useSnackbar } from "notistack"
import { useAuth } from "@/lib/auth-provider"

interface LoginDialogProps {
  open: boolean
  onOpenChange: (open: boolean) => void
  onRegisterClick?: () => void
}

const emailFormSchema = z.object({
  email: z.string().email("Please enter a valid email address"),
})

const passwordFormSchema = z.object({
  email: z.string().email(),
  password: z.string().min(6, "Password must be at least 6 characters"),
})

type EmailFormValues = z.infer<typeof emailFormSchema>
type PasswordFormValues = z.infer<typeof passwordFormSchema>

export default function LoginDialog({ open, onOpenChange, onRegisterClick }: LoginDialogProps) {
  const { t } = useLanguage()
  const { enqueueSnackbar } = useSnackbar()
  const router = useRouter()
  const { updateUser } = useAuth()
  const [isLoading, setIsLoading] = useState(false)
  const [showPassword, setShowPassword] = useState(false)
  const [showPasswordField, setShowPasswordField] = useState(false)
  const { resolvedTheme } = useTheme()
  const [mounted, setMounted] = useState(false)

  // Avoid hydration mismatch
  useEffect(() => {
    setMounted(true)
  }, [])

  // Determine if we're in dark mode
  const isDarkMode = mounted && resolvedTheme === "dark"

  const emailForm = useForm<EmailFormValues>({
    resolver: zodResolver(emailFormSchema),
    defaultValues: {
      email: "",
    },
  })

  const passwordForm = useForm<PasswordFormValues>({
    resolver: zodResolver(passwordFormSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  })

  const onEmailSubmit = async (values: EmailFormValues) => {
    setIsLoading(true)

    try {
      // Check if email exists
      const response = await api.post('/auth/verify', { email: values.email })

      if (response.status === 200) {
        setShowPasswordField(true)
        passwordForm.setValue("email", values.email)
        // enqueueSnackbar(t("auth.email_found"), { variant: "success", autoHideDuration: 2000 })
      } else {
        enqueueSnackbar(t("auth.email_not_found"), { variant: "error", autoHideDuration: 2000 })
      }
    } catch (error) {
      enqueueSnackbar(t("auth.something_went_wrong"), { variant: "error", autoHideDuration: 2000 })
    } finally {
      setIsLoading(false)
    }
  }

  const onPasswordSubmit = async (values: PasswordFormValues) => {
    setIsLoading(true)

    try {
      const response = await api.post('/auth/login', values)
      const data = response.data
      console.log(data);

      // Store token and user data
      localStorage.setItem('token', data.token)
      localStorage.setItem('user', JSON.stringify(data.user))
      
      // Update auth context
      updateUser(data.user)
      
      enqueueSnackbar(t("auth.welcome_back"), { variant: "success", autoHideDuration: 2000 })
      onOpenChange(false)
    } catch (error) {
      enqueueSnackbar(
        error instanceof Error ? error.message : t("auth.invalid_credentials"),
        { variant: "error" }
      )
    } finally {
      setIsLoading(false)
    }
  }

  const handleWalletConnect = async () => {
    setIsLoading(true)

    // Simulate wallet connection
    setTimeout(() => {
      enqueueSnackbar(t("auth.wallet_connected_desc"), { variant: "success", autoHideDuration: 2000 })
      setIsLoading(false)
      onOpenChange(false)
    }, 1500)
  }

  const handleGoogleLogin = async () => {
    setIsLoading(true)

    // Simulate Google login
    setTimeout(() => {
      enqueueSnackbar(t("auth.google_login_desc"), { variant: "success", autoHideDuration: 2000 })
      setIsLoading(false)
      onOpenChange(false)
    }, 1500)
  }

  // Reset state when dialog opens/closes
  useEffect(() => {
    if (!open) {
      setShowPasswordField(false)
      emailForm.reset()
      passwordForm.reset()
    }
  }, [open, emailForm, passwordForm])

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-md p-0 overflow-hidden border-none bg-transparent shadow-none">
        <DialogHeader>
          <DialogTitle className="sr-only">{t("auth.login_title")}</DialogTitle>
        </DialogHeader>
        <div className="relative w-full overflow-hidden">
          {/* Background with light/dark mode support */}
          <div className="absolute inset-0 -z-10">
            {/* Dark mode background */}
            <div
              className={cn(
                "absolute inset-0 bg-[#050924] transition-opacity duration-500 rounded-xl",
                isDarkMode ? "opacity-100" : "opacity-0",
              )}
            >
              {/* Glowing rays */}
              <div className="absolute inset-0 overflow-hidden">
                <div className="absolute bottom-0 left-0 w-full h-[70%] opacity-40">
                  {/* Blue ray */}
                  <div
                    className="absolute bottom-0 left-[30%] w-[1px] h-full bg-blue-500 blur-[3px]"
                    style={{ boxShadow: "0 0 15px 3px #3b82f6, 0 0 30px 5px rgba(59, 130, 246, 0.3)" }}
                  ></div>

                  {/* Purple ray */}
                  <div
                    className="absolute bottom-0 left-[60%] w-[1px] h-full bg-purple-500 blur-[3px]"
                    style={{ boxShadow: "0 0 15px 3px #8b5cf6, 0 0 30px 5px rgba(139, 92, 246, 0.3)" }}
                  ></div>

                  {/* Orange ray */}
                  <div
                    className="absolute bottom-0 left-[80%] w-[1px] h-full bg-orange-500 blur-[3px]"
                    style={{ boxShadow: "0 0 15px 3px #f97316, 0 0 30px 5px rgba(249, 115, 22, 0.3)" }}
                  ></div>
                </div>
              </div>
            </div>

            {/* Light mode background */}
            <div
              className={cn(
                "absolute inset-0 bg-gradient-to-b from-slate-100 to-blue-50 transition-opacity duration-500 rounded-xl",
                isDarkMode ? "opacity-0" : "opacity-100",
              )}
            >
              {/* Subtle rays for light mode */}
              <div className="absolute inset-0 overflow-hidden opacity-20">
                <div className="absolute bottom-0 left-0 w-full h-[70%]">
                  <div className="absolute bottom-0 left-[30%] w-[1px] h-full bg-blue-500 blur-[2px]"></div>
                  <div className="absolute bottom-0 left-[60%] w-[1px] h-full bg-purple-500 blur-[2px]"></div>
                  <div className="absolute bottom-0 left-[80%] w-[1px] h-full bg-orange-500 blur-[2px]"></div>
                </div>
              </div>
            </div>
          </div>

          <div
            className={cn(
              "relative p-8 rounded-xl backdrop-blur-md border",
              isDarkMode ? "bg-slate-900/90 border-slate-700/50" : "bg-white/90 border-slate-200 shadow-lg",
            )}
          >
            <div className="flex flex-col items-center mb-6">
              {/* Logo */}
              {/* <div
                className={cn(
                  "w-16 h-16 rounded-full flex items-center justify-center mb-4",
                  isDarkMode ? "border border-purple-400/50" : "border border-purple-500/30",
                )}
              > */}
                <Image
                  src="/logo/simple_logo.png"
                  alt="Quantum Vision Logo"
                  width={48}
                  height={48}
                  style={{ width: "auto", height: "48px" }}
                />

                {/* <div className="w-12 h-12 rounded-full bg-transparent flex items-center justify-center">
                  <svg
                    viewBox="0 0 24 24"
                    width="24"
                    height="24"
                    stroke="currentColor"
                    strokeWidth="2"
                    fill="none"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    className={isDarkMode ? "text-purple-400" : "text-purple-600"}
                  >
                    <path d="M2 12h2l4 4 4-8 3 4h3"></path>
                    <circle cx="12" cy="12" r="10"></circle>
                  </svg>
                </div> */}
              {/* </div> */}
              <h2 className={cn("text-2xl font-bold mb-6", isDarkMode ? "text-white" : "text-slate-800")}>
                Quantum Vision
              </h2>
            </div>

            {!showPasswordField ? (
              <Form {...emailForm}>
                <form onSubmit={emailForm.handleSubmit(onEmailSubmit)} className="space-y-4">
                  <FormField
                    control={emailForm.control}
                    name="email"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel className={isDarkMode ? "text-slate-300" : "text-slate-700"}>
                          {t("auth.email")}
                        </FormLabel>
                        <FormControl>
                          <Input
                            placeholder={t("auth.email_placeholder")}
                            className={cn(
                              isDarkMode
                                ? "bg-slate-800/50 border-slate-700 text-white"
                                : "bg-white border-slate-200 text-slate-900",
                            )}
                            {...field}
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <Button
                    type="submit"
                    disabled={isLoading}
                    className="w-full bg-purple-600 hover:bg-purple-700 text-white font-medium"
                  >
                    {isLoading ? <Loader2 className="mr-2 h-4 w-4 animate-spin" /> : null}
                    {t("auth.continue")}
                  </Button>
                </form>
              </Form>
            ) : (
              <Form {...passwordForm}>
                <form onSubmit={passwordForm.handleSubmit(onPasswordSubmit)} className="space-y-4">
                  <FormField
                    control={passwordForm.control}
                    name="email"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel className={isDarkMode ? "text-slate-300" : "text-slate-700"}>
                          {t("auth.email")}
                        </FormLabel>
                        <FormControl>
                          <Input
                            disabled
                            className={cn(
                              isDarkMode
                                ? "bg-slate-800/50 border-slate-700 text-white"
                                : "bg-slate-100 border-slate-200 text-slate-900",
                            )}
                            {...field}
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={passwordForm.control}
                    name="password"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel className={isDarkMode ? "text-slate-300" : "text-slate-700"}>
                          {t("auth.password")}
                        </FormLabel>
                        <FormControl>
                          <div className="relative">
                            <Input
                              type={showPassword ? "text" : "password"}
                              className={cn(
                                isDarkMode
                                  ? "bg-slate-800/50 border-slate-700 text-white pr-10"
                                  : "bg-white border-slate-200 text-slate-900 pr-10",
                              )}
                              {...field}
                            />
                            <Button
                              type="button"
                              variant="ghost"
                              size="sm"
                              className="absolute right-0 top-0 h-full px-3 py-2 hover:bg-transparent"
                              onClick={() => setShowPassword(!showPassword)}
                            >
                              {showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                              <span className="sr-only">
                                {showPassword ? t("auth.hide_password") : t("auth.show_password")}
                              </span>
                            </Button>
                          </div>
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <div className="flex justify-between">
                    <Button
                      type="button"
                      variant="ghost"
                      size="sm"
                      className={isDarkMode ? "text-slate-400" : "text-slate-600"}
                      onClick={() => setShowPasswordField(false)}
                    >
                      {t("auth.back")}
                    </Button>
                    <Button
                      type="button"
                      variant="ghost"
                      size="sm"
                      className={isDarkMode ? "text-slate-400" : "text-slate-600"}
                    >
                      {t("auth.forgot_password")}
                    </Button>
                  </div>

                  <Button
                    type="submit"
                    disabled={isLoading}
                    className="w-full bg-purple-600 hover:bg-purple-700 text-white font-medium"
                  >
                    {isLoading ? <Loader2 className="mr-2 h-4 w-4 animate-spin" /> : null}
                    {t("auth.login")}
                  </Button>
                </form>
              </Form>
            )}

            <div className="relative flex items-center justify-center my-6">
              <div className="absolute inset-0 flex items-center">
                <div className={cn("w-full border-t", isDarkMode ? "border-slate-700" : "border-slate-300")}></div>
              </div>
              <div
                className={cn(
                  "relative px-4 text-sm",
                  isDarkMode ? "text-slate-400 bg-slate-900/90" : "text-slate-500 bg-white/90",
                )}
              >
                {t("auth.or")}
              </div>
            </div>

            <div className="space-y-3">
              <Button
                type="button"
                variant="outline"
                onClick={handleWalletConnect}
                disabled={isLoading}
                className={cn(
                  "w-full",
                  isDarkMode
                    ? "border-slate-700 text-white hover:bg-slate-800 hover:text-white"
                    : "border-slate-300 text-slate-800 hover:bg-slate-100",
                )}
              >
                <Wallet className="mr-2 h-4 w-4" />
                {t("auth.connect_wallet")}
              </Button>

              <Button
                type="button"
                variant="outline"
                onClick={handleGoogleLogin}
                disabled={isLoading}
                className={cn(
                  "w-full",
                  isDarkMode
                    ? "border-slate-700 text-white hover:bg-slate-800 hover:text-white"
                    : "border-slate-300 text-slate-800 hover:bg-slate-100",
                )}
              >
                <svg className="mr-2 h-4 w-4" viewBox="0 0 24 24">
                  <path
                    d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
                    fill="#4285F4"
                  />
                  <path
                    d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
                    fill="#34A853"
                  />
                  <path
                    d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"
                    fill="#FBBC05"
                  />
                  <path
                    d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"
                    fill="#EA4335"
                  />
                </svg>
                Google
              </Button>
            </div>

            <div className="mt-8 text-center">
              <div className="flex justify-center space-x-6 text-sm">
                <a
                  href="/terms"
                  className={isDarkMode ? "text-slate-400 hover:text-white" : "text-slate-500 hover:text-slate-900"}
                >
                  Terms
                </a>
                <a
                  href="/privacy"
                  className={isDarkMode ? "text-slate-400 hover:text-white" : "text-slate-500 hover:text-slate-900"}
                >
                  Privacy
                </a>
                <a
                  href="/help"
                  className={isDarkMode ? "text-slate-400 hover:text-white" : "text-slate-500 hover:text-slate-900"}
                >
                  Help
                </a>
              </div>
            </div>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  )
}
