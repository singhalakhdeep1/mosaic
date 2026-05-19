import { create } from 'zustand'
import { persist } from 'zustand/middleware'
import type { User } from '@universal-platform/types'

interface AuthState {
    user: User | null
    accessToken: string | null
    refreshToken: string | null
    isAuthenticated: boolean
    setAuth: (user: User, accessToken: string, refreshToken: string) => void
    clearAuth: () => void
    updateUser: (user: Partial<User>) => void
}

export const useAuthStore = create<AuthState>()(
    persist(
        (set) => ({
            user: null,
            accessToken: null,
            refreshToken: null,
            isAuthenticated: false,
            setAuth: (user, accessToken, refreshToken) =>
                set({
                    user,
                    accessToken,
                    refreshToken,
                    isAuthenticated: true,
                }),
            clearAuth: () =>
                set({
                    user: null,
                    accessToken: null,
                    refreshToken: null,
                    isAuthenticated: false,
                }),
            updateUser: (updatedFields) =>
                set((state) => ({
                    user: state.user ? { ...state.user, ...updatedFields } : null,
                })),
        }),
        {
            name: 'auth-storage',
        }
    )
)
