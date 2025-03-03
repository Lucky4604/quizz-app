"use client"

import type { UserScore } from "./quiz-data"

// Helper function to check if we're in a browser environment
const isBrowser = typeof window !== "undefined"

// User authentication
export const saveAuthState = (isLoggedIn: boolean, isAdmin: boolean, username: string) => {
  if (!isBrowser) return

  localStorage.setItem(
    "auth",
    JSON.stringify({
      isLoggedIn,
      isAdmin,
      username,
    }),
  )
}

export const getAuthState = () => {
  if (!isBrowser) return { isLoggedIn: false, isAdmin: false, username: "" }

  const auth = localStorage.getItem("auth")
  if (!auth) return { isLoggedIn: false, isAdmin: false, username: "" }

  return JSON.parse(auth)
}

export const clearAuthState = () => {
  if (!isBrowser) return
  localStorage.removeItem("auth")
}

// Quiz progress
export const saveQuizProgress = (quizId: string, currentQuestionIndex: number, answers: Record<string, string[]>) => {
  if (!isBrowser) return

  localStorage.setItem(
    `quiz-progress-${quizId}`,
    JSON.stringify({
      currentQuestionIndex,
      answers,
    }),
  )
}

export const getQuizProgress = (quizId: string) => {
  if (!isBrowser) return null

  const progress = localStorage.getItem(`quiz-progress-${quizId}`)
  if (!progress) return null

  return JSON.parse(progress)
}

export const clearQuizProgress = (quizId: string) => {
  if (!isBrowser) return
  localStorage.removeItem(`quiz-progress-${quizId}`)
}

// User scores
export const saveUserScore = (score: UserScore) => {
  if (!isBrowser) return

  const scores = getUserScores()
  scores.push(score)
  localStorage.setItem("user-scores", JSON.stringify(scores))
}

export const getUserScores = (): UserScore[] => {
  if (!isBrowser) return []

  const scores = localStorage.getItem("user-scores")
  if (!scores) return []

  return JSON.parse(scores)
}

// Theme preference
export const saveThemePreference = (theme: "light" | "dark" | "system") => {
  if (!isBrowser) return
  localStorage.setItem("theme-preference", theme)
}

export const getThemePreference = () => {
  if (!isBrowser) return "system"

  const theme = localStorage.getItem("theme-preference")
  if (!theme) return "system"

  return theme as "light" | "dark" | "system"
}

