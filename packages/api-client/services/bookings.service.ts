import { get, post, put, del } from '../rest-client'
import type { Booking, PaginatedResponse } from '@universal-platform/types'

export const bookingsService = {
    getAll: (params?: any) => get<PaginatedResponse<Booking>>('/bookings', { params }),
    getById: (id: string) => get<Booking>(`/bookings/${id}`),
    create: (data: any) => post<Booking>('/bookings', data),
    update: (id: string, data: any) => put<Booking>(`/bookings/${id}`, data),
    cancel: (id: string) => del(`/bookings/${id}`),
}
