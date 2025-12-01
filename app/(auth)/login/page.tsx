"use client";

import Link from "next/link";
import { motion } from "motion/react";
import { ArrowLeft, Mail, Lock, Github, Chrome } from "lucide-react";
import { GridPatternBackground } from "@/components/ui/SectionBackgrounds";

export default function LoginPage() {
  return (
    <GridPatternBackground className="min-h-screen flex items-center justify-center p-6">
      <div className="w-full max-w-md">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="bg-background/80 backdrop-blur-xl border border-foreground/10 rounded-2xl p-8 shadow-2xl"
        >
          <div className="mb-8 text-center">
            <Link
              href="/"
              className="inline-flex items-center text-sm text-foreground/60 hover:text-foreground transition-colors mb-6"
            >
              <ArrowLeft className="w-4 h-4 mr-2" />
              Back to Home
            </Link>
            <h1 className="text-3xl font-bold tracking-tight mb-2">
              Welcome back
            </h1>
            <p className="text-foreground/60">
              Enter your credentials to access your account
            </p>
          </div>

          <form className="space-y-4" onSubmit={(e) => e.preventDefault()}>
            <div className="space-y-2">
              <label className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70">
                Email
              </label>
              <div className="relative">
                <Mail className="absolute left-3 top-3 h-4 w-4 text-foreground/40" />
                <input
                  type="email"
                  placeholder="name@example.com"
                  className="flex h-10 w-full rounded-md border border-foreground/10 bg-foreground/5 px-3 py-2 pl-10 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-foreground/40 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
                />
              </div>
            </div>
            <div className="space-y-2">
              <label className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70">
                Password
              </label>
              <div className="relative">
                <Lock className="absolute left-3 top-3 h-4 w-4 text-foreground/40" />
                <input
                  type="password"
                  placeholder="••••••••"
                  className="flex h-10 w-full rounded-md border border-foreground/10 bg-foreground/5 px-3 py-2 pl-10 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-foreground/40 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
                />
              </div>
            </div>

            <button className="w-full inline-flex items-center justify-center rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 bg-foreground text-background hover:bg-foreground/90 h-10 px-4 py-2">
              Sign In
            </button>
          </form>

          <div className="relative my-8">
            <div className="absolute inset-0 flex items-center">
              <span className="w-full border-t border-foreground/10" />
            </div>
            <div className="relative flex justify-center text-xs uppercase">
              <span className="bg-background px-2 text-foreground/40">
                Or continue with
              </span>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <button className="inline-flex items-center justify-center rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 border border-foreground/10 bg-background hover:bg-foreground/5 hover:text-foreground h-10 px-4 py-2">
              <Github className="mr-2 h-4 w-4" />
              Github
            </button>
            <button className="inline-flex items-center justify-center rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 border border-foreground/10 bg-background hover:bg-foreground/5 hover:text-foreground h-10 px-4 py-2">
              <Chrome className="mr-2 h-4 w-4" />
              Google
            </button>
          </div>

          <div className="mt-6 text-center text-sm text-foreground/60">
            Don't have an account?{" "}
            <Link
              href="/register"
              className="font-medium text-foreground hover:underline underline-offset-4"
            >
              Sign up
            </Link>
          </div>
        </motion.div>
      </div>
    </GridPatternBackground>
  );
}
