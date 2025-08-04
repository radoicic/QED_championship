"use client"

import Image from "next/image"

export default function DebugFooterPage() {
  return (
    <div className="min-h-screen p-8 bg-gray-900">
      <h1 className="text-3xl font-bold mb-8 text-white">Footer Debug</h1>
      
      <div className="space-y-8">
        {/* Test 1: Direct Image */}
        <div className="border p-4 rounded bg-white">
          <h2 className="text-xl font-semibold mb-4">Direct Image Test</h2>
          <div className="relative h-64 w-full border-2 border-dashed border-gray-300">
            <img 
              src="/footer-bg.png" 
              alt="Footer background test" 
              className="w-full h-full object-cover"
              onError={(e) => {
                console.error('❌ Direct image failed');
                e.target.style.backgroundColor = 'red';
              }}
              onLoad={() => {
                console.log('✅ Direct image loaded');
              }}
            />
          </div>
        </div>

        {/* Test 2: Next.js Image */}
        <div className="border p-4 rounded bg-white">
          <h2 className="text-xl font-semibold mb-4">Next.js Image Test</h2>
          <div className="relative h-64 w-full border-2 border-dashed border-gray-300">
            <Image 
              src="/footer-bg.png" 
              alt="Footer background test" 
              fill 
              className="object-cover"
              onError={(e) => {
                console.error('❌ Next.js image failed');
                e.target.style.backgroundColor = 'red';
              }}
              onLoad={() => {
                console.log('✅ Next.js image loaded');
              }}
            />
          </div>
        </div>

        {/* Test 3: Footer Component */}
        <div className="border p-4 rounded bg-white">
          <h2 className="text-xl font-semibold mb-4">Footer Component Test</h2>
          <div className="relative h-64 w-full border-2 border-dashed border-gray-300 bg-gray-800">
            <div className="absolute inset-0 -z-10">
              <Image 
                src="/footer-bg.png" 
                alt="Footer background" 
                fill 
                priority
                className="object-cover opacity-60"
                onError={(e) => {
                  console.error('❌ Footer component failed');
                  e.target.style.backgroundColor = 'red';
                }}
                onLoad={() => {
                  console.log('✅ Footer component loaded');
                }}
              />
            </div>
            <div className="relative z-10 p-4 text-white">
              <p>Footer content overlay</p>
            </div>
          </div>
        </div>

        {/* Test 4: File Check */}
        <div className="border p-4 rounded bg-white">
          <h2 className="text-xl font-semibold mb-4">File Information</h2>
          <div className="space-y-2">
            <p>File: /footer-bg.png</p>
            <p>Size: 1.5MB</p>
            <p>Type: PNG</p>
            <p>Status: Checking...</p>
          </div>
        </div>
      </div>

      <div className="mt-8 p-4 bg-blue-100 rounded">
        <h3 className="font-semibold mb-2">Instructions:</h3>
        <ol className="text-sm space-y-1">
          <li>1. Open browser console (F12)</li>
          <li>2. Look for ✅ success or ❌ error messages</li>
          <li>3. Check Network tab to see if image loads</li>
          <li>4. If any test shows red background, that method failed</li>
        </ol>
      </div>
    </div>
  )
} 