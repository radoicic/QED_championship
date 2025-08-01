"use client"

import { useState } from "react"
import Link from "next/link"
import { LogOut, Settings, Upload, User } from "lucide-react"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Button } from "@/components/ui/button"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { useLanguage } from "@/lib/language-provider"
import { useAuth } from "@/lib/auth-provider"
import { Badge } from "@/components/ui/badge"

interface UserMenuProps {
  user: {
    id: string
    name: string
    email: string
    role: "user" | "agent" | "admin"
    avatar?: string
  } | null
}

export default function UserMenu({ user }: UserMenuProps) {
  const { t } = useLanguage()
  const { logout } = useAuth()
  const [open, setOpen] = useState(false)

  const handleLogout = async () => {
    await logout()
    setOpen(false)
  }

  const getInitials = (name: string | undefined) => {
    if (!name) return "U"
    return name
      .split(" ")
      .map((part) => part[0])
      .join("")
      .toUpperCase()
      .substring(0, 2)
  }

  const getRoleBadgeVariant = (role: string) => {
    switch (role) {
      case "admin":
        return "destructive"
      case "agent":
        return "default"
      default:
        return "secondary"
    }
  }

  if (!user) {
    return null
  }

  return (
    <DropdownMenu open={open} onOpenChange={setOpen}>
      <DropdownMenuTrigger asChild>
        <Button variant="ghost" className="relative h-8 w-8 rounded-full">
          <Avatar className="h-8 w-8">
            <AvatarImage src={user.avatar} alt={user.name} />
            <AvatarFallback>{getInitials(user.name)}</AvatarFallback>
          </Avatar>
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent className="w-56" align="end" forceMount>
        <DropdownMenuLabel className="font-normal">
          <div className="flex flex-col space-y-1">
            <div className="flex items-center justify-between">
              <p className="text-sm font-medium leading-none">{user.name}</p>
              <Badge variant={getRoleBadgeVariant(user.role)} className="text-xs">
                {user.role}
              </Badge>
            </div>
            <p className="text-xs leading-none text-muted-foreground">{user.email}</p>
          </div>
        </DropdownMenuLabel>
        <DropdownMenuSeparator />
        <DropdownMenuGroup>
          <DropdownMenuItem asChild>
            <Link href="/profile" className="cursor-pointer">
              <User className="mr-2 h-4 w-4" />
              <span>{t("user_menu.profile")}</span>
            </Link>
          </DropdownMenuItem>

          {(user.role === "agent" || user.role === "admin") && (
            <DropdownMenuItem asChild>
              <Link href="/upload" className="cursor-pointer">
                <Upload className="mr-2 h-4 w-4" />
                <span>{t("user_menu.upload")}</span>
              </Link>
            </DropdownMenuItem>
          )}

          <DropdownMenuItem asChild>
            <Link href="" className="cursor-pointer">
              <Settings className="mr-2 h-4 w-4" />
              <span>{t("user_menu.settings")}</span>
            </Link>
          </DropdownMenuItem>
        </DropdownMenuGroup>
        <DropdownMenuSeparator />
        <DropdownMenuItem onClick={handleLogout} className="cursor-pointer">
          <LogOut className="mr-2 h-4 w-4" />
          <span>{t("user_menu.logout")}</span>
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  )
}
