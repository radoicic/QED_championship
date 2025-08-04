"use client"

export default function TestCSSBackgroundPage() {
  return (
    <div className="min-h-screen p-8 bg-gray-900">
      <h1 className="text-3xl font-bold mb-8 text-white">CSS Background Test</h1>
      
      <div className="space-y-8">
        {/* Test 1: Profile Background */}
        <div className="border p-4 rounded bg-white">
          <h2 className="text-xl font-semibold mb-4">Profile Background Test (Updated to bg.png)</h2>
          <div 
            className="relative h-64 w-full border-2 border-dashed border-gray-300 bg-cover bg-center bg-no-repeat"
            style={{
              backgroundImage: 'url(/bg.png)',
            }}
          />
        </div>

        {/* Test 2: Upload Background */}
        <div className="border p-4 rounded bg-white">
          <h2 className="text-xl font-semibold mb-4">Upload Background Test (Updated to bg.png)</h2>
          <div 
            className="relative h-64 w-full border-2 border-dashed border-gray-300 bg-cover bg-center bg-no-repeat"
            style={{
              backgroundImage: 'url(/bg.png)',
            }}
          />
        </div>

        {/* Test 3: Videos Background */}
        <div className="border p-4 rounded bg-white">
          <h2 className="text-xl font-semibold mb-4">Videos Background Test</h2>
          <div 
            className="relative h-64 w-full border-2 border-dashed border-gray-300 bg-cover bg-center bg-no-repeat"
            style={{
              backgroundImage: 'url(/videos-bg.png)',
            }}
          />
        </div>

        {/* Test 4: Footer Background */}
        <div className="border p-4 rounded bg-white">
          <h2 className="text-xl font-semibold mb-4">Footer Background Test</h2>
          <div 
            className="relative h-64 w-full border-2 border-dashed border-gray-300 bg-cover bg-center bg-no-repeat"
            style={{
              backgroundImage: 'url(/footer-bg.png)',
            }}
          />
        </div>
      </div>

      <div className="mt-8 p-4 bg-blue-100 rounded">
        <h3 className="font-semibold mb-2">Instructions:</h3>
        <ol className="text-sm space-y-1">
          <li>1. Check if any of the background images are visible above</li>
          <li>2. If they show up here, they should work on the actual pages</li>
          <li>3. If they don't show up, the files might be corrupted or too large</li>
        </ol>
      </div>
    </div>
  )
} 