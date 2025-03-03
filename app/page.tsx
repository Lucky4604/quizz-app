import { Button } from "@/components/ui/button"
import { Navbar } from "@/components/navbar"
import Link from "next/link"
import { Award, BrainCircuit, Clock, Sparkles } from "lucide-react"

export default function Home() {
  return (
    <div className="flex min-h-screen flex-col">
      <Navbar />
      <main className="flex-1">
        <section className="w-full py-12 md:py-24 lg:py-32 xl:py-48">
          <div className="container px-4 md:px-6">
            <div className="flex flex-col items-center space-y-4 text-center">
              <div className="space-y-2">
                <h1 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl lg:text-6xl/none">
                  Test Your Knowledge with QuizMaster
                </h1>
                <p className="mx-auto max-w-[700px] text-muted-foreground md:text-xl">
                  Challenge yourself with our interactive quizzes on various topics. Track your progress and compete
                  with others.
                </p>
              </div>
              <div className="space-x-4">
                <Link href="/login">
                  <Button className="px-8">Get Started</Button>
                </Link>
                <Link href="/quizzes">
                  <Button variant="outline" className="px-8">
                    Browse Quizzes
                  </Button>
                </Link>
              </div>
            </div>
          </div>
        </section>

        <section className="w-full py-12 md:py-24 lg:py-32 bg-muted/50">
          <div className="container px-4 md:px-6">
            <div className="flex flex-col items-center justify-center space-y-4 text-center">
              <div className="space-y-2">
                <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl">Features</h2>
                <p className="mx-auto max-w-[700px] text-muted-foreground md:text-xl">
                  Our platform offers a variety of features to enhance your quiz experience
                </p>
              </div>
              <div className="grid grid-cols-1 gap-8 sm:grid-cols-2 md:grid-cols-4">
                <div className="flex flex-col items-center space-y-2">
                  <div className="rounded-full bg-primary/10 p-4">
                    <BrainCircuit className="h-6 w-6 text-primary" />
                  </div>
                  <h3 className="text-xl font-bold">Multiple Quiz Types</h3>
                  <p className="text-sm text-muted-foreground text-center">
                    Single-choice, multiple-choice, and true/false questions to test your knowledge.
                  </p>
                </div>
                <div className="flex flex-col items-center space-y-2">
                  <div className="rounded-full bg-primary/10 p-4">
                    <Clock className="h-6 w-6 text-primary" />
                  </div>
                  <h3 className="text-xl font-bold">Progress Tracking</h3>
                  <p className="text-sm text-muted-foreground text-center">
                    Track your progress with our intuitive progress bar and save your results.
                  </p>
                </div>
                <div className="flex flex-col items-center space-y-2">
                  <div className="rounded-full bg-primary/10 p-4">
                    <Award className="h-6 w-6 text-primary" />
                  </div>
                  <h3 className="text-xl font-bold">Leaderboards</h3>
                  <p className="text-sm text-muted-foreground text-center">
                    Compete with others and see your ranking on our leaderboards.
                  </p>
                </div>
                <div className="flex flex-col items-center space-y-2">
                  <div className="rounded-full bg-primary/10 p-4">
                    <Sparkles className="h-6 w-6 text-primary" />
                  </div>
                  <h3 className="text-xl font-bold">Customizable Themes</h3>
                  <p className="text-sm text-muted-foreground text-center">
                    Switch between light and dark mode for a comfortable quiz experience.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </section>
      </main>
      <footer className="w-full border-t py-6">
        <div className="container flex flex-col items-center justify-center gap-4 px-4 md:px-6 md:flex-row">
          <p className="text-sm text-muted-foreground">© 2023 QuizMaster. All rights reserved.</p>
          <nav className="flex gap-4">
            <Link href="#" className="text-sm text-muted-foreground hover:underline">
              Terms of Service
            </Link>
            <Link href="#" className="text-sm text-muted-foreground hover:underline">
              Privacy Policy
            </Link>
          </nav>
        </div>
      </footer>
    </div>
  )
}

