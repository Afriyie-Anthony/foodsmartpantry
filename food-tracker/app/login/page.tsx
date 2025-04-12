"use client";

import { useState, useEffect, FormEvent, ChangeEvent } from "react";
import Link from "next/link";
import { useRouter, useSearchParams } from "next/navigation";
import { Eye, EyeOff, Lock, Mail, ShoppingBasket } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Separator } from "@/components/ui/separator";
import { useToast } from "@/hooks/use-toast";
import { login } from "@/lib/api/auth";
import { setAuthCookies, isAuthenticated } from "@/lib/auth";
import Image from "next/image";
import google from "@/public/images/google.png";
import facebook from "@/public/images/facebooklog.png";

interface FormData {
  email: string;
  password: string;
}

interface FormErrors {
  email: string;
  password: string;
}

export default function LoginPage() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const { toast } = useToast();

  const [isLoading, setIsLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [formData, setFormData] = useState<FormData>({ email: "", password: "" });
  const [errors, setErrors] = useState<FormErrors>({ email: "", password: "" });
  const [redirectUri, setRedirectUri] = useState("");

  useEffect(() => {
    if (typeof window !== "undefined") {
      setRedirectUri(encodeURIComponent(`${window.location.origin}/login`));
    }

    const checkAuthAndRedirect = async () => {
      try {
        const params = new URLSearchParams(window.location.search);
        const hashParams = new URLSearchParams(window.location.hash.replace(/^#/, ""));

        const token = params.get("token") || hashParams.get("token");
        const role = params.get("role") || hashParams.get("role") || "user";
        const error = params.get("error") || hashParams.get("error");

        if (error) {
          toast({
            variant: "destructive",
            title: "Authentication Error",
            description: error,
          });
          return;
        }

        if (token) {
          setAuthCookies(token, role);
          toast({ title: "Login successful", description: "Welcome back!" });
          window.history.replaceState({}, document.title, window.location.pathname);

          const returnUrl = params.get("returnUrl") || hashParams.get("returnUrl");
          const redirectTo = returnUrl ? `/${returnUrl}` : role === "admin" ? "/admin" : "/dashboard";
          router.push(redirectTo);
          return;
        }

        if (isAuthenticated()) {
          router.push("/dashboard");
        }
      } catch (error) {
        toast({
          variant: "destructive",
          title: "Authentication Error",
          description: "Failed to process authentication. Please try again.",
        });
      }
    };

    checkAuthAndRedirect();
  }, [router, searchParams, toast]);

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    if (errors[name as keyof FormErrors]) {
      setErrors((prev) => ({ ...prev, [name]: "" }));
    }
  };

  const validateForm = () => {
    const newErrors: FormErrors = { email: "", password: "" };
    let isValid = true;

    if (!formData.email.trim()) {
      newErrors.email = "Email is required";
      isValid = false;
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = "Email is invalid";
      isValid = false;
    }

    if (!formData.password) {
      newErrors.password = "Password is required";
      isValid = false;
    }

    setErrors(newErrors);
    return isValid;
  };

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!validateForm()) return;
    setIsLoading(true);

    try {
      const response = await login(formData);
      setAuthCookies(response.token, response.role);
      toast({ title: "Login successful", description: "Welcome back!" });
      router.push(response.role === "admin" ? "/admin" : "/dashboard");
    } catch (error: any) {
      toast({
        variant: "destructive",
        title: "Login failed",
        description: error.message || "Invalid email or password",
      });
    } finally {
      setIsLoading(false);
    }
  };

  const handleOAuthLogin = (provider: "google" | "facebook") => {
    if (!redirectUri) return;

    try {
      const baseUrl = "https://smartpantry-bc4q.onrender.com/auth";
      const url =
        provider === "google"
          ? `${baseUrl}/google?redirect_uri=${redirectUri}`
          : `${baseUrl}/facebook/redirect`;

      window.location.href = url;
    } catch (error) {
      toast({
        variant: "destructive",
        title: "Error",
        description: `Failed to initiate ${provider} login. Please try again.`,
      });
    }
  };

  return (
    <div className="flex min-h-screen flex-col">
      <header className="px-4 lg:px-6 h-16 flex items-center border-b">
        <Link className="flex items-center justify-center" href="/">
          <ShoppingBasket className="h-6 w-6 text-green-600" />
          <span className="ml-2 text-xl font-bold">FreshTrack</span>
        </Link>
        <nav className="ml-auto flex gap-4 sm:gap-6">
          <Link className="text-sm font-medium hover:underline underline-offset-4" href="/">Home</Link>
          <Link className="text-sm font-medium hover:underline underline-offset-4" href="/about">About</Link>
        </nav>
      </header>
      <main className="flex-1 flex items-center justify-center p-4 md:p-8">
        <Card className="mx-auto max-w-md w-full">
          <CardHeader className="space-y-1">
            <CardTitle className="text-2xl font-bold">Login</CardTitle>
            <CardDescription>Enter your credentials to access your account</CardDescription>
          </CardHeader>
          <form onSubmit={handleSubmit}>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="email">Email</Label>
                <div className="relative">
                  <Mail className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
                  <Input
                    id="email"
                    name="email"
                    type="email"
                    placeholder="name@example.com"
                    className="pl-10"
                    value={formData.email}
                    onChange={handleChange}
                  />
                </div>
                {errors.email && <p className="text-sm text-red-500">{errors.email}</p>}
              </div>
              <div className="space-y-2">
                <Label htmlFor="password">Password</Label>
                <div className="relative">
                  <Lock className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
                  <Input
                    id="password"
                    name="password"
                    type={showPassword ? "text" : "password"}
                    placeholder="••••••••"
                    className="pl-10"
                    value={formData.password}
                    onChange={handleChange}
                  />
                  <Button
                    type="button"
                    variant="ghost"
                    size="icon"
                    className="absolute right-0 top-0 h-10 w-10 text-gray-400"
                    onClick={() => setShowPassword(!showPassword)}
                  >
                    {showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                    <span className="sr-only">{showPassword ? "Hide" : "Show"} password</span>
                  </Button>
                </div>
                {errors.password && <p className="text-sm text-red-500">{errors.password}</p>}
              </div>
            </CardContent>
            <CardFooter className="flex flex-col">
              <Button type="submit" className="w-full bg-green-600 hover:bg-green-700" disabled={isLoading}>
                {isLoading ? "Logging in..." : "Login"}
              </Button>
              <div className="mt-4 text-center text-sm">
                Don't have an account? <Link href="/signup" className="text-green-600 hover:underline">Sign up</Link>
              </div>
              <div className="mt-6 flex items-center gap-2 w-full">
                <Separator className="flex-1" />
                <span className="text-xs text-gray-500">OR</span>
                <Separator className="flex-1" />
              </div>
              <div className="mt-4 grid w-full gap-2">
                <Button variant="outline" type="button" className="w-full" onClick={() => handleOAuthLogin("google")}>
                  <Image src={google} alt="Google Icon" className="w-[30px] rounded-[5%]" />
                  Continue with Google
                </Button>
                <Button variant="outline" type="button" className="w-full" onClick={() => handleOAuthLogin("facebook")}>
                  <Image src={facebook} alt="Facebook Icon" className="w-[30px] rounded-[5%]" />
                  Continue with Facebook
                </Button>
              </div>
            </CardFooter>
          </form>
        </Card>
      </main>
      <footer className="flex flex-col gap-2 sm:flex-row py-6 w-full shrink-0 items-center px-4 md:px-6 border-t">
        <p className="text-xs text-gray-500">© 2024 FreshTrack</p>
      </footer>
    </div>
  );
}
