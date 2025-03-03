"use client"

import { useEffect, useState } from "react"
import { useRouter } from "next/navigation"
import Image from "next/image"
import { Navbar } from "@/components/navbar"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { quizzes } from "@/lib/quiz-data"
import { getAuthState } from "@/lib/local-storage"
import { BarChart2, Brain, Clock } from "lucide-react"

export default function QuizzesPage() {
  const router = useRouter()
  const [auth, setAuth] = useState({ isLoggedIn: false, isAdmin: false, username: "" })

  useEffect(() => {
    const authState = getAuthState()
    setAuth(authState)

    if (!authState.isLoggedIn) {
      router.push("/login")
    }
  }, [router])

  const getDifficultyColor = (difficulty: string) => {
    switch (difficulty) {
      case "easy":
        return "bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-300"
      case "medium":
        return "bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-300"
      case "hard":
        return "bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-300"
      default:
        return "bg-gray-100 text-gray-800 dark:bg-gray-800 dark:text-gray-300"
    }
  }

  if (!auth.isLoggedIn) {
    return null
  }

  return (
    <div className="flex min-h-screen flex-col">
      <Navbar />
      <main className="flex-1 container py-8">
        <h1 className="text-3xl font-bold mb-8">Available Quizzes</h1>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {quizzes.map((quiz) => (
            <Card key={quiz.id} className="overflow-hidden quiz-card">
              <div className="relative h-48 w-full">
                <Image src={quiz.imageUrl || "/placeholder.svg"} alt={quiz.title} fill className="object-cover" />
                <div className="absolute top-2 right-2">
                  <span className={`text-xs font-medium px-2.5 py-0.5 rounded ${getDifficultyColor(quiz.difficulty)}`}>
                    {quiz.difficulty.charAt(0).toUpperCase() + quiz.difficulty.slice(1)}
                  </span>
                </div>
              </div>
              <CardHeader>
                <CardTitle>{quiz.title}</CardTitle>
                <CardDescription>{quiz.description}</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="flex items-center justify-between text-sm text-muted-foreground">
                  <div className="flex items-center">
                    <Brain className="mr-1 h-4 w-4" />
                    <span>{quiz.category}</span>
                  </div>
                  <div className="flex items-center">
                    <BarChart2 className="mr-1 h-4 w-4" />
                    <span>{quiz.questions.length} questions</span>
                  </div>
                  <div className="flex items-center">
                    <Clock className="mr-1 h-4 w-4" />
                    <span>~{quiz.questions.length * 2} min</span>
                  </div>
                </div>
              </CardContent>
              <CardFooter>
                <Button className="w-full" onClick={() => router.push(`/quizzes/${quiz.id}`)}>
                  Start Quiz
                </Button>
              </CardFooter>
            </Card>
          ))}
        </div>
      </main>
    </div>
  )
}

