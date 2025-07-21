"use client";

import { Input } from '../../../components/ui/input';
import { Button } from '../../../components/ui/button';
import Link from 'next/link';

export default function SignUpPage() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-100 via-purple-100 to-pink-100 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900">
      <div className="bg-white/90 dark:bg-gray-900/80 p-10 rounded-2xl shadow-2xl w-full max-w-md border border-gray-200 dark:border-gray-700 backdrop-blur-md">
        <div className="flex flex-col items-center mb-6">
          <svg className="w-12 h-12 text-blue-500 mb-2" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M12 11c0-1.657-1.343-3-3-3s-3 1.343-3 3 1.343 3 3 3 3-1.343 3-3zm0 0c0-1.657 1.343-3 3-3s3 1.343 3 3-1.343 3-3 3-3-1.343-3-3zm0 0v2m0 4h.01" /></svg>
          <h1 className="text-3xl font-extrabold text-gray-800 dark:text-white">Sign Up</h1>
        </div>
        <form className="space-y-5">
          <Input type="text" placeholder="Name" required className="focus:ring-2 focus:ring-blue-400" />
          <Input type="email" placeholder="Email" required className="focus:ring-2 focus:ring-blue-400" />
          <Input type="password" placeholder="Password" required className="focus:ring-2 focus:ring-blue-400" />
          <Button type="submit" className="w-full bg-blue-500 hover:bg-blue-600 text-white font-semibold py-2 rounded-lg shadow transition-all">Sign Up</Button>
        </form>
        <div className="my-6 flex items-center justify-center">
          <span className="h-px w-16 bg-gray-300 dark:bg-gray-700" />
          <span className="mx-2 text-gray-400 text-xs">or</span>
          <span className="h-px w-16 bg-gray-300 dark:bg-gray-700" />
        </div>
        {/* Google Sign Up Button */}
        <Button
          type="button"
          className="w-full flex items-center justify-center gap-2 bg-white border border-gray-300 dark:bg-gray-800 dark:border-gray-700 text-gray-700 dark:text-gray-200 font-semibold py-2 rounded-lg shadow hover:bg-gray-50 dark:hover:bg-gray-700 transition-all mb-4"
          onClick={() => {
            // Replace with your Google sign up logic
            window.location.href = '/api/auth/google';
          }}
        >
          <svg className="w-5 h-5" viewBox="0 0 24 24">
            <path fill="#EA4335" d="M12 11.7v2.6h7.4c-.3 1.7-2 5-7.4 5-4.4 0-8-3.6-8-8s3.6-8 8-8c2.5 0 4.2 1 5.2 1.9l-2.1 2c-.7-.6-1.8-1.3-3.1-1.3-2.7 0-4.9 2.2-4.9 4.9s2.2 4.9 4.9 4.9c3.1 0 4.2-2.2 4.4-3.4H12z"/>
          </svg>
          Continue with Google
        </Button>
        <p className="text-center text-sm text-gray-600 dark:text-gray-300">
          Already have an account?{' '}
          <Link href="/sign-in" className="text-blue-600 hover:underline font-medium">Sign In</Link>
        </p>
      </div>
    </div>
  );
}