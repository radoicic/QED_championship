import { NextResponse } from "next/server"

export async function GET() {
  // In a real app, you would fetch videos from a database
  const videos = [
    {
      id: "1",
      title: "The Silent Echo",
      description: "A journey through abandoned spaces and the echoes they contain.",
      thumbnail: "/placeholder.svg?height=720&width=1280",
      videoUrl: "https://example.com/videos/silent-echo.mp4",
      category: "documentary",
      votes: 127,
      duration: "12:34",
    },
    {
      id: "2",
      title: "Beyond the Horizon",
      description: "A sci-fi short about discovering new worlds beyond our perception.",
      thumbnail: "/placeholder.svg?height=720&width=1280",
      videoUrl: "https://example.com/videos/beyond-horizon.mp4",
      category: "narrative",
      votes: 89,
      duration: "15:21",
    },
    // More videos...
  ]

  return NextResponse.json(videos)
}

export async function POST(request: Request) {
  try {
    const data = await request.json()

    // Validate the request
    if (!data.title || !data.videoUrl || !data.category) {
      return NextResponse.json({ error: "Missing required fields" }, { status: 400 })
    }

    // In a real app, you would save the video to a database
    const newVideo = {
      id: Math.random().toString(36).substring(2, 9),
      title: data.title,
      description: data.description || "",
      thumbnail: data.thumbnail || "/placeholder.svg?height=720&width=1280",
      videoUrl: data.videoUrl,
      category: data.category,
      votes: 0,
      duration: data.duration || "00:00",
    }

    return NextResponse.json(newVideo, { status: 201 })
  } catch (error) {
    return NextResponse.json({ error: "Failed to create video" }, { status: 500 })
  }
}
