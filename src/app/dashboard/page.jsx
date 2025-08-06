export default function DashboardPage() {
  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
      <main className="flex-1 p-8">
        <h1 className="text-3xl font-bold mb-6 text-gray-900 dark:text-white">Dashboard</h1>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          {/* Stats widgets with proper contrast */}
          <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-6 border border-gray-200 dark:border-gray-700">
            <div className="text-gray-600 dark:text-gray-400 text-sm font-medium uppercase tracking-wide">Posts</div>
            <div className="text-3xl font-bold text-gray-900 dark:text-white mt-2">123</div>
          </div>
          
          <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-6 border border-gray-200 dark:border-gray-700">
            <div className="text-gray-600 dark:text-gray-400 text-sm font-medium uppercase tracking-wide">Users</div>
            <div className="text-3xl font-bold text-gray-900 dark:text-white mt-2">8</div>
          </div>
          
          <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-6 border border-gray-200 dark:border-gray-700">
            <div className="text-gray-600 dark:text-gray-400 text-sm font-medium uppercase tracking-wide">Media</div>
            <div className="text-3xl font-bold text-gray-900 dark:text-white mt-2">42</div>
          </div>
          
          <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-6 border border-gray-200 dark:border-gray-700">
            <div className="text-gray-600 dark:text-gray-400 text-sm font-medium uppercase tracking-wide">Views</div>
            <div className="text-3xl font-bold text-gray-900 dark:text-white mt-2">1,234</div>
          </div>
        </div>
        
        {/* Recent Activity section with better styling */}
        <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-6 border border-gray-200 dark:border-gray-700">
          <h2 className="text-xl font-semibold mb-4 text-gray-900 dark:text-white">Recent Activity</h2>
          <div className="space-y-3">
            <div className="flex items-center p-3 bg-gray-50 dark:bg-gray-700 rounded-md">
              <div className="w-2 h-2 bg-green-500 rounded-full mr-3"></div>
              <span className="text-gray-700 dark:text-gray-300">
                User <span className="font-semibold text-gray-900 dark:text-white">admin</span> created a new post
              </span>
            </div>
            
            <div className="flex items-center p-3 bg-gray-50 dark:bg-gray-700 rounded-md">
              <div className="w-2 h-2 bg-blue-500 rounded-full mr-3"></div>
              <span className="text-gray-700 dark:text-gray-300">
                Post <span className="font-semibold text-gray-900 dark:text-white">"Welcome to the CMS"</span> was updated
              </span>
            </div>
            
            <div className="flex items-center p-3 bg-gray-50 dark:bg-gray-700 rounded-md">
              <div className="w-2 h-2 bg-purple-500 rounded-full mr-3"></div>
              <span className="text-gray-700 dark:text-gray-300">
                New user <span className="font-semibold text-gray-900 dark:text-white">editor</span> registered
              </span>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}