"use client"

import Image from "next/image"

export default function TestImagesPage() {
  return (
    <div className="min-h-screen p-8">
      <h1 className="text-3xl font-bold mb-8">Background Image Test</h1>
      
      <div className="space-y-8">
        {/* Test 1: Hero Background */}
        <div className="border p-4 rounded">
          <h2 className="text-xl font-semibold mb-4">Hero Background (Working)</h2>
          <div className="relative h-64 w-full border-2 border-dashed border-gray-300">
            <Image 
              src="/hero-bg.png" 
              alt="Hero background test" 
              fill 
              className="object-cover"
            />
          </div>
        </div>

        {/* Test 2: Upload Background */}
        <div className="border p-4 rounded">
          <h2 className="text-xl font-semibold mb-4">Upload Background (Updated to bg.png)</h2>
          <div className="relative h-64 w-full border-2 border-dashed border-gray-300">
            <Image 
              src="/bg.png" 
              alt="Upload background test" 
              fill 
              className="object-cover"
              onError={(e) => {
                console.error('Upload background failed to load');
              }}
              onLoad={() => {
                console.log('Upload background loaded successfully');
              }}
            />
          </div>
        </div>

        {/* Test 3: Profile Background */}
        <div className="border p-4 rounded">
          <h2 className="text-xl font-semibold mb-4">Profile Background (Updated to bg.png)</h2>
          <div className="relative h-64 w-full border-2 border-dashed border-gray-300">
            <Image 
              src="/bg.png" 
              alt="Profile background test" 
              fill 
              className="object-cover"
              onError={(e) => {
                console.error('Profile background failed to load');
              }}
              onLoad={() => {
                console.log('Profile background loaded successfully');
              }}
            />
          </div>
        </div>

        {/* Test 4: Videos Background (if exists) */}
        <div className="border p-4 rounded">
          <h2 className="text-xl font-semibold mb-4">Videos Background</h2>
          <div className="relative h-64 w-full border-2 border-dashed border-gray-300">
            <Image 
              src="/videos-bg.png" 
              alt="Videos background test" 
              fill 
              className="object-cover"
              onError={(e) => {
                console.error('Videos background failed to load - file might not exist');
              }}
              onLoad={() => {
                console.log('Videos background loaded successfully');
              }}
            />
          </div>
        </div>
      </div>

      <div className="mt-8 p-4 bg-gray-100 rounded">
        <h3 className="font-semibold mb-2">Debug Info:</h3>
        <ul className="text-sm space-y-1">
          <li>• Hero background: Should be visible (working)</li>
          <li>• Upload background: Check if visible</li>
          <li>• Profile background: Check if visible</li>
          <li>• Videos background: May not exist yet</li>
        </ul>
        <p className="text-sm mt-2 text-gray-600">
          Open browser console (F12) to see loading messages
        </p>
      </div>
    </div>
  )
} 