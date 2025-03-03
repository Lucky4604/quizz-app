"use client"

import { useEffect, useState } from "react"
import { useRouter } from "next/navigation"
import { Navbar } from "@/components/navbar"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Progress } from "@/components/ui/progress"
import { Checkbox } from "@/components/ui/checkbox"
import { type Quiz, type UserScore, quizzes } from "@/lib/quiz-data"
import { getAuthState, getQuizProgress, saveQuizProgress, saveUserScore, clearQuizProgress } from "@/lib/local-storage"
import { CheckCircle2, XCircle } from "lucide-react"

export default function QuizPage({ params }: { params: { id: string } }) {
  const router = useRouter()
  const [quiz, setQuiz] = useState<Quiz | null>(null)
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0)
  const [selectedAnswers, setSelectedAnswers] = useState<Record<string, string[]>>({})
  const [showResult, setShowResult] = useState(false)
  const [isCorrect, setIsCorrect] = useState(false)
  const [quizCompleted, setQuizCompleted] = useState(false)
  const [score, setScore] = useState(0)
  const [auth, setAuth] = useState({ isLoggedIn: false, isAdmin: false, username: "" })

  useEffect(() => {
    const authState = getAuthState()
    setAuth(authState)

    if (!authState.isLoggedIn) {
      router.push("/login")
      return
    }

    const foundQuiz = quizzes.find((q) => q.id === params.id)
    if (!foundQuiz) {
      router.push("/quizzes")
      return
    }

    setQuiz(foundQuiz)

    // Check for saved progress
    const savedProgress = getQuizProgress(params.id)
    if (savedProgress) {
      setCurrentQuestionIndex(savedProgress.currentQuestionIndex)
      setSelectedAnswers(savedProgress.answers)
    }
  }, [params.id, router])

  const handleAnswerSelect = (questionId: string, optionId: string, isMultiple: boolean) => {
    if (showResult) return

    setSelectedAnswers((prev) => {
      const currentAnswers = prev[questionId] || []

      if (isMultiple) {
        // For multiple-choice questions
        if (currentAnswers.includes(optionId)) {
          return {
            ...prev,
            [questionId]: currentAnswers.filter((id) => id !== optionId),
          }
        } else {
          return {
            ...prev,
            [questionId]: [...currentAnswers, optionId],
          }
        }
      } else {
        // For single-choice questions
        return {
          ...prev,
          [questionId]: [optionId],
        }
      }
    })
  }

  const checkAnswer = () => {
    if (!quiz) return

    const currentQuestion = quiz.questions[currentQuestionIndex]
    const userAnswers = selectedAnswers[currentQuestion.id] || []

    // Get all correct option IDs
    const correctOptionIds = currentQuestion.options.filter((option) => option.isCorrect).map((option) => option.id)

    // Check if user answers match correct answers
    const isAnswerCorrect =
      userAnswers.length === correctOptionIds.length && userAnswers.every((id) => correctOptionIds.includes(id))

    setIsCorrect(isAnswerCorrect)
    setShowResult(true)

    if (isAnswerCorrect) {
      setScore((prev) => prev + 1)
    }
  }

  const goToNextQuestion = () => {
    if (!quiz) return

    if (currentQuestionIndex < quiz.questions.length - 1) {
      setCurrentQuestionIndex((prev) => prev + 1)
      setShowResult(false)

      // Save progress
      saveQuizProgress(params.id, currentQuestionIndex + 1, selectedAnswers)
    } else {
      // Quiz completed
      setQuizCompleted(true)

      // Save score
      const userScore: UserScore = {
        userId: auth.username,
        username: auth.username,
        quizId: quiz.id,
        quizTitle: quiz.title,
        score: score + (isCorrect ? 1 : 0), // Add current question score
        totalQuestions: quiz.questions.length,
        completedAt: new Date().toISOString(),
      }

      saveUserScore(userScore)

      // Clear progress
      clearQuizProgress(params.id)
    }
  }

  const restartQuiz = () => {
    setCurrentQuestionIndex(0)
    setSelectedAnswers({})
    setShowResult(false)
    setQuizCompleted(false)
    setScore(0)
    clearQuizProgress(params.id)
  }

  if (!quiz) {
    return null
  }

  const currentQuestion = quiz.questions[currentQuestionIndex]
  const progress = (currentQuestionIndex / quiz.questions.length) * 100

  if (quizCompleted) {
    const finalScore = score + (isCorrect ? 1 : 0)
    const percentage = Math.round((finalScore / quiz.questions.length) * 100)

    return (
      <div className="flex min-h-screen flex-col">
        <Navbar />
        <main className="flex-1 container py-8 flex items-center justify-center">
          <Card className="w-full max-w-md">
            <CardHeader>
              <CardTitle className="text-center">Quiz Completed!</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="text-center">
                <p className="text-4xl font-bold">{percentage}%</p>
                <p className="text-muted-foreground">
                  You scored {finalScore} out of {quiz.questions.length}
                </p>
              </div>

              <div className="space-y-2">
                <p className="font-medium">Performance:</p>
                <Progress value={percentage} className="h-2" />

                <div className="pt-4 text-center">
                  {percentage >= 70 ? (
                    <p className="text-green-600 dark:text-green-400">Great job! You did well!</p>
                  ) : percentage >= 40 ? (
                    <p className="text-yellow-600 dark:text-yellow-400">Good effort! Keep practicing!</p>
                  ) : (
                    <p className="text-red-600 dark:text-red-400">Keep studying and try again!</p>
                  )}
                </div>
              </div>
            </CardContent>
            <CardFooter className="flex gap-2">
              <Button onClick={restartQuiz} className="w-full">
                Restart Quiz
              </Button>
              <Button onClick={() => router.push("/quizzes")} variant="outline" className="w-full">
                Back to Quizzes
              </Button>
            </CardFooter>
          </Card>
        </main>
      </div>
    )
  }

  return (
    <div className="flex min-h-screen flex-col">
      <Navbar />
      <main className="flex-1 container py-8">
        <div className="max-w-3xl mx-auto">
          <div className="mb-6">
            <div className="flex justify-between items-center mb-2">
              <h2 className="text-sm font-medium">
                Question {currentQuestionIndex + 1} of {quiz.questions.length}
              </h2>
              <span className="text-sm text-muted-foreground">{quiz.title}</span>
            </div>
            <div className="progress-bar">
              <div className="progress-bar-fill" style={{ width: `${progress}%` }}></div>
            </div>
          </div>

          <Card>
            <CardHeader>
              <CardTitle>{currentQuestion.text}</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              {currentQuestion.options.map((option) => {
                const isSelected = (selectedAnswers[currentQuestion.id] || []).includes(option.id)
                const isMultiple = currentQuestion.type === "multiple-choice"

                let className = "answer-option flex items-start space-x-3 space-y-0 rounded-md border p-4 shadow-sm"

                if (isSelected) {
                  className += " selected"
                }

                if (showResult) {
                  if (option.isCorrect) {
                    className += " correct"
                  } else if (isSelected && !option.isCorrect) {
                    className += " incorrect"
                  }
                }

                return (
                  <div
                    key={option.id}
                    className={className}
                    onClick={() => handleAnswerSelect(currentQuestion.id, option.id, isMultiple)}
                  >
                    <div className="flex items-center h-5">
                      {isMultiple ? (
                        <Checkbox
                          checked={isSelected}
                          disabled={showResult}
                          onCheckedChange={() => {}}
                          className="pointer-events-none"
                        />
                      ) : (
                        <div
                          className={`h-4 w-4 rounded-full border ${isSelected ? "bg-primary border-primary" : "border-muted-foreground"}`}
                        />
                      )}
                    </div>
                    <div className="flex-1">
                      <div className="text-sm font-medium leading-none">{option.text}</div>
                    </div>
                    {showResult && option.isCorrect && <CheckCircle2 className="h-5 w-5 text-green-500" />}
                    {showResult && isSelected && !option.isCorrect && <XCircle className="h-5 w-5 text-red-500" />}
                  </div>
                )
              })}
            </CardContent>
            <CardFooter className="flex justify-between">
              {!showResult ? (
                <Button
                  onClick={checkAnswer}
                  disabled={!selectedAnswers[currentQuestion.id] || selectedAnswers[currentQuestion.id].length === 0}
                  className="w-full"
                >
                  Check Answer
                </Button>
              ) : (
                <Button onClick={goToNextQuestion} className="w-full">
                  {currentQuestionIndex < quiz.questions.length - 1 ? "Next Question" : "See Results"}
                </Button>
              )}
            </CardFooter>
          </Card>

          {showResult && (
            <div
              className={`mt-4 p-4 rounded-md ${isCorrect ? "bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-300" : "bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-300"}`}
            >
              <p className="font-medium">{isCorrect ? "Correct!" : "Incorrect!"}</p>
              <p className="text-sm mt-1">
                {isCorrect
                  ? "Great job! You got the right answer."
                  : "Not quite right. Review the correct answer above."}
              </p>
            </div>
          )}
        </div>
      </main>
    </div>
  )
}

