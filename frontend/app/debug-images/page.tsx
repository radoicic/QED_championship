"use client"

import { useState, useEffect } from "react"
import { getImageSizeInfo, optimizeBackgroundImage } from "@/lib/image-optimizer"

export default function DebugImagesPage() {
  const [imageInfo, setImageInfo] = useState<any>({})

  useEffect(() => {
    const checkImageSizes = async () => {
      const images = ['/bg.png', '/hero-bg.png']
      const info: any = {}
      
      for (const image of images) {
        try {
          const sizeInfo = await getImageSizeInfo(image)
          info[image] = sizeInfo
        } catch (error) {
          info[image] = { error: 'Failed to load' }
        }
      }
      
      setImageInfo(info)
    }

    checkImageSizes()
  }, [])

  return (
    <div className="min-h-screen p-8 bg-gray-100">
      <h1 className="text-3xl font-bold mb-8">Image Debug & Optimization</h1>
      
      <div className="space-y-8">
        {/* File Size Analysis */}
        <div className="border p-4 rounded bg-white">
          <h2 className="text-xl font-semibold mb-4">File Size Analysis</h2>
          <div className="space-y-2">
            {Object.entries(imageInfo).map(([path, info]: [string, any]) => (
              <div key={path} className="flex justify-between items-center p-2 bg-gray-50 rounded">
                <span className="font-mono text-sm">{path}</span>
                <div className="text-right">
                  {info.error ? (
                    <span className="text-red-500">❌ {info.error}</span>
                  ) : (
                    <div>
                      <span className={`font-bold ${info.optimized ? 'text-green-600' : 'text-red-600'}`}>
                        {info.sizeKB}KB
                      </span>
                      <span className={`ml-2 text-xs ${info.optimized ? 'text-green-600' : 'text-red-600'}`}>
                        {info.optimized ? '✅ Optimized' : '❌ Too Large'}
                      </span>
                    </div>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Test 1: Upload Background */}
        <div className="border p-4 rounded bg-white">
          <h2 className="text-xl font-semibold mb-4">Upload Background Test (Updated to bg.png)</h2>
          <div className="relative h-64 w-full border-2 border-dashed border-gray-300">
            <img 
              src="/bg.png" 
              alt="Upload background test" 
              className="w-full h-full object-cover"
              onError={(e) => {
                console.error('❌ Upload background failed to load');
                e.target.style.backgroundColor = 'red';
              }}
              onLoad={() => {
                console.log('✅ Upload background loaded successfully');
              }}
            />
          </div>
        </div>

        {/* Test 2: Profile Background */}
        <div className="border p-4 rounded bg-white">
          <h2 className="text-xl font-semibold mb-4">Profile Background Test (Updated to bg.png)</h2>
          <div className="relative h-64 w-full border-2 border-dashed border-gray-300">
            <img 
              src="/bg.png" 
              alt="Profile background test" 
              className="w-full h-full object-cover"
              onError={(e) => {
                console.error('❌ Profile background failed to load');
                e.target.style.backgroundColor = 'red';
              }}
              onLoad={() => {
                console.log('✅ Profile background loaded successfully');
              }}
            />
          </div>
        </div>

        {/* Optimization Recommendations */}
        <div className="border p-4 rounded bg-white">
          <h2 className="text-xl font-semibold mb-4">Optimization Recommendations</h2>
          <div className="space-y-4">
            <div className="bg-yellow-50 p-4 rounded">
              <h3 className="font-semibold text-yellow-800 mb-2">If images are too large:</h3>
              <ul className="text-sm text-yellow-700 space-y-1">
                <li>• Convert PNG to JPG (better compression)</li>
                <li>• Resize to 1920x1080 or smaller</li>
                <li>• Use 70-80% quality for JPG</li>
                <li>• Target file size: under 500KB</li>
                <li>• Use online tools: TinyPNG, ImageOptim, or Squoosh</li>
              </ul>
            </div>
            
            <div className="bg-blue-50 p-4 rounded">
              <h3 className="font-semibold text-blue-800 mb-2">Alternative Solution:</h3>
              <p className="text-sm text-blue-700">
                If images still don't work, we can use CSS gradients instead of images for better performance.
              </p>
            </div>
          </div>
        </div>
      </div>

      <div className="mt-8 p-4 bg-green-100 rounded">
        <h3 className="font-semibold mb-2">Quick Actions:</h3>
        <ol className="text-sm space-y-1">
          <li>1. Check file sizes above - anything over 500KB needs optimization</li>
          <li>2. Visit <a href="https://tinypng.com" target="_blank" className="text-blue-600 underline">TinyPNG</a> to compress images</li>
          <li>3. Replace large PNG files with optimized JPG versions</li>
          <li>4. Test the pages again after optimization</li>
        </ol>
      </div>
    </div>
  )
} 