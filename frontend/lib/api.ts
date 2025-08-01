import axios, { AxiosError, AxiosResponse } from 'axios';
import { useAuth } from './auth-provider';
import { useRouter } from 'next/navigation';

const API_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5000/api';

const api = axios.create({
  baseURL: API_URL,
  headers: {
    'Content-Type': 'application/json',
  },
  timeout: 10000, // 10 seconds timeout
});

// Add token to requests if it exists
api.interceptors.request.use((config) => {
  const token = localStorage.getItem('token');
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

// Response interceptor for error handling
api.interceptors.response.use(
  (response) => response,
  (error: AxiosError) => {
    if (error.response?.status === 401) {
      // Handle unauthorized access
      localStorage.removeItem('token');
      localStorage.removeItem('user');
      window.location.href = '/';
    }
    return Promise.reject(error);
  }
);

export interface ApiResponse<T = any> {
  data: T;
  message?: string;
  error?: string;
}

interface ErrorResponse {
  message: string;
  error?: string;
}

export const apiConfig = {
  auth: {
    register: '/auth/register',
    login: '/auth/login',
    verify: '/auth/verify',
    logout: '/auth/logout',
  },
  videos: {
    upload: '/videos/upload',
    getAll: '/videos',
    getByCategory: (category: string) => `/videos/category/${category}`,
    getMyVideos: '/videos/my-videos',
    delete: (id: string) => `/videos/${id}`,
    getById: (id: string) => `/videos/${id}`,
    update: (id: string) => `/videos/${id}`,
    vote: (id: string) => `/videos/${id}/vote`,
    getFeatured: '/videos/featured',
  },
  users: {
    profile: '/users/profile',
    updateProfile: '/users/profile',
    changePassword: '/users/change-password',
  },
};

export const handleApiError = (error: AxiosError) => {
  if (error.response) {
    // The request was made and the server responded with a status code
    // that falls out of the range of 2xx
    const errorData = error.response.data as ErrorResponse;
    return {
      error: errorData.message || errorData.error || 'An error occurred',
      status: error.response.status,
    };
  } else if (error.request) {
    // The request was made but no response was received
    return {
      error: 'No response from server',
      status: 0,
    };
  } else {
    // Something happened in setting up the request that triggered an Error
    return {
      error: error.message,
      status: 0,
    };
  }
};

export const handleAuthResponse = (data: any, router: any) => {
  // Store token and user data
  localStorage.setItem('token', data.token);
  localStorage.setItem('user', JSON.stringify(data.user));
  
  // Update auth context
  const { updateUser } = useAuth();
  updateUser(data.user);
  
  // Redirect based on account type
  switch (data.user.role) {
    case 'admin':
      router.push('/admin/dashboard');
      break;
    case 'agent':
      router.push('/profile');
      break;
    default:
      router.push('/');
  }
};

export const logout = () => {
  localStorage.removeItem('token');
  localStorage.removeItem('user');
  window.location.href = '/';
};

export default api;

export const getAuthHeaders = () => {
  const token = localStorage.getItem('token');
  return {
    'Content-Type': 'application/json',
    ...(token ? { Authorization: `Bearer ${token}` } : {}),
  };
}; 