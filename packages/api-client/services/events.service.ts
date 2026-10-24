import { get, post, put, del } from '../rest-client'
import type { Event, PaginatedResponse } from '@universal-platform/types'

export const eventsService = {
    getAll: (params?: any) => get<PaginatedResponse<Event>>('/events', { params }),
    getById: (id: string) => get<Event>(`/events/${id}`),
    create: (data: any) => post<Event>('/events', data),
    update: (id: string, data: any) => put<Event>(`/events/${id}`, data),
    delete: (id: string) => del(`/events/${id}`),
}
