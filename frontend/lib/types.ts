export type AccountType = 'admin' | 'user' | 'agent';

export interface User {
  id: string;
  username: string;
  email: string;
  role: AccountType;
}

export interface AuthResponse {
  message: string;
  token: string;
  user: User;
} 