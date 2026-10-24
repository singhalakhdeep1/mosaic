import { get, post, put, del } from '../rest-client'
import type { Review, PaginatedResponse } from '@universal-platform/types'

export const reviewsService = {
    getAll: (params?: any) => get<PaginatedResponse<Review>>('/reviews', { params }),
    getById: (id: string) => get<Review>(`/reviews/${id}`),
    create: (data: any) => post<Review>('/reviews', data),
    update: (id: string, data: any) => put<Review>(`/reviews/${id}`, data),
    delete: (id: string) => del(`/reviews/${id}`),
}
