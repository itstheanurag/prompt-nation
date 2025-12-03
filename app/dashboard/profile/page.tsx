"use client";

import { useAuthStore } from "@/stores";
import { motion } from "motion/react";
import { User, Mail, Calendar, Shield } from "lucide-react";

export default function ProfilePage() {
  const { user } = useAuthStore();

  if (!user) return null;

  return (
    <div className="max-w-4xl mx-auto space-y-8">
      <div className="space-y-2">
        <h1 className="text-3xl font-bold tracking-tight">Profile</h1>
        <p className="text-foreground/60">
          Manage your account settings and preferences.
        </p>
      </div>

      <div className="grid gap-6">
        {/* Profile Card */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="p-6 rounded-2xl border border-foreground/10 bg-background/50 backdrop-blur-xl"
        >
          <div className="flex flex-col md:flex-row items-center gap-6">
            <div className="w-24 h-24 rounded-full bg-foreground/10 flex items-center justify-center text-3xl font-bold text-foreground border-2 border-foreground/10 overflow-hidden">
              {user.image ? (
                <img
                  src={user.image}
                  alt={user.name || "User"}
                  className="w-full h-full object-cover"
                />
              ) : (
                user.name?.[0]?.toUpperCase() || "U"
              )}
            </div>
            <div className="flex-1 text-center md:text-left space-y-1">
              <h2 className="text-2xl font-bold">{user.name}</h2>
              <p className="text-foreground/60">{user.email}</p>
              <div className="flex items-center justify-center md:justify-start gap-2 pt-2">
                <span className="px-2 py-1 rounded-full bg-blue-500/10 text-blue-500 text-xs font-medium border border-blue-500/20">
                  Free Plan
                </span>
                {user.emailVerified && (
                  <span className="px-2 py-1 rounded-full bg-green-500/10 text-green-500 text-xs font-medium border border-green-500/20">
                    Verified
                  </span>
                )}
              </div>
            </div>
          </div>
        </motion.div>

        {/* Details Grid */}
        <div className="grid md:grid-cols-2 gap-6">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="p-6 rounded-2xl border border-foreground/10 bg-background/50 backdrop-blur-xl space-y-4"
          >
            <h3 className="font-semibold flex items-center gap-2">
              <User className="w-4 h-4 text-foreground/60" />
              Personal Information
            </h3>
            <div className="space-y-4">
              <div className="space-y-1">
                <label className="text-xs font-medium text-foreground/60 uppercase tracking-wider">
                  Full Name
                </label>
                <div className="p-3 rounded-lg bg-foreground/5 border border-foreground/10 text-sm">
                  {user.name}
                </div>
              </div>
              <div className="space-y-1">
                <label className="text-xs font-medium text-foreground/60 uppercase tracking-wider">
                  Email Address
                </label>
                <div className="p-3 rounded-lg bg-foreground/5 border border-foreground/10 text-sm flex items-center gap-2">
                  <Mail className="w-4 h-4 text-foreground/40" />
                  {user.email}
                </div>
              </div>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="p-6 rounded-2xl border border-foreground/10 bg-background/50 backdrop-blur-xl space-y-4"
          >
            <h3 className="font-semibold flex items-center gap-2">
              <Shield className="w-4 h-4 text-foreground/60" />
              Account Security
            </h3>
            <div className="space-y-4">
              <div className="space-y-1">
                <label className="text-xs font-medium text-foreground/60 uppercase tracking-wider">
                  Account ID
                </label>
                <div className="p-3 rounded-lg bg-foreground/5 border border-foreground/10 text-sm font-mono text-foreground/60 truncate">
                  {user.id}
                </div>
              </div>
              <div className="space-y-1">
                <label className="text-xs font-medium text-foreground/60 uppercase tracking-wider">
                  Member Since
                </label>
                <div className="p-3 rounded-lg bg-foreground/5 border border-foreground/10 text-sm flex items-center gap-2">
                  <Calendar className="w-4 h-4 text-foreground/40" />
                  {new Date(user.createdAt).toLocaleDateString("en-US", {
                    month: "long",
                    year: "numeric",
                    day: "numeric",
                  })}
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </div>
  );
}
