'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { AccountType, User } from '@/lib/types';
import { getAuthHeaders } from '@/lib/api';

interface ProtectedRouteProps {
  children: React.ReactNode;
  allowedRoles: AccountType[];
}

export default function ProtectedRoute({ children, allowedRoles }: ProtectedRouteProps) {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    const checkAuth = async () => {
      const token = localStorage.getItem('token');
      const userStr = localStorage.getItem('user');
      
      if (!token || !userStr) {
        router.push('/login');
        return;
      }

      try {
        const user: User = JSON.parse(userStr);
        
        if (!allowedRoles.includes(user.role)) {
          // Redirect to appropriate dashboard based on role
          switch (user.role) {
            case 'admin':
              router.push('/admin/dashboard');
              break;
            case 'agent':
              router.push('');
              break;
            default:
              router.push('');
          }
          return;
        }

        // Verify token with backend
        const response = await fetch('http://localhost:5000/api/auth/verify', {
          headers: getAuthHeaders(),
        });

        if (!response.ok) {
          throw new Error('Invalid token');
        }

        setIsLoading(false);
      } catch (error) {
        // Clear invalid auth data
        localStorage.removeItem('token');
        localStorage.removeItem('user');
        setError('Session expired. Please login again.');
        router.push('/login');
      }
    };

    checkAuth();
  }, [router, allowedRoles]);

  if (isLoading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="p-4 text-red-700 bg-red-100 rounded-lg">
          {error}
        </div>
      </div>
    );
  }

  return <>{children}</>;
} 