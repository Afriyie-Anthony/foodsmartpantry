"use client";
import Link from "next/link";
import {
  ArrowRight,
  Calendar,
  Check,
  Clock,
  Leaf,
  ShoppingBasket,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { MobileNav } from "@/components/mobile-nav";
import { Badge } from "@/components/ui/badge";
import Image from "next/image";
import { useState, useEffect } from "react";
import { Footer } from "@/components/footer";
import { isAuthenticated, clearAuthCookies } from "@/lib/auth";
import { useRouter } from "next/navigation";

export default function Home() {
  const authenticated = isAuthenticated();
  const router = useRouter();
  const images = [
    "/images/smallbg.jpg",
    "/images/food.jpg",
    "images/another2.jpg",
    "images/another1.jpg",
    "images/anotherbg.jpg",
    "images/food2.jpg",
    "images/food3.jpg",
    "images/bg2.avif",
    "images/bg4.jpg",
  ];

  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [fade, setFade] = useState(false);

  useEffect(() => {
    const intervalId = setInterval(() => {
      setFade(true); // Trigger fade out
      setTimeout(() => {
        setCurrentImageIndex((prevIndex) => (prevIndex + 1) % images.length);
        setFade(false); // Trigger fade in
      }, 1000); // Assume fade duration is 1 second
    }, 7000); // Change image every 7 seconds

    return () => clearInterval(intervalId);
  }, [images.length]);

  const handleLogout = () => {
    clearAuthCookies();
    router.push("/");
  };

  return (
    <div className="flex flex-col min-h-screen bg-white dark:bg-gray-950">
      {/* Header with mobile navigation */}
      <header className="px-4 lg:px-6 h-16 flex items-center border-b bg-white dark:bg-gray-950 dark:border-gray-800 sticky top-0 z-30">
        <Link className="flex items-center justify-center" href="/">
          <ShoppingBasket className="h-6 w-6 text-emerald-600 dark:text-emerald-500" />
          <span className="ml-2 text-xl font-bold text-gray-900 dark:text-white">
            FreshTrack
          </span>
        </Link>
        <nav className="ml-auto hidden md:flex gap-4 sm:gap-6">
          <Link
            className="text-sm font-medium text-gray-700 hover:text-emerald-600 dark:text-gray-300 dark:hover:text-emerald-500 hover:underline underline-offset-4"
            href="/dashboard"
          >
            Dashboard
          </Link>
          <Link
            className="text-sm font-medium text-gray-700 hover:text-emerald-600 dark:text-gray-300 dark:hover:text-emerald-500 hover:underline underline-offset-4"
            href="/admin"
          >
            adminDashboard
          </Link>
          <Link
            className="text-sm font-medium text-gray-700 hover:text-emerald-600 dark:text-gray-300 dark:hover:text-emerald-500 hover:underline underline-offset-4"
            href="/recipes"
          >
            Recipes
          </Link>
          <Link
            className="text-sm font-medium text-gray-700 hover:text-emerald-600 dark:text-gray-300 dark:hover:text-emerald-500 hover:underline underline-offset-4"
            href="/about"
          >
            About
          </Link>
        </nav>
        <div className="ml-auto md:ml-4 flex items-center gap-2">
          {authenticated ? (
            <Button
              variant="ghost"
              size="sm"
              className="text-gray-700 dark:text-gray-300"
              onClick={handleLogout}
            >
              Logout
            </Button>
          ) : (
            <>
              <Link href="/login" className="hidden sm:inline-flex">
                <Button
                  variant="ghost"
                  size="sm"
                  className="text-gray-700 dark:text-gray-300"
                >
                  Login
                </Button>
              </Link>
              <Link href="/signup" className="hidden sm:inline-flex">
                <Button
                  size="sm"
                  className="bg-emerald-600 hover:bg-emerald-700 text-white dark:bg-emerald-600 dark:hover:bg-emerald-700"
                >
                  Sign Up
                </Button>
              </Link>
            </>
          )}
        </div>
        <MobileNav />
      </header>
      <main className="flex-1">
        {/* Enhanced Hero Section */}
        <section className="relative w-full py-12 md:py-7 lg:py-12 xl:py-18 overflow-hidden">
          {/* Background with gradient overlay */}
          <div className="absolute inset-0 bg-gradient-to-br from-emerald-50 to-white dark:from-gray-900 dark:to-gray-950 z-0"></div>

          {/* Decorative elements */}
          <div className="absolute top-20 right-[10%] w-64 h-64 bg-emerald-100 dark:bg-emerald-900/20 rounded-full blur-3xl opacity-60 z-0"></div>
          <div className="absolute bottom-20 left-[5%] w-72 h-72 bg-emerald-50 dark:bg-emerald-900/10 rounded-full blur-3xl opacity-70 z-0"></div>

          {/* Floating food icons (decorative) */}
          <div className="absolute top-1/4 left-[15%] animate-float-slow opacity-20 dark:opacity-10 z-0">
            <Leaf className="h-16 w-16 text-emerald-600" />
          </div>
          <div className="absolute bottom-1/4 right-[20%] animate-float opacity-20 dark:opacity-10 z-0">
            <Calendar className="h-20 w-20 text-emerald-500" />
          </div>

          <div className="container relative px-4 md:px-6 z-10">
            <div className="grid gap-6 lg:grid-cols-[1fr_400px] lg:gap-12 xl:grid-cols-[1fr_600px]">
              <div className="flex flex-col justify-center space-y-4">
                <div className="space-y-2">
                  <Badge className="mb-2 bg-emerald-100 text-emerald-800 dark:bg-emerald-900/30 dark:text-emerald-400 hover:bg-emerald-200 dark:hover:bg-emerald-900/40">
                    New Version 2.0
                  </Badge>
                  <h1 className="text-3xl font-bold tracking-tighter sm:text-5xl xl:text-6xl/none text-gray-900 dark:text-white">
                    Reduce Food Waste,{" "}
                    <span className="text-emerald-600 dark:text-emerald-500">
                      Save Money
                    </span>
                  </h1>
                  <p className="max-w-[600px] text-gray-600 dark:text-gray-400 md:text-xl">
                    Track your food storage, get expiration alerts, and discover
                    recipes to use ingredients before they expire.
                  </p>
                </div>

                {/* Feature highlights */}
                <div className="grid grid-cols-2 gap-3 py-4">
                  <div className="flex items-center gap-2">
                    <div className="rounded-full bg-emerald-100 dark:bg-emerald-900/30 p-1">
                      <Check className="h-4 w-4 text-emerald-600 dark:text-emerald-500" />
                    </div>
                    <span className="text-sm text-gray-600 dark:text-gray-400">
                      Expiration Tracking
                    </span>
                  </div>
                  <div className="flex items-center gap-2">
                    <div className="rounded-full bg-emerald-100 dark:bg-emerald-900/30 p-1">
                      <Check className="h-4 w-4 text-emerald-600 dark:text-emerald-500" />
                    </div>
                    <span className="text-sm text-gray-600 dark:text-gray-400">
                      Recipe Suggestions
                    </span>
                  </div>
                  <div className="flex items-center gap-2">
                    <div className="rounded-full bg-emerald-100 dark:bg-emerald-900/30 p-1">
                      <Check className="h-4 w-4 text-emerald-600 dark:text-emerald-500" />
                    </div>
                    <span className="text-sm text-gray-600 dark:text-gray-400">
                      Shopping Lists
                    </span>
                  </div>
                  <div className="flex items-center gap-2">
                    <div className="rounded-full bg-emerald-100 dark:bg-emerald-900/30 p-1">
                      <Check className="h-4 w-4 text-emerald-600 dark:text-emerald-500" />
                    </div>
                    <span className="text-sm text-gray-600 dark:text-gray-400">
                      Waste Reduction
                    </span>
                  </div>
                </div>

                <div className="flex flex-col gap-2 min-[400px]:flex-row">
                  <Link href="/signup">
                    <Button
                      size="lg"
                      className="bg-emerald-600 hover:bg-emerald-700 text-white dark:bg-emerald-600 dark:hover:bg-emerald-700 shadow-lg shadow-emerald-600/20 dark:shadow-emerald-900/30 transition-all hover:shadow-xl hover:shadow-emerald-600/30"
                    >
                      Get Started Free
                      <ArrowRight className="ml-2 h-4 w-4" />
                    </Button>
                  </Link>
                  <Link href="/about">
                    <Button
                      size="lg"
                      variant="outline"
                      className="border-emerald-200 text-emerald-700 hover:bg-emerald-50 dark:border-emerald-800 dark:text-emerald-400 dark:hover:bg-emerald-900/30"
                    >
                      Learn More
                    </Button>
                  </Link>
                </div>

                {/* Social proof */}
                <div className="mt-6 pt-4 border-t border-gray-200 dark:border-gray-800">
                  <p className="text-sm text-gray-500 dark:text-gray-500">
                    Trusted by 10,000+ households and businesses
                  </p>
                  <div className="flex items-center mt-2 space-x-4">
                    <div className="flex -space-x-2">
                      {[1, 2, 3, 4].map((i) => (
                        <div
                          key={i}
                          className={`w-8 h-8 rounded-full bg-emerald-${
                            i * 100
                          } flex items-center justify-center text-white text-xs font-medium`}
                        >
                          {["JD", "SM", "RK", "AL"][i - 1]}
                        </div>
                      ))}
                    </div>
                    <div className="flex items-center">
                      {[1, 2, 3, 4, 5].map((star) => (
                        <svg
                          key={star}
                          className="w-4 h-4 text-yellow-500"
                          fill="currentColor"
                          viewBox="0 0 20 20"
                        >
                          <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                        </svg>
                      ))}
                      <span className="ml-2 text-sm font-medium text-gray-600 dark:text-gray-400">
                        4.9/5 (230+ reviews)
                      </span>
                    </div>
                  </div>
                </div>
              </div>

              {/* Hero image with floating card elements */}
              <div className="relative lg:order-last">
                <div className="relative w-full h-96 overflow-hidden rounded-xl shadow-2xl">
                  <div
                    className={`transition-opacity duration-1000 ${
                      fade ? "opacity-0" : "opacity-100"
                    }`}
                  >
                    <Image
                      src={images[currentImageIndex]}
                      alt={`Image number ${currentImageIndex + 1}`}
                      className="w-full h-full object-cover object-center"
                      layout="fill" // Fill the parent container
                    />
                  </div>
                  {/* Floating card elements */}
                  <div className="absolute -bottom-6 -left-6 bg-white dark:bg-gray-800 rounded-lg shadow-lg p-3 animate-float-slow">
                    <div className="flex items-center gap-2">
                      <div className="rounded-full bg-red-100 dark:bg-red-900/30 p-2">
                        <Clock className="h-4 w-4 text-red-600 dark:text-red-400" />
                      </div>
                      <div>
                        <p className="text-xs font-medium text-gray-800 dark:text-gray-200">
                          Milk expires in
                        </p>
                        <p className="text-sm font-bold text-red-600 dark:text-red-400">
                          2 days
                        </p>
                      </div>
                    </div>
                  </div>

                  <div className="absolute -top-4 -right-4 bg-white dark:bg-gray-800 rounded-lg shadow-lg p-3 animate-float">
                    <div className="flex items-center gap-2">
                      <div className="rounded-full bg-emerald-100 dark:bg-emerald-900/30 p-2">
                        <Leaf className="h-4 w-4 text-emerald-600 dark:text-emerald-500" />
                      </div>
                      <div>
                        <p className="text-xs font-medium text-gray-800 dark:text-gray-200">
                          Food waste reduced
                        </p>
                        <p className="text-sm font-bold text-emerald-600 dark:text-emerald-500">
                          32% this month
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        <section className="w-full py-12 md:py-24 lg:py-12 bg-white dark:bg-gray-950">
          <div className="container px-4 md:px-6">
            <div className="flex flex-col items-center justify-center space-y-4 text-center">
              <div className="space-y-2">
                <h2 className="text-3xl font-bold tracking-tighter sm:text-5xl text-gray-900 dark:text-white">
                  How It Works
                </h2>
                <p className="max-w-[900px] text-gray-600 dark:text-gray-400 md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed">
                  FreshTrack helps you manage your food inventory and reduce
                  waste with these simple steps.
                </p>
              </div>
            </div>
            <div className="mx-auto grid max-w-5xl items-center gap-6 py-12 lg:grid-cols-3 lg:gap-12">
              <div className="flex flex-col justify-center space-y-4">
                <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-emerald-100 dark:bg-emerald-900/30 text-emerald-600 dark:text-emerald-500">
                  <ShoppingBasket className="h-6 w-6" />
                </div>
                <div className="space-y-2">
                  <h3 className="text-xl font-bold text-gray-900 dark:text-white">
                    Track Your Food
                  </h3>
                  <p className="text-gray-600 dark:text-gray-400">
                    Add items to your inventory with expiration dates to keep
                    track of what you have.
                  </p>
                </div>
              </div>
              <div className="flex flex-col justify-center space-y-4">
                <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-emerald-100 dark:bg-emerald-900/30 text-emerald-600 dark:text-emerald-500">
                  <Calendar className="h-6 w-6" />
                </div>
                <div className="space-y-2">
                  <h3 className="text-xl font-bold text-gray-900 dark:text-white">
                    Get Expiration Alerts
                  </h3>
                  <p className="text-gray-600 dark:text-gray-400">
                    Receive notifications when your food is about to expire so
                    nothing goes to waste.
                  </p>
                </div>
              </div>
              <div className="flex flex-col justify-center space-y-4">
                <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-emerald-100 dark:bg-emerald-900/30 text-emerald-600 dark:text-emerald-500">
                  <Clock className="h-6 w-6" />
                </div>
                <div className="space-y-2">
                  <h3 className="text-xl font-bold text-gray-900 dark:text-white">
                    Find Recipes
                  </h3>
                  <p className="text-gray-600 dark:text-gray-400">
                    Discover recipes that use your ingredients before they
                    expire to reduce food waste.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </section>
        <section className="w-full py-12 md:py-24 lg:py-32 bg-emerald-50 dark:bg-gray-900">
          <div className="container px-4 md:px-6">
            <div className="grid gap-10 px-10 md:gap-16 lg:grid-cols-2">
              <div className="flex flex-col justify-center space-y-4">
                <div className="space-y-2">
                  <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl text-gray-900 dark:text-white">
                    Perfect for Households and Businesses
                  </h2>
                  <p className="max-w-[600px] text-gray-600 dark:text-gray-400 md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed">
                    Whether you're managing your home kitchen or a supermarket
                    inventory, FreshTrack helps you reduce waste and save money.
                  </p>
                </div>
                <div className="flex flex-col gap-2 min-[400px]:flex-row">
                  <Link href="/dashboard">
                    <Button
                      size="lg"
                      className="bg-emerald-600 hover:bg-emerald-700 text-white dark:bg-emerald-600 dark:hover:bg-emerald-700"
                    >
                      Try It Now
                    </Button>
                  </Link>
                </div>
              </div>
              <div className="flex items-center justify-center">
                <div className="grid gap-6 sm:grid-cols-2">
                  <div className="flex flex-col gap-2 rounded-lg border bg-white dark:bg-gray-800 dark:border-gray-700 p-4 shadow-sm">
                    <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-emerald-100 dark:bg-emerald-900/30 text-emerald-600 dark:text-emerald-500">
                      <Leaf className="h-5 w-5" />
                    </div>
                    <h3 className="text-lg font-bold text-gray-900 dark:text-white">
                      Reduce Food Waste
                    </h3>
                    <p className="text-sm text-gray-600 dark:text-gray-400">
                      Track expiration dates and use ingredients before they go
                      bad.
                    </p>
                  </div>
                  <div className="flex flex-col gap-2 rounded-lg border bg-white dark:bg-gray-800 dark:border-gray-700 p-4 shadow-sm">
                    <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-emerald-100 dark:bg-emerald-900/30 text-emerald-600 dark:text-emerald-500">
                      <ShoppingBasket className="h-5 w-5" />
                    </div>
                    <h3 className="text-lg font-bold text-gray-900 dark:text-white">
                      Inventory Management
                    </h3>
                    <p className="text-sm text-gray-600 dark:text-gray-400">
                      Keep track of what you have and what you need to buy.
                    </p>
                  </div>
                  <div className="flex flex-col gap-2 rounded-lg border bg-white dark:bg-gray-800 dark:border-gray-700 p-4 shadow-sm">
                    <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-emerald-100 dark:bg-emerald-900/30 text-emerald-600 dark:text-emerald-500">
                      <Calendar className="h-5 w-5" />
                    </div>
                    <h3 className="text-lg font-bold text-gray-900 dark:text-white">
                      Smart Reminders
                    </h3>
                    <p className="text-sm text-gray-600 dark:text-gray-400">
                      Get notified when items are approaching their expiration
                      date.
                    </p>
                  </div>
                  <div className="flex flex-col gap-2 rounded-lg border bg-white dark:bg-gray-800 dark:border-gray-700 p-4 shadow-sm">
                    <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-emerald-100 dark:bg-emerald-900/30 text-emerald-600 dark:text-emerald-500">
                      <Clock className="h-5 w-5" />
                    </div>
                    <h3 className="text-lg font-bold text-gray-900 dark:text-white">
                      Recipe Suggestions
                    </h3>
                    <p className="text-sm text-gray-600 dark:text-gray-400">
                      Find recipes based on what you have and what needs to be
                      used soon.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
      </main>
      <Footer />
      {/* <footer className="flex flex-col gap-2 sm:flex-row py-6 w-full shrink-0 items-center px-4 md:px-6 border-t bg-white dark:bg-gray-950 dark:border-gray-800">
        <p className="text-xs text-gray-500 dark:text-gray-400">© 2024 FreshTrack. All rights reserved.</p>
        <nav className="sm:ml-auto flex gap-4 sm:gap-6">
          <Link
            className="text-xs text-gray-500 hover:text-emerald-600 dark:text-gray-400 dark:hover:text-emerald-500 hover:underline underline-offset-4"
            href="#"
          >
            Terms of Service
          </Link>
          <Link
            className="text-xs text-gray-500 hover:text-emerald-600 dark:text-gray-400 dark:hover:text-emerald-500 hover:underline underline-offset-4"
            href="#"
          >
            Privacy
          </Link>
        </nav>
      </footer> */}
    </div>
  );
}
