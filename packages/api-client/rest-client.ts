const API_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5000'

interface RequestConfig {
    headers?: Record<string, string>
    signal?: AbortSignal
    params?: Record<string, any>
}

class ApiError extends Error {
    status: number
    data: any
    response: { data: any; status: number }
    constructor(message: string, status: number, data: any) {
        super(message)
        this.name = 'ApiError'
        this.status = status
        this.data = data
        this.response = { data, status }
    }
}

function getAuthHeaders(): Record<string, string> {
    if (typeof window === 'undefined') return {}
    const token = localStorage.getItem('accessToken')
    return token ? { Authorization: `Bearer ${token}` } : {}
}

function buildUrl(url: string, params?: Record<string, any>): string {
    const fullUrl = url.startsWith('http') ? url : `${API_URL}${url}`
    if (!params) return fullUrl
    const searchParams = new URLSearchParams()
    Object.entries(params).forEach(([key, value]) => {
        if (value !== undefined && value !== null && value !== '') {
            searchParams.append(key, String(value))
        }
    })
    const qs = searchParams.toString()
    return qs ? `${fullUrl}?${qs}` : fullUrl
}

async function request<T = any>(
    method: string,
    url: string,
    data?: any,
    config?: RequestConfig
): Promise<T> {
    const headers: Record<string, string> = {
        'Content-Type': 'application/json',
        ...getAuthHeaders(),
        ...config?.headers,
    }

    const fetchUrl = buildUrl(url, config?.params)
    const options: RequestInit = {
        method,
        headers,
        signal: config?.signal,
    }

    if (data && method !== 'GET') {
        options.body = JSON.stringify(data)
    }

    let response = await fetch(fetchUrl, options)

    if (response.status === 401) {
        const refreshToken = typeof window !== 'undefined' ? localStorage.getItem('refreshToken') : null
        if (refreshToken) {
            try {
                const refreshResponse = await fetch(`${API_URL}/auth/refresh`, {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify({ refreshToken }),
                })
                if (refreshResponse.ok) {
                    const tokens = await refreshResponse.json()
                    localStorage.setItem('accessToken', tokens.accessToken)
                    localStorage.setItem('refreshToken', tokens.refreshToken)
                    headers.Authorization = `Bearer ${tokens.accessToken}`
                    response = await fetch(fetchUrl, { ...options, headers })
                }
            } catch {
                localStorage.removeItem('accessToken')
                localStorage.removeItem('refreshToken')
                localStorage.removeItem('user')
                if (typeof window !== 'undefined') window.location.href = '/login'
            }
        }
    }

    if (!response.ok) {
        let errorData: any = {}
        try { errorData = await response.json() } catch {}
        throw new ApiError(
            errorData.message || response.statusText,
            response.status,
            errorData
        )
    }

    const text = await response.text()
    return text ? JSON.parse(text) : ({} as T)
}

const apiClient = {
    get: <T = any>(url: string, config?: RequestConfig) => request<T>('GET', url, undefined, config),
    post: <T = any>(url: string, data?: any, config?: RequestConfig) => request<T>('POST', url, data, config),
    put: <T = any>(url: string, data?: any, config?: RequestConfig) => request<T>('PUT', url, data, config),
    patch: <T = any>(url: string, data?: any, config?: RequestConfig) => request<T>('PATCH', url, data, config),
    delete: <T = any>(url: string, config?: RequestConfig) => request<T>('DELETE', url, undefined, config),
}

export default apiClient

export const get = <T = any>(url: string, config?: RequestConfig) => apiClient.get<T>(url, config)
export const post = <T = any>(url: string, data?: any, config?: RequestConfig) => apiClient.post<T>(url, data, config)
export const put = <T = any>(url: string, data?: any, config?: RequestConfig) => apiClient.put<T>(url, data, config)
export const patch = <T = any>(url: string, data?: any, config?: RequestConfig) => apiClient.patch<T>(url, data, config)
export const del = <T = any>(url: string, config?: RequestConfig) => apiClient.delete<T>(url, config)

export const uploadFile = async (url: string, file: File, onProgress?: (progress: number) => void) => {
    const formData = new FormData()
    formData.append('file', file)
    const headers: Record<string, string> = { ...getAuthHeaders() }
    const response = await fetch(buildUrl(url), {
        method: 'POST',
        headers,
        body: formData,
    })
    if (!response.ok) {
        let errorData: any = {}
        try { errorData = await response.json() } catch {}
        throw new ApiError(errorData.message || response.statusText, response.status, errorData)
    }
    return response.json()
}
