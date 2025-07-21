"use client";

import { Input } from '../../../components/ui/input';
import { Button } from '../../../components/ui/button';
import Link from 'next/link';

export default function SignInPage() {
  // Dummy handler for Google sign-in
  const handleGoogleSignIn = () => {
    // Add your Google sign-in logic here
    alert('Continue with Google clicked');
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-100 via-purple-100 to-pink-100 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900">
      <div className="bg-white/90 dark:bg-gray-900/80 p-10 rounded-2xl shadow-2xl w-full max-w-md border border-gray-200 dark:border-gray-700 backdrop-blur-md">
        <div className="flex flex-col items-center mb-6">
          <svg className="w-12 h-12 text-blue-500 mb-2" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M12 11c0-1.657-1.343-3-3-3s-3 1.343-3 3 1.343 3 3 3 3-1.343 3-3zm0 0c0-1.657 1.343-3 3-3s3 1.343 3 3-1.343 3-3 3-3-1.343-3-3zm0 0v2m0 4h.01" /></svg>
          <h1 className="text-3xl font-extrabold text-gray-800 dark:text-white">Sign In</h1>
        </div>
        <form className="space-y-5">
          <Input type="email" placeholder="Email" required className="focus:ring-2 focus:ring-blue-400" />
          <Input type="password" placeholder="Password" required className="focus:ring-2 focus:ring-blue-400" />
          <Button type="submit" className="w-full bg-blue-500 hover:bg-blue-600 text-white font-semibold py-2 rounded-lg shadow transition-all">Sign In</Button>
        </form>
        <div className="my-6 flex items-center justify-center">
          <span className="h-px w-16 bg-gray-300 dark:bg-gray-700" />
          <span className="mx-2 text-gray-400 text-xs">or</span>
          <span className="h-px w-16 bg-gray-300 dark:bg-gray-700" />
        </div>
        <Button
          type="button"
          onClick={handleGoogleSignIn}
          className="w-full flex items-center justify-center gap-2 bg-white border border-gray-300 dark:bg-gray-800 dark:border-gray-700 text-gray-700 dark:text-gray-200 font-semibold py-2 rounded-lg shadow transition-all hover:bg-gray-100 dark:hover:bg-gray-700 mb-4"
        >
          <svg className="w-5 h-5" viewBox="0 0 24 24">
            <g>
              <path fill="#4285F4" d="M21.6 12.227c0-.818-.073-1.604-.209-2.364H12v4.482h5.381a4.602 4.602 0 01-1.993 3.018v2.507h3.221c1.89-1.742 2.991-4.307 2.991-7.643z"/>
              <path fill="#34A853" d="M12 22c2.7 0 4.967-.895 6.623-2.429l-3.221-2.507c-.894.6-2.037.954-3.402.954-2.617 0-4.833-1.767-5.627-4.143H3.025v2.6A9.997 9.997 0 0012 22z"/>
              <path fill="#FBBC05" d="M6.373 13.875A5.996 5.996 0 016 12c0-.654.112-1.287.313-1.875v-2.6H3.025A9.997 9.997 0 002 12c0 1.654.4 3.217 1.025 4.475l3.348-2.6z"/>
              <path fill="#EA4335" d="M12 6.545c1.47 0 2.787.506 3.825 1.5l2.868-2.868C16.967 3.895 14.7 3 12 3A9.997 9.997 0 003.025 7.525l3.348 2.6C7.167 8.312 9.383 6.545 12 6.545z"/>
            </g>
          </svg>
          Continue with Google
        </Button>
        <p className="text-center text-sm text-gray-600 dark:text-gray-300">
          Don&apos;t have an account?{' '}
          <Link href="/sign-up" className="text-blue-600 hover:underline font-medium">Sign Up</Link>
        </p>
      </div>
    </div>
  );
}