"use client"

export default function Home() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-center overflow-x-hidden bg-gradient-to-br from-blue-900 via-purple-900 to-indigo-900">
      <div className="text-center text-white">
        <h1 className="text-6xl font-bold mb-6">
          QED Championship
        </h1>
        <p className="text-xl mb-8">
          Welcome to the Quantum Entertainment & Design Championship
        </p>
        <div className="space-y-4">
          <div className="p-4 bg-white/10 rounded-lg backdrop-blur-sm">
            <h2 className="text-2xl font-semibold mb-2">🚀 App is Running!</h2>
            <p>Your Next.js application is successfully deployed on Vercel</p>
          </div>
          <div className="p-4 bg-white/10 rounded-lg backdrop-blur-sm">
            <h3 className="text-lg font-semibold mb-2">Next Steps:</h3>
            <ul className="text-sm space-y-1">
              <li>✅ Basic deployment working</li>
              <li>🔄 Test dynamic components</li>
              <li>🔧 Configure environment variables</li>
            </ul>
          </div>
        </div>
      </div>
    </main>
  )
}
