"use client";

import { useLanguage } from "@/lib/language-provider";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Play, Eye, MoreVertical } from "lucide-react";
import Image from "next/image";

const sampleVideos = [
  {
    id: 1,
    title: "Agree? 🙂 Life without Internet #shorts #reels",
    thumbnail: "/placeholder.jpg",
    views: "4 megtekintés",
    overlay: "Agree??"
  },
  {
    id: 2,
    title: "cyber security of russia was compromised see...",
    thumbnail: "/placeholder.jpg",
    views: "28 megtekintés"
  },
  {
    id: 3,
    title: "space me internet|| #science #space #viral...",
    thumbnail: "/placeholder.jpg",
    views: "263 megtekintés",
    overlay: "Subscribe for more videos"
  },
  {
    id: 4,
    title: "welcome to cyber airlines 🙂🙂:...",
    thumbnail: "/placeholder.jpg",
    views: "32 megtekintés"
  },
  {
    id: 5,
    title: "World First Cyber truck wrap Indianın...",
    thumbnail: "/placeholder.jpg",
    views: "42 megtekintés",
    overlay: "HAPPY INDEPENDENCE DAY"
  },
  {
    id: 6,
    title: "Ai driving #technology #cyber #reels",
    thumbnail: "/placeholder.jpg",
    views: "512 megtekintés"
  },
  {
    id: 7,
    title: "CJ ON 32,s - World Most Viral Cyber Truck...",
    thumbnail: "/placeholder.jpg",
    views: "793 megtekintés"
  },
  {
    id: 8,
    title: "cyber crime||SVS|| #2024 #trending...",
    thumbnail: "/placeholder.jpg",
    views: "156 megtekintés",
    overlay: "GANGS have joined"
  },
  {
    id: 9,
    title: "Tech Speed | The internet made the worl...",
    thumbnail: "/placeholder.jpg",
    views: "12 megtekintés",
    overlay: "Tech Speed"
  },
  {
    id: 10,
    title: "Bina Internet ke rahna padega ab...",
    thumbnail: "/placeholder.jpg",
    views: "2,6 E megtekintés"
  }
];

export default function VotingSection() {
  const { t } = useLanguage();

  return (
    <section className="relative w-full h-[1247px] overflow-hidden">
      {/* Background image */}
      <div className="absolute inset-0 -z-10">
        <Image 
          src="/bg.png" 
          alt="Vote for films background" 
          fill 
          className="object-cover"
          priority
        />
      </div>
      
      <div className="container mx-auto px-4 relative z-10 flex flex-col justify-center h-full">
        <div className="text-center mb-20">
          <h2 className="text-6xl md:text-7xl font-bold mb-6 text-white">
            Vote for Films
          </h2>
          <p className="text-2xl text-white/80">
            Support your favorite films and help them win awards
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-y-2 gap-x-0 mb-16">
          {sampleVideos.map((video) => (
            <Card 
              key={video.id}
              className="bg-transparent border border-white/10 hover:border-white/20 transition-all duration-300 cursor-pointer group w-full max-w-[250px] mx-auto"
            >
              <CardHeader className="p-0">
                <div className="relative aspect-[3/4] bg-gradient-to-br from-gray-800 to-gray-900 rounded-t-lg overflow-hidden">
                  <Image
                    src={video.thumbnail}
                    alt={video.title}
                    fill
                    className="object-cover group-hover:scale-105 transition-transform duration-300"
                  />
                  
                  {/* Play button overlay */}
                  <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                    <div className="w-12 h-12 bg-black/60 rounded-full flex items-center justify-center">
                      <Play className="w-6 h-6 text-white ml-1" />
                    </div>
                  </div>
                  
                  {/* Video overlay text */}
                  {video.overlay && (
                    <div className="absolute top-2 left-2 bg-black/80 text-white text-sm px-3 py-1 rounded">
                      {video.overlay}
                    </div>
                  )}
                  
                  {/* Duration */}
                  <div className="absolute bottom-2 right-2 bg-black/80 text-white text-sm px-3 py-1 rounded">
                    3:45
                  </div>
                </div>
              </CardHeader>
              <CardContent className="p-4">
                <CardTitle className="text-sm font-medium text-white mb-3 line-clamp-2 leading-tight">
                  {video.title}
                </CardTitle>
                <div className="flex items-center justify-between">
                  <span className="text-sm text-white/70">
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
            className="bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 text-white px-10 py-6 text-xl font-bold rounded-lg shadow-lg hover:shadow-xl transition-all duration-300"
          >
            SHOW ALL VIDEOS
          </Button>
        </div>
      </div>
    </section>
  );
}
