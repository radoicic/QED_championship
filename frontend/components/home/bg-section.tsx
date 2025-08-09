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
      icon: "/film__cat/chat_bubble.png",
      title: "Narrative",
      description: "Craft compelling stories with a strong plot, character development, and a clear message."
    },
    {
      icon: "/film__cat/Document_with_lines.png",
      title: "Documentary", 
      description: "True-to-life stories that explore real events, people, or issues, aiming to inform and educate."
    },
    {
      icon: "/film__cat/lab_beaker.png",
      title: "Experimental",
      description: "Films that defy traditional narrative structures, or explore something we didn't expect."
    },
    {
      icon: "/film__cat/overlapping_circles.png",
      title: "Animation",
      description: "From hand-drawn to 3D wizardry, all animation techniques are welcome to show your creative limits."
    },
    {
      icon: "/film__cat/warning.png",
      title: "Dystopian",
      description: "Near-future visions of societies under oppressive control, exploring themes of freedom and systems."
    },
    {
      icon: "/film__cat/microchip.png",
      title: "AI & Identity",
      description: "Stories where machines dream, or when we question the human. Stories about technology, code, and humanity."
    }
  ]

  const sampleVideos = [
    {
      id: 1,
      title: "MONEY HEIST",
      thumbnail: "/placeholder.jpg",
      views: "2.1M views",
      overlay: "Beach Scene"
    },
    {
      id: 2,
      title: "AVENGERS ENDGAME",
      thumbnail: "/placeholder.jpg", 
      views: "1.8M views",
      overlay: "Global View"
    },
    {
      id: 3,
      title: "SQUID GAME",
      thumbnail: "/placeholder.jpg",
      views: "956K views",
      overlay: "Swirling"
    },
    {
      id: 4,
      title: "IRON MAN",
      thumbnail: "/placeholder.jpg",
      views: "1.2M views",
      overlay: "Urban"
    },
    {
      id: 5,
      title: "ARGO",
      thumbnail: "/placeholder.jpg",
      views: "3.4M views",
      overlay: "Automotive"
    },
    {
      id: 6,
      title: "OPPENHEIMER",
      thumbnail: "/placeholder.jpg",
      views: "567K views",
      overlay: "Sci-Fi"
    },
    {
      id: 7,
      title: "PARASITE",
      thumbnail: "/placeholder.jpg",
      views: "789K views",
      overlay: "Action"
    },
    {
      id: 8,
      title: "INTERSTELLAR",
      thumbnail: "/placeholder.jpg",
      views: "1.5M views",
      overlay: "Technology"
    },
    {
      id: 9,
      title: "The ARTIST",
      thumbnail: "/placeholder.jpg",
      views: "2.3M views",
      overlay: "Elon Musk"
    },
    {
      id: 10,
      title: "AVATAR",
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
             <div className="flex flex-col justify-start px-8 py-16">
              <div className="text-center mb-16">
                             <h2 className="text-5xl md:text-6xl font-bold text-white mb-10">
                   Film Categories
                 </h2>
              </div>
              
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-16 max-w-7xl mx-auto">
             {categories.map((category, index) => {
               const glowColors = [
                 { shadow: 'drop-shadow-[0_0_20px_rgba(248,113,113,0.8)] drop-shadow-[0_0_40px_rgba(248,113,113,0.6)]' }, // Red
                 { shadow: 'drop-shadow-[0_0_20px_rgba(74,222,128,0.8)] drop-shadow-[0_0_40px_rgba(74,222,128,0.6)]' }, // Green
                 { shadow: 'drop-shadow-[0_0_20px_rgba(96,165,250,0.8)] drop-shadow-[0_0_40px_rgba(96,165,250,0.6)]' }, // Blue
                 { shadow: 'drop-shadow-[0_0_20px_rgba(168,85,247,0.8)] drop-shadow-[0_0_40px_rgba(168,85,247,0.6)]' }, // Purple
                 { shadow: 'drop-shadow-[0_0_20px_rgba(251,146,60,0.8)] drop-shadow-[0_0_40px_rgba(251,146,60,0.6)]' }, // Orange
                 { shadow: 'drop-shadow-[0_0_20px_rgba(34,211,238,0.8)] drop-shadow-[0_0_40px_rgba(34,211,238,0.6)]' } // Cyan
               ];
               
                               return (
                                                                           <div key={index} className={`text-left ${
                                        index >= 3 ? "mt-16" : ""
                                      }`}>
                                                                <div className="mb-6 group">
                         <Image 
                           src={category.icon}
                           alt={category.title}
                           width={120}
                           height={120}
                           className="ml-0 transition-all duration-300 group-hover:scale-110 group-hover:drop-shadow-[0_0_20px_rgba(255,255,255,0.6)] group-hover:brightness-125"
                         />
                       </div>
                                                                                     <h3 className={`text-white text-2xl font-bold mb-4 ${
                                             index === 0 ? "mt-12" : // Narrative
                                             index === 3 ? "mt-16" : // Animation
                                             ""
                                           }`}>{category.title}</h3>
                     <p className="text-white/90 mb-6 text-lg leading-relaxed">{category.description}</p>
                                                                                                                                                                                                                                                           <div className={`${
                           index === 0 ? "ml-8" : 
                           index === 1 ? "ml-4" :
                           index === 2 ? "ml-8" :
                           index === 3 ? "ml-4" :
                           index === 4 ? "ml-4" :
                           "ml-8"
                         }`}>
                       <Button 
                         variant="link"
                         className={`text-lg font-semibold transition-all duration-300 flex items-center gap-2 ${
                           index === 0 ? "text-cyan-400 hover:text-cyan-300 mt-6" : 
                           index === 1 ? "text-orange-400 hover:text-orange-300 mt-5" :
                           index === 2 ? "text-blue-400 hover:text-blue-300 mt-8" :
                           index === 3 ? "text-purple-400 hover:text-purple-300 mt-6" :
                           index === 4 ? "text-red-400 hover:text-red-300 mt-10" :
                           "text-green-400 hover:text-green-300 mt-8"
                         }`}
                       >
                        SEE CHALLENGE DETAILS
                                                <Image 
                          src={index === 0 ? "/film__cat/blue_icon.png" :
                               index === 1 ? "/film__cat/yellow_icon.png" :
                               index === 2 ? "/film__cat/purple_icon.png" :
                               index === 3 ? "/film__cat/pink_icon.png" :
                               index === 4 ? "/film__cat/red_icon.png" :
                               "/film__cat/green_icon.png"}
                          alt="Category Icon" 
                          width={24} 
                          height={24} 
                          className="inline-block ml-2"
                          onError={(e) => {
                            const target = e.target as HTMLImageElement;
                            console.log('Image failed to load:', target.src);
                          }}
                        />
                     </Button>
                     </div>
                  </div>
                );
             })}
           </div>
        </div>

                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                               {/* Submit Your Entry Section */}
                <div className="flex flex-col justify-start px-8 py-[600px]">
                 <div className="text-center mb-8">
                               <h2 className="text-5xl md:text-6xl font-bold text-white mb-8">
                     Submit Your Entry
                   </h2>
                  <p className="text-2xl text-white/80 mb-12">
                    Support your favorite films and help them win awards
                  </p>
                </div>
          
                                                                                                                                                                               <div className="grid grid-cols-1 md:grid-cols-3 gap-24 max-w-6xl mx-auto">
                                                             <Card className="bg-transparent border-4 border-blue-400/60 rounded-2xl shadow-[0_0_30px_rgba(59,130,246,0.3)] p-8 w-80 h-80 cursor-pointer group hover:scale-105 hover:border-blue-300/80 hover:shadow-[0_0_40px_rgba(59,130,246,0.6)] transition-all duration-300">
                                                                                                                                              <CardHeader className="text-center pb-4">
                       <div className="text-7xl mb-4 group-hover:scale-110 transition-transform duration-300">🎥</div>
                       <CardTitle className="text-white text-3xl font-bold group-hover:text-blue-300 transition-colors duration-300">Max. 5 Minutes</CardTitle>
                     </CardHeader>
                     <CardContent className="text-center">
                       <p className="text-white text-lg mb-1 group-hover:text-blue-200 transition-colors duration-300">±15s</p>
                       <p className="text-white text-lg group-hover:text-blue-200 transition-colors duration-300">mp4, 720p</p>
                     </CardContent>
                </Card>
               
                                                                                                                                                                                                                                                <Card className="bg-transparent border-4 border-blue-400/60 rounded-2xl shadow-[0_0_30px_rgba(59,130,246,0.3)] p-8 w-80 h-80 cursor-pointer group hover:scale-105 hover:border-blue-300/80 hover:shadow-[0_0_40px_rgba(59,130,246,0.6)] transition-all duration-300">
                                                                                                                                                                                                                                                <CardHeader className="text-center pb-4">
                       <div className="text-7xl mb-4 group-hover:scale-110 transition-transform duration-300">📄</div>
                       <CardTitle className="text-white text-3xl font-bold group-hover:text-blue-300 transition-colors duration-300">Storyline (PDF)</CardTitle>
                     </CardHeader>
                     <CardContent className="text-center">
                       <p className="text-white text-lg group-hover:text-blue-200 transition-colors duration-300">Max. 2 pages</p>
                     </CardContent>
                </Card>
               
                                                                                                                        <Card className="bg-transparent border-4 border-blue-400/60 rounded-2xl shadow-[0_0_30px_rgba(59,130,246,0.3)] p-8 w-80 h-80 cursor-pointer group hover:scale-105 hover:border-blue-300/80 hover:shadow-[0_0_40px_rgba(59,130,246,0.6)] transition-all duration-300">
                                                                                                                                              <CardHeader className="text-center pb-4">
                       <div className="text-7xl mb-4 group-hover:scale-110 transition-transform duration-300">📝</div>
                       <CardTitle className="text-white text-3xl font-bold group-hover:text-blue-300 transition-colors duration-300">Script Draft (PDF)</CardTitle>
                     </CardHeader>
                     <CardContent className="text-center">
                       <p className="text-white text-lg group-hover:text-blue-200 transition-colors duration-300">Max. 4 pages</p>
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
                        src={video.id <= 9 ? 
                          (video.id === 1 ? "/money_heist.jpeg" : 
                           video.id === 2 ? "/avengers.jpeg" : 
                           video.id === 3 ? "/squid.jpg" : 
                           video.id === 4 ? "/iron_man.webp" :
                           video.id === 5 ? "/argo.jpg" :
                           video.id === 6 ? "/oppenhiemer.avif" :
                           video.id === 7 ? "/Parasite.jpeg" :
                           video.id === 8 ? "/interstellar.webp" :
                           "/the_artist.jpeg") : 
                          "/avatar.jpg"
                        }
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
               className="bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 text-white px-12 py-6 text-xl font-bold rounded-full shadow-[0_0_30px_rgba(147,51,234,0.8)] shadow-[0_0_60px_rgba(236,72,153,0.6)] hover:shadow-[0_0_40px_rgba(147,51,234,1)] hover:shadow-[0_0_80px_rgba(236,72,153,0.8)] transition-all duration-300 border border-purple-400/50 hover:border-purple-300/80"
             >
               SHOW ALL VIDEOS
             </Button>
           </div>
        </div>
      </div>
    </section>
  )
} 