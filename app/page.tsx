"use client";

import Image from "next/image";
import { useState, FormEvent } from "react";

export default function Home() {
  const [email, setEmail] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [error, setError] = useState<string>("");

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsSubmitting(true);
    setError("");

    try {
      const response = await fetch('/api/send', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email }),
      });

      const data = await response.json();
      
      if (response.ok) {
        setIsSuccess(true);
        setEmail("");
      } else {
        throw new Error(data.error || "Something went wrong");
      }
    } catch (error: any) {
      setError(error.message || "An error occurred");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="flex flex-col min-h-screen">
      {/* Navigation */}
      <nav className="px-6 py-4 border-b border-zinc-200 dark:border-zinc-800">
        <div className="container mx-auto flex justify-between items-center">
          <div className="flex items-center gap-2">
            <span className="text-xl font-bold">Levercast</span>
          </div>
          <button 
            onClick={() => {
              const waitlistSection = document.getElementById('waitlist');
              if (waitlistSection) {
                waitlistSection.scrollIntoView({ behavior: 'smooth' });
              }
            }}
            className="px-6 py-3 rounded-full bg-primary text-white font-medium hover:bg-primary-dark transition-colors"
          >
            Join the Waitlist
          </button>
        </div>
      </nav>

      <main className="flex-grow">
        {/* Hero Section */}
        <section className="py-20 px-6">
          <div className="container mx-auto">
            <div className="text-center max-w-3xl mx-auto">
              <h1 className="text-4xl md:text-5xl font-bold mb-6">
                Turn Customer Conversations Into Product Insights
              </h1>
              <p className="text-xl mb-8 text-zinc-700 dark:text-zinc-300">
                Our AI-powered platform captures, analyzes, and categorizes customer feedback, helping product teams build what customers actually want.
              </p>
              <button 
                onClick={() => {
                  const waitlistSection = document.getElementById('waitlist');
                  if (waitlistSection) {
                    waitlistSection.scrollIntoView({ behavior: 'smooth' });
                  }
                }}
                className="px-6 py-3 rounded-full bg-primary text-white font-medium hover:bg-primary-dark transition-colors"
              >
                Join the Waitlist
              </button>
            </div>
          </div>
        </section>

        {/* Waitlist Section */}
        <section id="waitlist" className="py-20 px-6 bg-zinc-50 dark:bg-zinc-900">
          <div className="container mx-auto max-w-md text-center">
            <h2 className="text-3xl font-bold mb-6">Join Our Waitlist</h2>
            <p className="mb-8 text-zinc-600 dark:text-zinc-400">
              Be among the first to experience Levercast when we launch.
            </p>
            
            {isSuccess ? (
              <div className="p-4 bg-green-50 dark:bg-green-900/30 text-green-800 dark:text-green-200 rounded-lg">
                <p>Thanks for joining our waitlist! We'll be in touch soon.</p>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-4">
                <div>
                  <input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="Enter your email"
                    required
                    className="w-full px-4 py-3 rounded-lg border border-zinc-300 dark:border-zinc-700 dark:bg-zinc-800 focus:outline-none focus:ring-2 focus:ring-primary"
                  />
                </div>
                {error && (
                  <div className="text-red-600 dark:text-red-400 text-sm">
                    {error}
                  </div>
                )}
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full px-6 py-3 rounded-lg bg-primary text-white font-medium hover:bg-primary-dark transition-colors disabled:opacity-70"
                >
                  {isSubmitting ? "Joining..." : "Join Waitlist"}
                </button>
              </form>
            )}
          </div>
        </section>
      </main>

      {/* Footer */}
      <footer className="px-6 py-8 border-t border-zinc-200 dark:border-zinc-800">
        <div className="container mx-auto text-center">
          <p className="text-zinc-600 dark:text-zinc-400">
            © {new Date().getFullYear()} Levercast. All rights reserved.
          </p>
        </div>
      </footer>
    </div>
  );
}
