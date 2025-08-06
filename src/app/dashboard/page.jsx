

export default function DashboardPage() {
  return (
    <div className="bg-gray-50 dark:bg-gray-900">
      <main className="flex-1 p-8">
        <h1 className="text-3xl font-bold mb-6">Dashboard</h1>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          {/* Example widgets */}
          <div className="bg-white rounded-lg shadow p-6">
            <div className="text-gray-500 text-sm">Posts</div>
            <div className="text-2xl font-semibold">123</div>
          </div>
          <div className="bg-white rounded-lg shadow p-6">
            <div className="text-gray-500 text-sm">Users</div>
            <div className="text-2xl font-semibold">8</div>
          </div>
          <div className="bg-white rounded-lg shadow p-6">
            <div className="text-gray-500 text-sm">Media</div>
            <div className="text-2xl font-semibold">42</div>
          </div>
          <div className="bg-white rounded-lg shadow p-6">
            <div className="text-gray-500 text-sm">Views</div>
            <div className="text-2xl font-semibold">1,234</div>
          </div>
        </div>
        <div className="bg-white rounded-lg shadow p-6">
          <h2 className="text-xl font-semibold mb-4">Recent Activity</h2>
          <ul className="text-gray-700 space-y-2">
            <li>User <b>admin</b> created a new post</li>
            <li>Post <b>"Welcome to the CMS"</b> was updated</li>
            <li>New user <b>editor</b> registered</li>
          </ul>
        </div>
      </main>
    </div>
  );
}