import axios, { AxiosError, AxiosInstance, InternalAxiosRequestConfig, AxiosResponse } from 'axios'

const API_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5000'

// Create axios instance
const apiClient: AxiosInstance = axios.create({
    baseURL: API_URL,
    timeout: 30000,
    headers: {
        'Content-Type': 'application/json',
    },
})

// Request interceptor - Add auth token
apiClient.interceptors.request.use(
    (config: InternalAxiosRequestConfig) => {
        if (typeof window !== 'undefined') {
            const token = localStorage.getItem('accessToken')
            if (token && config.headers) {
                config.headers.Authorization = `Bearer ${token}`
            }
        }
        return config
    },
    (error: AxiosError) => {
        return Promise.reject(error)
    }
)

// Response interceptor - Handle errors and token refresh
apiClient.interceptors.response.use(
    (response: AxiosResponse) => response,
    async (error: AxiosError) => {
        const originalRequest = error.config as InternalAxiosRequestConfig & {
            _retry?: boolean
        }

        // If error is 401 and we haven't retried yet
        if (error.response?.status === 401 && !originalRequest._retry) {
            originalRequest._retry = true

            try {
                const refreshToken = localStorage.getItem('refreshToken')
                if (!refreshToken) {
                    throw new Error('No refresh token')
                }

                // Call refresh token endpoint
                const response = await axios.post(`${API_URL}/auth/refresh`, {
                    refreshToken,
                })

                const { accessToken, refreshToken: newRefreshToken } = response.data

                // Save new tokens
                localStorage.setItem('accessToken', accessToken)
                localStorage.setItem('refreshToken', newRefreshToken)

                // Retry original request with new token
                if (originalRequest.headers) {
                    originalRequest.headers.Authorization = `Bearer ${accessToken}`
                }
                return apiClient(originalRequest)
            } catch (refreshError) {
                // Refresh failed - logout user
                localStorage.removeItem('accessToken')
                localStorage.removeItem('refreshToken')
                localStorage.removeItem('user')

                if (typeof window !== 'undefined') {
                    window.location.href = '/login'
                }

                return Promise.reject(refreshError)
            }
        }

        return Promise.reject(error)
    }
)

export default apiClient

// Helper functions for common HTTP methods
export const get = <T = any>(url: string, config?: any) =>
    apiClient.get<T>(url, config).then((res) => res.data)

export const post = <T = any>(url: string, data?: any, config?: any) =>
    apiClient.post<T>(url, data, config).then((res) => res.data)

export const put = <T = any>(url: string, data?: any, config?: any) =>
    apiClient.put<T>(url, data, config).then((res) => res.data)

export const patch = <T = any>(url: string, data?: any, config?: any) =>
    apiClient.patch<T>(url, data, config).then((res) => res.data)

export const del = <T = any>(url: string, config?: any) =>
    apiClient.delete<T>(url, config).then((res) => res.data)

// File upload helper
export const uploadFile = async (url: string, file: File, onProgress?: (progress: number) => void) => {
    const formData = new FormData()
    formData.append('file', file)

    return apiClient.post(url, formData, {
        headers: {
            'Content-Type': 'multipart/form-data',
        },
        onUploadProgress: (progressEvent) => {
            if (onProgress && progressEvent.total) {
                const progress = Math.round((progressEvent.loaded * 100) / progressEvent.total)
                onProgress(progress)
            }
        },
    }).then((res) => res.data)
}
