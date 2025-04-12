import Link from "next/link"
import { ArrowRight, CheckCircle, ShoppingBasket } from "lucide-react"
import { Button } from "@/components/ui/button"
import { MobileNav } from "@/components/mobile-nav"
import { Footer } from "@/components/footer"

export default function AboutPage() {
  return (
    <div className="flex flex-col min-h-screen">
      <header className="px-4 lg:px-6 h-16 flex items-center border-b">
        <Link className="flex items-center justify-center" href="/">
          <ShoppingBasket className="h-6 w-6 text-green-600" />
          <span className="ml-2 text-xl font-bold">FreshTrack</span>
        </Link>
        <nav className="ml-auto hidden md:flex gap-4 sm:gap-6">
          <Link className="text-sm font-medium hover:underline underline-offset-4" href="/">
            Home
          </Link>
          {/* <Link className="text-sm font-medium hover:underline underline-offset-4" href="/dashboard">
            Dashboard
          </Link>
          <Link className="text-sm font-medium hover:underline underline-offset-4" href="/recipes">
            Recipes
          </Link>
          <Link className="text-sm font-medium hover:underline underline-offset-4" href="/shopping-list">
            Shopping List
          </Link> */}
        </nav>
        <MobileNav />
      </header>
      <main className="flex-1">
        <section className="w-full py-12 md:py-24 lg:py-32 bg-green-50">
          <div className="container px-4 md:px-6">
            <div className="flex flex-col items-center justify-center space-y-4 text-center">
              <div className="space-y-2">
                <h1 className="text-3xl font-bold tracking-tighter sm:text-5xl">About FreshTrack</h1>
                <p className="max-w-[900px] text-gray-500 md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed">
                  Our mission is to reduce food waste and help you save money by making it easy to track what you have
                  and when it expires.
                </p>
              </div>
            </div>
          </div>
        </section>

        <section className="w-full py-12 md:py-24 lg:py-32">
          <div className="container px-4 md:px-6">
            <div className="grid gap-10 px-10 md:gap-16 lg:grid-cols-2">
              <div className="space-y-4">
                <h2 className="text-3xl font-bold">Our Story</h2>
                <p className="text-gray-500 md:text-xl/relaxed">
                  FreshTrack was born out of a simple observation: too much food goes to waste in homes and businesses
                  around the world. We wanted to create a solution that makes it easy for everyone to keep track of what
                  they have and use it before it expires.
                </p>
                <p className="text-gray-500 md:text-xl/relaxed">
                  Our team of food enthusiasts and technology experts came together to build a tool that not only tracks
                  expiration dates but also suggests creative ways to use ingredients before they go bad.
                </p>
                <p className="text-gray-500 md:text-xl/relaxed">
                  Whether you're a household trying to stretch your grocery budget or a supermarket managing inventory,
                  FreshTrack is designed to help you reduce waste and save money.
                </p>
              </div>
              <div className="space-y-4">
                <h2 className="text-3xl font-bold">The Problem We're Solving</h2>
                <ul className="grid gap-4">
                  <li className="flex items-start gap-2">
                    <CheckCircle className="h-5 w-5 text-green-600 mt-0.5" />
                    <div>
                      <h3 className="font-medium">Food Waste</h3>
                      <p className="text-sm text-gray-500">
                        Globally, about one-third of all food produced is wasted. That's approximately 1.3 billion tons
                        per year.
                      </p>
                    </div>
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle className="h-5 w-5 text-green-600 mt-0.5" />
                    <div>
                      <h3 className="font-medium">Environmental Impact</h3>
                      <p className="text-sm text-gray-500">
                        Food waste is responsible for about 8% of global greenhouse gas emissions.
                      </p>
                    </div>
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle className="h-5 w-5 text-green-600 mt-0.5" />
                    <div>
                      <h3 className="font-medium">Financial Loss</h3>
                      <p className="text-sm text-gray-500">
                        The average family throws away about $1,500 worth of food each year.
                      </p>
                    </div>
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle className="h-5 w-5 text-green-600 mt-0.5" />
                    <div>
                      <h3 className="font-medium">Resource Waste</h3>
                      <p className="text-sm text-gray-500">
                        Wasted food also means wasted water, energy, labor, and land resources that went into producing
                        it.
                      </p>
                    </div>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </section>

        <section className="w-full py-12 md:py-24 lg:py-32 bg-green-50">
          <div className="container px-4 md:px-6">
            <div className="flex flex-col items-center justify-center space-y-4 text-center">
              <div className="space-y-2">
                <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl">Our Features</h2>
                <p className="max-w-[900px] text-gray-500 md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed">
                  FreshTrack offers a comprehensive set of tools to help you manage your food inventory and reduce
                  waste.
                </p>
              </div>
            </div>
            <div className="mx-auto grid max-w-5xl items-center gap-6 py-12 lg:grid-cols-3 lg:gap-12">
              <div className="flex flex-col justify-center space-y-4">
                <h3 className="text-xl font-bold">Inventory Management</h3>
                <p className="text-gray-500">
                  Easily add and track items in your pantry, refrigerator, or store shelves with expiration dates.
                </p>
              </div>
              <div className="flex flex-col justify-center space-y-4">
                <h3 className="text-xl font-bold">Expiration Alerts</h3>
                <p className="text-gray-500">
                  Get timely notifications when food items are approaching their expiration dates.
                </p>
              </div>
              <div className="flex flex-col justify-center space-y-4">
                <h3 className="text-xl font-bold">Recipe Suggestions</h3>
                <p className="text-gray-500">
                  Discover recipes that use ingredients you already have, prioritizing those that will expire soon.
                </p>
              </div>
              <div className="flex flex-col justify-center space-y-4">
                <h3 className="text-xl font-bold">Shopping Lists</h3>
                <p className="text-gray-500">
                  Create smart shopping lists based on what you need and what you already have.
                </p>
              </div>
              <div className="flex flex-col justify-center space-y-4">
                <h3 className="text-xl font-bold">Waste Tracking</h3>
                <p className="text-gray-500">
                  Monitor your food waste over time and see the impact of your efforts to reduce it.
                </p>
              </div>
              <div className="flex flex-col justify-center space-y-4">
                <h3 className="text-xl font-bold">Multi-User Access</h3>
                <p className="text-gray-500">
                  Share your inventory with family members or team members for collaborative management.
                </p>
              </div>
            </div>
          </div>
        </section>

        <section className="w-full py-12 md:py-24 lg:py-32">
          <div className="container px-4 md:px-6">
            <div className="flex flex-col items-center justify-center space-y-4 text-center">
              <div className="space-y-2">
                <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl">Get Started Today</h2>
                <p className="max-w-[600px] text-gray-500 md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed">
                  Join thousands of users who are already reducing food waste and saving money with FreshTrack.
                </p>
              </div>
              <div className="flex flex-col gap-2 min-[400px]:flex-row">
                <Link href="/dashboard">
                  <Button size="lg" className="bg-green-600 hover:bg-green-700">
                    Try FreshTrack Now
                    <ArrowRight className="ml-2 h-4 w-4" />
                  </Button>
                </Link>
              </div>
            </div>
          </div>
        </section>
      </main>
      <Footer/>
      {/* <footer className="flex flex-col gap-2 sm:flex-row py-6 w-full shrink-0 items-center px-4 md:px-6 border-t">
        <p className="text-xs text-gray-500">© 2024 FreshTrack. All rights reserved.</p>
        <nav className="sm:ml-auto flex gap-4 sm:gap-6">
          <Link className="text-xs hover:underline underline-offset-4" href="#">
            Terms of Service
          </Link>
          <Link className="text-xs hover:underline underline-offset-4" href="#">
            Privacy
          </Link>
        </nav>
      </footer> */}
    </div>
  )
}

