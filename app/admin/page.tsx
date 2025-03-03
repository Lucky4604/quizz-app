"use client"

import { useEffect, useState } from "react"
import { useRouter } from "next/navigation"
import { Navbar } from "@/components/navbar"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { type UserScore, quizzes } from "@/lib/quiz-data"
import { getAuthState, getUserScores } from "@/lib/local-storage"
import { Award, BarChart, User, Users } from "lucide-react"

export default function AdminPage() {
  const router = useRouter()
  const [auth, setAuth] = useState({ isLoggedIn: false, isAdmin: false, username: "" })
  const [scores, setScores] = useState<UserScore[]>([])

  useEffect(() => {
    const authState = getAuthState()
    setAuth(authState)

    if (!authState.isLoggedIn || !authState.isAdmin) {
      router.push("/login")
      return
    }

    setScores(getUserScores())
  }, [router])

  if (!auth.isLoggedIn || !auth.isAdmin) {
    return null
  }

  // Get unique users
  const uniqueUsers = [...new Set(scores.map((score) => score.username))]

  // Get top scores by quiz
  const topScoresByQuiz = quizzes.map((quiz) => {
    const quizScores = scores
      .filter((score) => score.quizId === quiz.id)
      .sort((a, b) => b.score / b.totalQuestions - a.score / a.totalQuestions)
      .slice(0, 5)

    return {
      quizId: quiz.id,
      quizTitle: quiz.title,
      scores: quizScores,
    }
  })

  return (
    <div className="flex min-h-screen flex-col">
      <Navbar />
      <main className="flex-1 container py-8">
        <div className="flex items-center justify-between mb-8">
          <h1 className="text-3xl font-bold">Admin Dashboard</h1>
        </div>

        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4 mb-8">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Total Quizzes</CardTitle>
              <BarChart className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{quizzes.length}</div>
              <p className="text-xs text-muted-foreground">Available on the platform</p>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Total Users</CardTitle>
              <Users className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{uniqueUsers.length}</div>
              <p className="text-xs text-muted-foreground">Registered on the platform</p>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Quiz Attempts</CardTitle>
              <Award className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{scores.length}</div>
              <p className="text-xs text-muted-foreground">Total quiz completions</p>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Avg. Score</CardTitle>
              <User className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">
                {scores.length > 0
                  ? Math.round(
                      scores.reduce((acc, score) => acc + (score.score / score.totalQuestions) * 100, 0) /
                        scores.length,
                    ) + "%"
                  : "N/A"}
              </div>
              <p className="text-xs text-muted-foreground">Average user performance</p>
            </CardContent>
          </Card>
        </div>

        <Tabs defaultValue="leaderboard">
          <TabsList className="mb-4">
            <TabsTrigger value="leaderboard">Leaderboard</TabsTrigger>
            <TabsTrigger value="all-scores">All Scores</TabsTrigger>
          </TabsList>

          <TabsContent value="leaderboard" className="space-y-4">
            <h2 className="text-xl font-bold">Top Performers by Quiz</h2>

            {topScoresByQuiz.map((quizData) => (
              <Card key={quizData.quizId}>
                <CardHeader>
                  <CardTitle>{quizData.quizTitle}</CardTitle>
                  <CardDescription>Top 5 scores</CardDescription>
                </CardHeader>
                <CardContent>
                  {quizData.scores.length > 0 ? (
                    <div className="space-y-2">
                      {quizData.scores.map((score, index) => (
                        <div key={index} className="flex items-center justify-between border-b pb-2">
                          <div className="flex items-center gap-2">
                            <div className="flex h-8 w-8 items-center justify-center rounded-full bg-primary/10">
                              <span className="text-sm font-medium">{index + 1}</span>
                            </div>
                            <div>
                              <p className="text-sm font-medium">{score.username}</p>
                              <p className="text-xs text-muted-foreground">
                                {new Date(score.completedAt).toLocaleDateString()}
                              </p>
                            </div>
                          </div>
                          <div className="text-sm font-medium">
                            {score.score}/{score.totalQuestions} (
                            {Math.round((score.score / score.totalQuestions) * 100)}%)
                          </div>
                        </div>
                      ))}
                    </div>
                  ) : (
                    <p className="text-sm text-muted-foreground">No scores recorded yet</p>
                  )}
                </CardContent>
              </Card>
            ))}
          </TabsContent>

          <TabsContent value="all-scores">
            <Card>
              <CardHeader>
                <CardTitle>All User Scores</CardTitle>
                <CardDescription>Complete history of quiz attempts</CardDescription>
              </CardHeader>
              <CardContent>
                {scores.length > 0 ? (
                  <div className="rounded-md border">
                    <div className="grid grid-cols-4 gap-4 p-4 font-medium border-b">
                      <div>User</div>
                      <div>Quiz</div>
                      <div>Score</div>
                      <div>Date</div>
                    </div>
                    <div className="divide-y">
                      {scores.map((score, index) => (
                        <div key={index} className="grid grid-cols-4 gap-4 p-4 text-sm">
                          <div>{score.username}</div>
                          <div>{score.quizTitle}</div>
                          <div>
                            {score.score}/{score.totalQuestions} (
                            {Math.round((score.score / score.totalQuestions) * 100)}%)
                          </div>
                          <div>{new Date(score.completedAt).toLocaleString()}</div>
                        </div>
                      ))}
                    </div>
                  </div>
                ) : (
                  <p className="text-sm text-muted-foreground">No scores recorded yet</p>
                )}
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </main>
    </div>
  )
}

