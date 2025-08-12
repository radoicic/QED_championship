export default function VideosPage() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-900 via-purple-900 to-indigo-900">
      <div className="text-center text-white">
        <h1 className="text-4xl font-bold mb-6">
          Videos Page
        </h1>
        <p className="text-xl mb-8">
          This page is temporarily simplified for deployment
        </p>
        <div className="space-y-4">
          <div className="p-4 bg-white/10 rounded-lg backdrop-blur-sm">
            <h2 className="text-2xl font-semibold mb-2">🚧 Under Construction</h2>
            <p>Full videos functionality will be restored after successful deployment</p>
          </div>
          <a 
            href="/"
            className="inline-block px-6 py-3 bg-white text-blue-900 hover:bg-gray-100 rounded-lg font-medium transition-colors"
          >
            Back to Home
          </a>
        </div>
      </div>
    </div>
  )
} 