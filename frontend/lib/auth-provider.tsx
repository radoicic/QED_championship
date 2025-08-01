"use client"

import type React from "react"

import { createContext, useContext, useEffect, useState } from "react"

type User = {
  id: string
  name: string
  email: string
  role: "user" | "agent"
  votes: number
  votesUsed: number
  lastVotedAt: string | null
  badges: string[]
  level: number
  points: number
  avatar?: string
}

type RegisterData = {
  name: string
  email: string
  password: string
  role: "user" | "agent"
}

type AuthContextType = {
  user: User | null
  isAuthenticated: boolean
  login: (email: string, password: string) => Promise<void>
  register: (data: RegisterData) => Promise<void>
  logout: () => Promise<void>
  updateUser: (user: User) => Promise<void>
  canVoteThisWeek: () => boolean
  addVotingPoints: (points: number) => Promise<void>
}

const AuthContext = createContext<AuthContextType | undefined>(undefined)

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<User | null>(null)
  const isAuthenticated = !!user

  useEffect(() => {
    // Check if running in browser and if user is logged in
    if (typeof window === 'undefined') return;
    
    const storedUser = localStorage.getItem("user")
    if (storedUser) {
      try {
        const parsedUser = JSON.parse(storedUser)
        // Ensure the parsed user has all required fields
        const user: User = {
          id: parsedUser.id || "",
          name: parsedUser.username || "",
          email: parsedUser.email || "",
          role: parsedUser.role || "user",
          votes: parsedUser.votes || 0,
          votesUsed: parsedUser.votesUsed || 0,
          lastVotedAt: parsedUser.lastVotedAt || null,
          badges: Array.isArray(parsedUser.badges) ? parsedUser.badges : ["Newcomer"],
          level: parsedUser.level || 1,
          points: parsedUser.points || 0,
          avatar: parsedUser.avatar
        }
        setUser(user)
      } catch (error) {
        console.error("Error parsing stored user:", error)
        localStorage.removeItem("user")
      }
    }
  }, [])

  const login = async (email: string, password: string) => {
    // Simulate API call
    await new Promise((resolve) => setTimeout(resolve, 1000))

    // Mock login - in a real app, this would be an API call
    if (email === "user@example.com" && password === "password") {
      const user: User = {
        id: "1",
        name: "John Doe",
        email: "user@example.com",
        role: "user",
        votes: 3,
        votesUsed: 12,
        lastVotedAt: null, // No votes this week
        badges: ["Early Supporter"],
        level: 2,
        points: 150,
      }
      setUser(user)
      if (typeof window !== 'undefined') {
        localStorage.setItem("user", JSON.stringify(user))
      }
    } else if (email === "agent@example.com" && password === "password") {
      const user: User = {
        id: "2",
        name: "Jane Smith",
        email: "agent@example.com",
        role: "agent",
        votes: 0,
        votesUsed: 5,
        lastVotedAt: null,
        badges: ["Film Creator", "Trendsetter"],
        level: 3,
        points: 320,
      }
      setUser(user)
      if (typeof window !== 'undefined') {
        localStorage.setItem("user", JSON.stringify(user))
      }
    } else {
      throw new Error("Invalid credentials")
    }
  }

  const register = async (data: RegisterData) => {
    // Simulate API call
    await new Promise((resolve) => setTimeout(resolve, 1500))

    // Mock registration - in a real app, this would be an API call
    const user: User = {
      id: Math.random().toString(36).substring(2, 9),
      name: data.name,
      email: data.email,
      role: data.role,
      votes: data.role === "user" ? 1 : 0,
      votesUsed: 0,
      lastVotedAt: null,
      badges: ["Newcomer"],
      level: 1,
      points: 10,
    }

    setUser(user)
    if (typeof window !== 'undefined') {
      localStorage.setItem("user", JSON.stringify(user))
    }
  }

  const logout = async () => {
    // Simulate API call
    await new Promise((resolve) => setTimeout(resolve, 500))

    setUser(null)
    if (typeof window !== 'undefined') {
      localStorage.removeItem("user")
    }
  }

  const updateUser = async (updatedUser: User) => {
    // Simulate API call
    await new Promise((resolve) => setTimeout(resolve, 500))

    setUser(updatedUser)
    if (typeof window !== 'undefined') {
      localStorage.setItem("user", JSON.stringify(updatedUser))
    }
  }

  // Check if user can vote this week
  const canVoteThisWeek = () => {
    if (!user) return false

    // If user has no votes, they can't vote
    if (user.votes <= 0) return false

    // If user hasn't voted yet, they can vote
    if (!user.lastVotedAt) return true

    // Check if last vote was more than a week ago
    const lastVoted = new Date(user.lastVotedAt)
    const oneWeekAgo = new Date()
    oneWeekAgo.setDate(oneWeekAgo.getDate() - 7)

    return lastVoted < oneWeekAgo
  }

  // Add points for voting activity and check for level ups and badges
  const addVotingPoints = async (points: number) => {
    if (!user) return

    const updatedUser = { ...user }
    updatedUser.points += points
    updatedUser.votesUsed += 1

    // Check for level up
    if (updatedUser.points >= updatedUser.level * 100) {
      updatedUser.level += 1

      // Add level-based badges
      if (updatedUser.level === 3 && !updatedUser.badges.includes("Regular Voter")) {
        updatedUser.badges.push("Regular Voter")
      }
      if (updatedUser.level === 5 && !updatedUser.badges.includes("Super Voter")) {
        updatedUser.badges.push("Super Voter")
      }
      if (updatedUser.level === 10 && !updatedUser.badges.includes("Voting Legend")) {
        updatedUser.badges.push("Voting Legend")
      }
    }

    // Add milestone badges
    if (updatedUser.votesUsed >= 10 && !updatedUser.badges.includes("10 Votes")) {
      updatedUser.badges.push("10 Votes")
    }
    if (updatedUser.votesUsed >= 50 && !updatedUser.badges.includes("50 Votes")) {
      updatedUser.badges.push("50 Votes")
    }
    if (updatedUser.votesUsed >= 100 && !updatedUser.badges.includes("100 Votes")) {
      updatedUser.badges.push("100 Votes")
    }

    // Update the user
    await updateUser(updatedUser)
  }

  return (
    <AuthContext.Provider
      value={{
        user,
        isAuthenticated,
        login,
        register,
        logout,
        updateUser,
        canVoteThisWeek,
        addVotingPoints,
      }}
    >
      {children}
    </AuthContext.Provider>
  )
}

export function useAuth() {
  const context = useContext(AuthContext)
  if (context === undefined) {
    throw new Error("useAuth must be used within an AuthProvider")
  }
  return context
}
