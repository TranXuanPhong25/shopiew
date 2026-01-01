export interface LoginRequest {
  email: string
  password: string
}

export interface User {
  id: string
  email: string
  name: string
  role: 'admin' | 'super_admin'
  avatar?: string
  createdAt: string
  updatedAt: string
}

export interface LoginResponse {
  token: string
  userInfo: User
}

export interface AuthError {
  message: string
  code?: string
  field?: string
}
