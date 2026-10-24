import { get, post, put, del } from '../rest-client'
import type { Venue, PaginatedResponse } from '@universal-platform/types'

export const venuesService = {
    getAll: (params?: any) => get<PaginatedResponse<Venue>>('/venues', { params }),
    search: (params?: any) => get<PaginatedResponse<Venue>>('/venues/search', { params }),
    getById: (id: string) => get<Venue>(`/venues/${id}`),
    create: (data: any) => post<Venue>('/venues', data),
    update: (id: string, data: any) => put<Venue>(`/venues/${id}`, data),
    delete: (id: string) => del(`/venues/${id}`),
}
