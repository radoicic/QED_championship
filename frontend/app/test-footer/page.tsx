"use client"

import Image from "next/image"

export default function TestFooterPage() {
  return (
    <div className="min-h-screen p-8 bg-gray-900">
      <h1 className="text-3xl font-bold mb-8 text-white">Footer Background Test</h1>
      
      <div className="space-y-8">
        {/* Test 1: Footer background */}
        <div className="border p-4 rounded bg-white">
          <h2 className="text-xl font-semibold mb-4">Footer Background Test</h2>
          <div className="relative h-64 w-full border-2 border-dashed border-gray-300">
            <Image 
              src="/footer-bg.png" 
              alt="Footer background test" 
              fill 
              className="object-cover"
              onError={(e) => {
                console.error('❌ Footer background failed to load');
                e.target.style.backgroundColor = 'red';
              }}
              onLoad={() => {
                console.log('✅ Footer background loaded successfully');
              }}
            />
          </div>
        </div>

        {/* Test 2: File size info */}
        <div className="border p-4 rounded bg-white">
          <h2 className="text-xl font-semibold mb-4">File Information</h2>
          <div className="space-y-2">
            <p>File: /footer-bg.png</p>
            <p>Size: 1.5MB (very large)</p>
            <p>Status: {typeof window !== 'undefined' ? 'Checking...' : 'Server side'}</p>
          </div>
        </div>

        {/* Test 3: Alternative approach */}
        <div className="border p-4 rounded bg-white">
          <h2 className="text-xl font-semibold mb-4">Alternative Solution</h2>
          <div className="space-y-2">
            <p>If the image doesn't load due to size:</p>
            <ul className="text-sm space-y-1">
              <li>• Compress the image to under 500KB</li>
              <li>• Convert to JPG format</li>
              <li>• Use a smaller resolution</li>
              <li>• Or use a CSS gradient as fallback</li>
            </ul>
          </div>
        </div>
      </div>

      <div className="mt-8 p-4 bg-blue-100 rounded">
        <h3 className="font-semibold mb-2">Instructions:</h3>
        <ol className="text-sm space-y-1">
          <li>1. Open browser console (F12)</li>
          <li>2. Look for ✅ success or ❌ error messages</li>
          <li>3. Check Network tab to see if image loads</li>
          <li>4. If image shows red background, it failed to load</li>
        </ol>
      </div>
    </div>
  )
} 