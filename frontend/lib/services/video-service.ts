import api from '../api';
import { apiConfig } from '../api';
import { useSnackbar } from 'notistack';
import { AxiosProgressEvent } from 'axios';

export interface VideoUploadData {
  title: string;
  description: string;
  category: string;
  duration: string;
  video: File;
  script: File;
  thumbnail?: File;
}

export interface VideoUpdateData {
  title?: string;
  description?: string;
  category?: string;
  video?: File;
  script?: File;
  thumbnail?: File;
}

export interface Video {
  id: string;
  title: string;
  description: string;
  thumbnail: string;
  videoUrl: string;
  category: string;
  votes: number;
  duration: string;
  scriptUrl?: string;
  uploader?: {
    id: string;
    username: string;
    email: string;
  };
  status?: string;
  createdAt?: string;
  updatedAt?: string;
}

const addServerBaseUrl = (url: string) => {
  if (!url) return url;
  if (url.startsWith('http')) return url;
  if (url.startsWith('/placeholder.svg')) return url;
  // Ensure the path starts with a forward slash
  const path = url.startsWith('/') ? url : `/${url}`;
  return `${process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5000'}${path}`;
};

export const uploadVideo = async (
  data: VideoUploadData,
  onProgress?: (progress: number) => void
): Promise<Video> => {
  const formData = new FormData();
  formData.append('title', data.title);
  formData.append('description', data.description);
  formData.append('category', data.category);
  formData.append('duration', data.duration);
  formData.append('video', data.video);
  formData.append('script', data.script);
  if (data.thumbnail) {
    formData.append('thumbnail', data.thumbnail);
  }

  try {
    const response = await api.post(apiConfig.videos.upload, formData, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
      onUploadProgress: (progressEvent: AxiosProgressEvent) => {
        if (onProgress && progressEvent.total) {
          const progress = Math.round((progressEvent.loaded * 100) / progressEvent.total);
          onProgress(progress);
        }
      },
    });

    return response.data.video;
  } catch (error) {
    console.error('Video upload error:', error);
    throw new Error(error instanceof Error ? error.message : 'Failed to upload video');
  }
};

export const getVideos = async (page = 1, limit = 10): Promise<{
  videos: Video[];
  currentPage: number;
  totalPages: number;
  totalVideos: number;
}> => {
  const response = await api.get(apiConfig.videos.getAll, {
    params: { page, limit },
  });

  // Transform the response to match our Video interface
  const transformedVideos = response.data.videos.map((video: any) => ({
    id: video._id,
    title: video.title,
    description: video.description,
    thumbnail: addServerBaseUrl(video.thumbnailUrl) || "/placeholder.svg?height=720&width=1280",
    videoUrl: addServerBaseUrl(video.videoUrl),
    category: video.category,
    votes: video.votes || 0,
    duration: video.duration || "00:00",
    scriptUrl: addServerBaseUrl(video.scriptUrl),
    uploader: video.uploader ? {
      id: video.uploader._id,
      username: video.uploader.username,
      email: video.uploader.email
    } : undefined,
    status: video.status,
    createdAt: video.createdAt,
    updatedAt: video.updatedAt
  }));

  return {
    videos: transformedVideos,
    currentPage: response.data.currentPage,
    totalPages: response.data.totalPages,
    totalVideos: response.data.totalVideos
  };
};

export const getVideosByCategory = async (
  category: string,
  page = 1,
  limit = 10
): Promise<{
  videos: Video[];
  currentPage: number;
  totalPages: number;
  totalVideos: number;
}> => {
  const response = await api.get(apiConfig.videos.getByCategory(category), {
    params: { page, limit },
  });
   // Transform the response to match our Video interface
   const transformedVideos = response.data.videos.map((video: any) => ({
    id: video._id,
    title: video.title,
    description: video.description,
    thumbnail: addServerBaseUrl(video.thumbnailUrl) || "/placeholder.svg?height=720&width=1280",
    videoUrl: addServerBaseUrl(video.videoUrl),
    category: video.category,
    votes: video.votes || 0,
    duration: video.duration || "00:00",
    scriptUrl: addServerBaseUrl(video.scriptUrl),
    uploader: video.uploader ? {
      id: video.uploader._id,
      username: video.uploader.username,
      email: video.uploader.email
    } : undefined,
    status: video.status,
    createdAt: video.createdAt,
    updatedAt: video.updatedAt
  }));

  return {
    videos: transformedVideos,
    currentPage: response.data.currentPage,
    totalPages: response.data.totalPages,
    totalVideos: response.data.totalVideos
  };
};

export const getMyVideos = async (userId: string): Promise<Video[]> => {
  try {
    const response = await api.get(apiConfig.videos.getMyVideos, {
      params: { userId }
    });

    // Transform the response to match our Video interface
    return response.data.map((video: any) => ({
      id: video._id,
      title: video.title,
      description: video.description,
      thumbnail: addServerBaseUrl(video.thumbnailUrl) || "/placeholder.svg?height=720&width=1280",
      videoUrl: addServerBaseUrl(video.videoUrl),
      category: video.category,
      votes: video.votes || 0,
      duration: video.duration || "00:00",
      scriptUrl: addServerBaseUrl(video.scriptUrl),
      uploader: video.uploader ? {
        id: video.uploader._id,
        username: video.uploader.username,
        email: video.uploader.email
      } : undefined,
      status: video.status,
      createdAt: video.createdAt,
      updatedAt: video.updatedAt
    }));
  } catch (error) {
    console.error('Error fetching user videos:', error);
    throw new Error(error instanceof Error ? error.message : 'Failed to fetch user videos');
  }
};

export const deleteVideo = async (id: string): Promise<void> => {
  await api.delete(apiConfig.videos.delete(id));
};

export const updateVideo = async (
  videoId: string,
  data: VideoUpdateData,
  onProgress?: (progress: number) => void
): Promise<Video> => {
  const formData = new FormData();
  if (data.title) formData.append('title', data.title);
  if (data.description) formData.append('description', data.description);
  if (data.category) formData.append('category', data.category);
  if (data.video) formData.append('video', data.video);
  if (data.script) formData.append('script', data.script);
  if (data.thumbnail) formData.append('thumbnail', data.thumbnail);

  try {
    const response = await api.put(apiConfig.videos.update(videoId), formData, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
      onUploadProgress: (progressEvent: AxiosProgressEvent) => {
        if (onProgress && progressEvent.total) {
          const progress = Math.round((progressEvent.loaded * 100) / progressEvent.total);
          onProgress(progress);
        }
      },
    });

    return response.data.video;
  } catch (error) {
    console.error('Video update error:', error);
    throw new Error(error instanceof Error ? error.message : 'Failed to update video');
  }
};

export const getFeaturedVideos = async (): Promise<Video[]> => {
  try {
    const response = await api.get(apiConfig.videos.getFeatured);
    
    // Transform the response to match our Video interface
    return response.data.map((video: any) => ({
      id: video._id,
      title: video.title,
      description: video.description,
      thumbnail: addServerBaseUrl(video.thumbnailUrl) || "/placeholder.svg?height=720&width=1280",
      videoUrl: addServerBaseUrl(video.videoUrl),
      scriptUrl: addServerBaseUrl(video.scriptUrl),
      category: video.category,
      votes: video.votes || 0,
      duration: video.duration || "00:00",
      uploader: video.uploader ? {
        id: video.uploader._id,
        username: video.uploader.username,
        email: video.uploader.email
      } : undefined,
      status: video.status,
      createdAt: video.createdAt,
      updatedAt: video.updatedAt
    }));
  } catch (error) {
    console.error('Error fetching featured videos:', error);
    throw new Error(error instanceof Error ? error.message : 'Failed to fetch featured videos');
  }
};

export const voteForVideo = async (videoId: string, userId: string): Promise<void> => {
  try {
    await api.post(apiConfig.videos.vote(videoId), { userId });
  } catch (error) {
    console.error('Error voting for video:', error);
    throw new Error(error instanceof Error ? error.message : 'Failed to vote for video');
  }
};

export const getVideoById = async (id: string): Promise<Video> => {
  try {
    const response = await api.get(apiConfig.videos.getById(id));
    
    // Transform the response to match our Video interface
    return {
      id: response.data._id,
      title: response.data.title,
      description: response.data.description,
      thumbnail: addServerBaseUrl(response.data.thumbnailUrl) || "/placeholder.svg?height=720&width=1280",
      videoUrl: addServerBaseUrl(response.data.videoUrl),
      category: response.data.category,
      votes: response.data.votes || 0,
      duration: response.data.duration || "00:00",
      scriptUrl: addServerBaseUrl(response.data.scriptUrl),
      uploader: response.data.uploader ? {
        id: response.data.uploader._id,
        username: response.data.uploader.username,
        email: response.data.uploader.email
      } : undefined,
      status: response.data.status,
      createdAt: response.data.createdAt,
      updatedAt: response.data.updatedAt
    };
  } catch (error) {
    console.error('Error fetching video:', error);
    throw new Error(error instanceof Error ? error.message : 'Failed to fetch video');
  }
}; 