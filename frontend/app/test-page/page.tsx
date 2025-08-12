export default function TestPage() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <div className="text-center">
        <h1 className="text-4xl font-bold text-gray-800 mb-4">
          Test Page Working! 🎉
        </h1>
        <p className="text-gray-600 text-lg">
          If you can see this, your Next.js app is working correctly.
        </p>
        <div className="mt-6 p-4 bg-white rounded-lg shadow-md">
          <h2 className="text-xl font-semibold mb-2">Deployment Status:</h2>
          <ul className="text-left text-sm space-y-1">
            <li>✅ Next.js app is running</li>
            <li>✅ Routing is working</li>
            <li>✅ Components are rendering</li>
          </ul>
        </div>
      </div>
    </div>
  )
}
