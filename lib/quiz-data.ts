export type QuestionType = "single-choice" | "multiple-choice" | "true-false"

export interface Question {
  id: string
  text: string
  type: QuestionType
  options: {
    id: string
    text: string
    isCorrect: boolean
  }[]
}

export interface Quiz {
  id: string
  title: string
  description: string
  category: string
  difficulty: "easy" | "medium" | "hard"
  questions: Question[]
  imageUrl: string
}

export interface UserScore {
  userId: string
  username: string
  quizId: string
  quizTitle: string
  score: number
  totalQuestions: number
  completedAt: string
}

export const quizzes: Quiz[] = [
  {
    id: "quiz-1",
    title: "General Knowledge",
    description: "Test your knowledge on various general topics",
    category: "General",
    difficulty: "easy",
    imageUrl: "/placeholder.svg?height=200&width=300",
    questions: [
      {
        id: "q1",
        text: "What is the capital of France?",
        type: "single-choice",
        options: [
          { id: "q1-a", text: "London", isCorrect: false },
          { id: "q1-b", text: "Berlin", isCorrect: false },
          { id: "q1-c", text: "Paris", isCorrect: true },
          { id: "q1-d", text: "Madrid", isCorrect: false },
        ],
      },
      {
        id: "q2",
        text: "Which of the following are planets in our solar system?",
        type: "multiple-choice",
        options: [
          { id: "q2-a", text: "Earth", isCorrect: true },
          { id: "q2-b", text: "Mars", isCorrect: true },
          { id: "q2-c", text: "Sun", isCorrect: false },
          { id: "q2-d", text: "Jupiter", isCorrect: true },
        ],
      },
      {
        id: "q3",
        text: "The Great Wall of China is visible from space.",
        type: "true-false",
        options: [
          { id: "q3-a", text: "True", isCorrect: false },
          { id: "q3-b", text: "False", isCorrect: true },
        ],
      },
    ],
  },
  {
    id: "quiz-2",
    title: "Science Quiz",
    description: "Test your knowledge of basic science concepts",
    category: "Science",
    difficulty: "medium",
    imageUrl: "/placeholder.svg?height=200&width=300",
    questions: [
      {
        id: "q1",
        text: "What is the chemical symbol for gold?",
        type: "single-choice",
        options: [
          { id: "q1-a", text: "Go", isCorrect: false },
          { id: "q1-b", text: "Au", isCorrect: true },
          { id: "q1-c", text: "Ag", isCorrect: false },
          { id: "q1-d", text: "Gd", isCorrect: false },
        ],
      },
      {
        id: "q2",
        text: "Which of the following are noble gases?",
        type: "multiple-choice",
        options: [
          { id: "q2-a", text: "Helium", isCorrect: true },
          { id: "q2-b", text: "Oxygen", isCorrect: false },
          { id: "q2-c", text: "Neon", isCorrect: true },
          { id: "q2-d", text: "Argon", isCorrect: true },
        ],
      },
      {
        id: "q3",
        text: "Humans have 206 bones in their body.",
        type: "true-false",
        options: [
          { id: "q3-a", text: "True", isCorrect: true },
          { id: "q3-b", text: "False", isCorrect: false },
        ],
      },
    ],
  },
  {
    id: "quiz-3",
    title: "History Trivia",
    description: "Test your knowledge of historical events and figures",
    category: "History",
    difficulty: "hard",
    imageUrl: "/placeholder.svg?height=200&width=300",
    questions: [
      {
        id: "q1",
        text: "In which year did World War II end?",
        type: "single-choice",
        options: [
          { id: "q1-a", text: "1943", isCorrect: false },
          { id: "q1-b", text: "1945", isCorrect: true },
          { id: "q1-c", text: "1947", isCorrect: false },
          { id: "q1-d", text: "1950", isCorrect: false },
        ],
      },
      {
        id: "q2",
        text: "Which of the following were ancient civilizations?",
        type: "multiple-choice",
        options: [
          { id: "q2-a", text: "Mesopotamia", isCorrect: true },
          { id: "q2-b", text: "Atlantis", isCorrect: false },
          { id: "q2-c", text: "Maya", isCorrect: true },
          { id: "q2-d", text: "Egypt", isCorrect: true },
        ],
      },
      {
        id: "q3",
        text: "The United States declared independence in 1776.",
        type: "true-false",
        options: [
          { id: "q3-a", text: "True", isCorrect: true },
          { id: "q3-b", text: "False", isCorrect: false },
        ],
      },
    ],
  },
]

export const ADMIN_CREDENTIALS = {
  username: "admin",
  password: "admin123",
}

