"use client";

import { useState, FormEvent } from "react";
import Link from "next/link";

export default function LoginForm() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [rememberMe, setRememberMe] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsLoading(true);

    // TODO: Replace with actual authentication logic
    console.log("Login attempt:", { email, rememberMe });

    // Simulate async login
    await new Promise((resolve) => setTimeout(resolve, 1000));
    setIsLoading(false);
  };

  const handleSchoolSignIn = () => {
    // TODO: Replace with actual school SSO logic
    console.log("School sign-in initiated");
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <div className="space-y-5">
        {/* Email Input */}
        <div>
          <label
            htmlFor="email"
            className="block font-label text-sm font-medium text-on-surface-variant mb-2"
          >
            Email Address
          </label>
          <input
            id="email"
            name="email"
            type="email"
            autoComplete="email"
            required
            placeholder="student@university.edu"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="appearance-none block w-full px-4 py-3 border border-outline-variant/20 rounded-lg bg-surface-container focus:bg-surface-container-lowest focus:outline-none focus:ring-2 focus:ring-primary focus:border-primary transition-colors font-body text-on-surface sm:text-sm"
          />
        </div>

        {/* Password Input */}
        <div>
          <div className="flex items-center justify-between mb-2">
            <label
              htmlFor="password"
              className="block font-label text-sm font-medium text-on-surface-variant"
            >
              Password
            </label>
            <Link
              href="/forgot-password"
              className="font-label text-sm font-medium text-primary hover:text-primary-container transition-colors"
            >
              Forgot Password?
            </Link>
          </div>
          <input
            id="password"
            name="password"
            type="password"
            autoComplete="current-password"
            required
            placeholder="••••••••"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="appearance-none block w-full px-4 py-3 border border-outline-variant/20 rounded-lg bg-surface-container focus:bg-surface-container-lowest focus:outline-none focus:ring-2 focus:ring-primary focus:border-primary transition-colors font-body text-on-surface sm:text-sm"
          />
        </div>
      </div>

      {/* Remember Me */}
      <div className="flex items-center">
        <input
          id="remember-me"
          name="remember-me"
          type="checkbox"
          checked={rememberMe}
          onChange={(e) => setRememberMe(e.target.checked)}
          className="h-4 w-4 text-primary focus:ring-primary border-outline-variant rounded bg-surface-container"
        />
        <label
          htmlFor="remember-me"
          className="ml-3 block font-label text-sm text-on-surface-variant"
        >
          Remember Me
        </label>
      </div>

      {/* Actions */}
      <div className="pt-4 space-y-4">
        <button
          type="submit"
          disabled={isLoading}
          className="w-full flex justify-center py-4 px-4 border border-transparent rounded-full shadow-sm text-sm font-medium text-on-primary bg-gradient-to-r from-primary to-primary-container hover:opacity-90 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary transition-all font-display tracking-wide disabled:opacity-60 disabled:cursor-not-allowed"
        >
          {isLoading ? "Signing In..." : "Sign In"}
        </button>

        <div className="relative">
          <div className="absolute inset-0 flex items-center">
            <div className="w-full border-t border-outline-variant/20" />
          </div>
          <div className="relative flex justify-center text-sm">
            <span className="px-4 bg-surface-container-lowest text-on-surface-variant font-label">
              Or
            </span>
          </div>
        </div>

        <button
          type="button"
          onClick={handleSchoolSignIn}
          className="w-full flex justify-center items-center py-4 px-4 border border-outline-variant/20 rounded-full shadow-sm text-sm font-medium text-primary bg-transparent hover:bg-surface-container-low focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary transition-all font-display tracking-wide"
        >
          <span
            className="material-symbols-outlined mr-2 text-xl"
            style={{ fontVariationSettings: "'FILL' 0" }}
          >
            school
          </span>
          Sign in with School Account
        </button>
      </div>
    </form>
  );
}
