"use client"

import Link from "next/link"
import { usePathname, useRouter } from "next/navigation"
import { ThemeToggle } from "./theme-toggle"
import { Button } from "./ui/button"
import { LogOut, User } from "lucide-react"
import { useEffect, useState } from "react"
import { clearAuthState, getAuthState } from "@/lib/local-storage"

export function Navbar() {
  const pathname = usePathname()
  const router = useRouter()
  const [auth, setAuth] = useState({ isLoggedIn: false, isAdmin: false, username: "" })

  useEffect(() => {
    setAuth(getAuthState())
  }, [])

  const handleLogout = () => {
    clearAuthState()
    setAuth({ isLoggedIn: false, isAdmin: false, username: "" })
    router.push("/")
  }

  return (
    <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container flex h-14 items-center">
        <Link href="/" className="flex items-center gap-2 font-bold text-xl">
          <span className="bg-primary text-primary-foreground rounded-md p-1">Q</span>
          <span>QuizMaster</span>
        </Link>
        <nav className="ml-auto flex items-center gap-4">
          <Link
            href="/"
            className={`text-sm font-medium transition-colors hover:text-primary ${
              pathname === "/" ? "text-primary" : "text-foreground"
            }`}
          >
            Home
          </Link>
          {auth.isLoggedIn && (
            <Link
              href="/quizzes"
              className={`text-sm font-medium transition-colors hover:text-primary ${
                pathname === "/quizzes" ? "text-primary" : "text-foreground"
              }`}
            >
              Quizzes
            </Link>
          )}
          {auth.isAdmin && (
            <Link
              href="/admin"
              className={`text-sm font-medium transition-colors hover:text-primary ${
                pathname === "/admin" ? "text-primary" : "text-foreground"
              }`}
            >
              Admin
            </Link>
          )}
          <ThemeToggle />
          {auth.isLoggedIn ? (
            <div className="flex items-center gap-2">
              <div className="flex items-center gap-1 text-sm">
                <User className="h-4 w-4" />
                <span>{auth.username}</span>
              </div>
              <Button variant="ghost" size="icon" onClick={handleLogout}>
                <LogOut className="h-4 w-4" />
              </Button>
            </div>
          ) : (
            <Link href="/login">
              <Button variant="outline" size="sm">
                Login
              </Button>
            </Link>
          )}
        </nav>
      </div>
    </header>
  )
}

