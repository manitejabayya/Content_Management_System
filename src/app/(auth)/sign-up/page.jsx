<Button
  type="button"
  className="w-full flex items-center justify-center gap-2 bg-white border border-gray-300 dark:bg-gray-800 dark:border-gray-700 text-gray-700 dark:text-gray-200 font-semibold py-2 rounded-lg shadow hover:bg-gray-50 dark:hover:bg-gray-700 transition-all mb-4"
  onClick={() => {
    window.location.href = '/api/auth/google';
  }}
>
  <span className="bg-white rounded-full p-1 flex items-center justify-center shadow">
    <svg className="w-5 h-5" viewBox="0 0 24 24">
      <path fill="#EA4335" d="M12 11.7v2.6h7.4c-.3 1.7-2 5-7.4 5-4.4 0-8-3.6-8-8s3.6-8 8-8c2.5 0 4.2 1 5.2 1.9l-2.1 2c-.7-.6-1.8-1.3-3.1-1.3-2.7 0-4.9 2.2-4.9 4.9s2.2 4.9 4.9 4.9c3.1 0 4.2-2.2 4.4-3.4H12z"/>
    </svg>
  </span>
  Continue with Google
</Button>
