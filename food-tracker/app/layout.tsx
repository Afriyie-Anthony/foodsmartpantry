import "@/app/globals.css";
import { Inter } from "next/font/google";
import { ThemeProvider } from "@/components/theme-provider";


const inter = Inter({ subsets: ["latin"] });

export const metadata = {
  title: "FreshTrack - Reduce Food Waste, Save Money",
  description:
    "Track your food storage, get expiration alerts, and discover recipes to use ingredients before they expire.",
  generator: "v0.dev",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={inter.className}>
        <ThemeProvider attribute="class" defaultTheme="system" enableSystem>
          <div className="min-h-screen flex flex-col">
            <main className="flex-grow">{children}</main>
            
          </div>
        </ThemeProvider>
      </body>
    </html>
  );
}

import "./globals.css";
