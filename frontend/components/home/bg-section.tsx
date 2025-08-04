"use client"

import Image from "next/image"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Play, MoreVertical } from "lucide-react"
import { useLanguage } from "@/lib/language-provider"

export default function BgSection() {
  const { t } = useLanguage()

  const categories = [
    {
      icon: "💬",
      title: "Narrative",
      description: "Craft compelling stories with a strong plot, character development, and a clear message."
    },
    {
      icon: "📄",
      title: "Documentary", 
      description: "True-to-life stories that explore real events, people, or issues, aiming to inform and educate."
    },
    {
      icon: "🧪",
      title: "Experimental",
      description: "Films that defy traditional narrative structures, or explore something we didn't expect."
    },
    {
      icon: "🎨",
      title: "Animation",
      description: "From hand-drawn to 3D wizardry, all animation techniques are welcome to show your creative limits."
    },
    {
      icon: "⚠️",
      title: "Dystopian",
      description: "Near-future visions of societies under oppressive control, exploring themes of freedom and systems."
    },
    {
      icon: "🤖",
      title: "AI & Identity",
      description: "Stories where machines dream, or when we question the human. Stories about technology, code, and humanity."
    }
  ]

  const sampleVideos = [
    {
      id: 1,
      title: "Bored?",
      thumbnail: "/placeholder.jpg",
      views: "2.1M views",
      overlay: "Beach Scene"
    },
    {
      id: 2,
      title: "World Map",
      thumbnail: "/placeholder.jpg", 
      views: "1.8M views",
      overlay: "Global View"
    },
    {
      id: 3,
      title: "Vortex",
      thumbnail: "/placeholder.jpg",
      views: "956K views",
      overlay: "Swirling"
    },
    {
      id: 4,
      title: "Night Building",
      thumbnail: "/placeholder.jpg",
      views: "1.2M views",
      overlay: "Urban"
    },
    {
      id: 5,
      title: "Car Interior",
      thumbnail: "/placeholder.jpg",
      views: "3.4M views",
      overlay: "Automotive"
    },
    {
      id: 6,
      title: "Futuristic Vehicle",
      thumbnail: "/placeholder.jpg",
      views: "567K views",
      overlay: "Sci-Fi"
    },
    {
      id: 7,
      title: "GANGS",
      thumbnail: "/placeholder.jpg",
      views: "789K views",
      overlay: "Action"
    },
    {
      id: 8,
      title: "The internet made the world smaller...",
      thumbnail: "/placeholder.jpg",
      views: "1.5M views",
      overlay: "Technology"
    },
    {
      id: 9,
      title: "Elon internet is mine. Biology ok.",
      thumbnail: "/placeholder.jpg",
      views: "2.3M views",
      overlay: "Elon Musk"
    },
    {
      id: 10,
      title: "Tech Speed",
      thumbnail: "/placeholder.jpg",
      views: "12 views",
      overlay: "Tech Speed"
    }
  ]

  return (
    <section className="relative w-full overflow-hidden" style={{ height: '4810px' }}>
      {/* Bg Background */}
      <div className="absolute inset-0 -z-10">
        <Image 
          src="/bg.png" 
          alt="Background" 
          fill 
          className="object-cover"
          priority
        />
      </div>

      {/* Content Overlay */}
      <div className="relative z-20 h-full flex flex-col">
        
        {/* Film Categories Section */}
        <div className="flex-1 flex flex-col justify-center px-8 py-20">
          <div className="text-center mb-16">
            <h2 className="text-5xl md:text-6xl font-bold text-white mb-6 drop-shadow-[0_0_20px_rgba(255,255,255,0.5)]">
              Film Categories
            </h2>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10 max-w-7xl mx-auto">
            {categories.map((category, index) => (
              <Card key={index} className="bg-black/20 backdrop-blur-md border border-white/30 hover:border-white/50 transition-all duration-300 hover:shadow-[0_0_30px_rgba(147,51,234,0.3)] rounded-2xl">
                <CardHeader className="text-center pb-6">
                  <div className="text-5xl mb-6 drop-shadow-[0_0_15px_rgba(255,255,255,0.6)]">{category.icon}</div>
                  <CardTitle className="text-white text-2xl font-bold drop-shadow-[0_0_10px_rgba(255,255,255,0.8)]">{category.title}</CardTitle>
                </CardHeader>
                <CardContent className="text-center">
                  <p className="text-white/90 mb-6 text-lg leading-relaxed">{category.description}</p>
                  <Button variant="link" className="text-purple-400 hover:text-purple-300 text-lg font-semibold drop-shadow-[0_0_10px_rgba(147,51,234,0.6)]">
                    SEE CHALLENGE DETAILS
                  </Button>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>

        {/* Submit Your Entry Section */}
        <div className="flex-1 flex flex-col justify-center px-8 py-20">
          <div className="text-center mb-16">
            <h2 className="text-5xl md:text-6xl font-bold text-white mb-6 drop-shadow-[0_0_20px_rgba(255,255,255,0.5)]">
              Submit Your Entry
            </h2>
            <p className="text-2xl text-white/80 mb-8">
              Support your favorite films and help them win awards
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-10 max-w-5xl mx-auto">
            <Card className="bg-black/20 backdrop-blur-md border border-white/30 rounded-2xl shadow-[0_0_30px_rgba(255,255,255,0.1)]">
              <CardHeader className="text-center pb-6">
                <div className="text-5xl mb-6 drop-shadow-[0_0_15px_rgba(255,255,255,0.6)]">🎥</div>
                <CardTitle className="text-white text-2xl font-bold drop-shadow-[0_0_10px_rgba(255,255,255,0.8)]">Max. 5 Minutes</CardTitle>
              </CardHeader>
              <CardContent className="text-center">
                <p className="text-white/90 text-lg">±15s</p>
                <p className="text-white/90 text-lg">mp4, 720p</p>
              </CardContent>
            </Card>
            
            <Card className="bg-black/20 backdrop-blur-md border border-white/30 rounded-2xl shadow-[0_0_30px_rgba(255,255,255,0.1)]">
              <CardHeader className="text-center pb-6">
                <div className="text-5xl mb-6 drop-shadow-[0_0_15px_rgba(255,255,255,0.6)]">📄</div>
                <CardTitle className="text-white text-2xl font-bold drop-shadow-[0_0_10px_rgba(255,255,255,0.8)]">Storyline (PDF)</CardTitle>
              </CardHeader>
              <CardContent className="text-center">
                <p className="text-white/90 text-lg">Max. 2 pages</p>
              </CardContent>
            </Card>
            
            <Card className="bg-black/20 backdrop-blur-md border border-white/30 rounded-2xl shadow-[0_0_30px_rgba(255,255,255,0.1)]">
              <CardHeader className="text-center pb-6">
                <div className="text-5xl mb-6 drop-shadow-[0_0_15px_rgba(255,255,255,0.6)]">📝</div>
                <CardTitle className="text-white text-2xl font-bold drop-shadow-[0_0_10px_rgba(255,255,255,0.8)]">Script Draft (PDF)</CardTitle>
              </CardHeader>
              <CardContent className="text-center">
                <p className="text-white/90 text-lg">Max. 4 pages</p>
              </CardContent>
            </Card>
          </div>
        </div>

        {/* Vote for Films Section */}
        <div className="flex-1 flex flex-col justify-center px-8 py-20">
          <div className="text-center mb-16">
            <h2 className="text-5xl md:text-6xl font-bold text-white mb-6 drop-shadow-[0_0_20px_rgba(255,255,255,0.5)]">
              Vote for Films
            </h2>
            <p className="text-2xl text-white/80 mb-8">
              Support your favorite films and help them win awards
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-6 mb-16 max-w-7xl mx-auto">
            {sampleVideos.map((video) => (
              <Card 
                key={video.id}
                className="bg-black/20 backdrop-blur-md border border-white/20 hover:border-white/40 transition-all duration-300 cursor-pointer group w-full max-w-[220px] mx-auto rounded-xl shadow-[0_0_20px_rgba(255,255,255,0.1)] hover:shadow-[0_0_30px_rgba(147,51,234,0.3)]"
              >
                <CardHeader className="p-0">
                  <div className="relative aspect-[3/4] bg-gradient-to-br from-gray-800 to-gray-900 rounded-t-xl overflow-hidden">
                    <Image
                      src={video.thumbnail}
                      alt={video.title}
                      fill
                      className="object-cover group-hover:scale-105 transition-transform duration-300"
                    />
                    
                    {/* Play button overlay */}
                    <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                      <div className="w-12 h-12 bg-black/60 rounded-full flex items-center justify-center shadow-[0_0_20px_rgba(255,255,255,0.6)]">
                        <Play className="w-6 h-6 text-white ml-1" />
                      </div>
                    </div>
                    
                    {/* Video overlay text */}
                    {video.overlay && (
                      <div className="absolute top-3 left-3 bg-black/80 text-white text-sm px-3 py-1 rounded-lg shadow-[0_0_10px_rgba(0,0,0,0.8)]">
                        {video.overlay}
                      </div>
                    )}
                    
                    {/* Duration */}
                    <div className="absolute bottom-3 right-3 bg-black/80 text-white text-sm px-3 py-1 rounded-lg shadow-[0_0_10px_rgba(0,0,0,0.8)]">
                      3:45
                    </div>
                  </div>
                </CardHeader>
                <CardContent className="p-4">
                  <CardTitle className="text-sm font-medium text-white mb-3 line-clamp-2 leading-tight drop-shadow-[0_0_5px_rgba(255,255,255,0.8)]">
                    {video.title}
                  </CardTitle>
                  <div className="flex items-center justify-between">
                    <span className="text-xs text-white/70">
                      {video.views}
                    </span>
                    <MoreVertical className="w-4 h-4 text-white/50 hover:text-white/80 transition-colors" />
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>

          <div className="text-center">
            <Button 
              size="lg"
              className="bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 text-white px-12 py-6 text-xl font-bold rounded-full shadow-[0_0_40px_rgba(147,51,234,0.6)] hover:shadow-[0_0_50px_rgba(147,51,234,0.8)] transition-all duration-300"
            >
              SHOW ALL VIDEOS
            </Button>
          </div>
        </div>
      </div>
    </section>
  )
} 