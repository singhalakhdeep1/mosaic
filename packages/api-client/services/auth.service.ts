import { post, get, put } from '../rest-client'
import type { AuthResponse, LoginRequest, RegisterRequest, User } from '@universal-platform/types'

export const authService = {
    login: (data: LoginRequest) => post<AuthResponse>('/auth/login', data),
    register: (data: any) => post<AuthResponse>('/auth/register', data),
    forgotPassword: (email: string) => post('/auth/forgot-password', { email }),
    resetPassword: (token: string, password: string) => post('/auth/reset-password', { token, password }),
    updateProfile: (data: any) => put<User>('/auth/profile', data),
    getProfile: () => get<User>('/auth/profile'),
    logout: () => post('/auth/logout'),
    refreshToken: (refreshToken: string) => post<AuthResponse>('/auth/refresh', { refreshToken }),
}
