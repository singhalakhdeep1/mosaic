import { get, post } from '../rest-client'
import type { Transaction, PaginatedResponse } from '@universal-platform/types'

export const paymentsService = {
    createIntent: (data: any) => post('/payments/create-intent', data),
    confirm: (data: any) => post('/payments/confirm', data),
    getTransactions: (params?: any) => get<PaginatedResponse<Transaction>>('/payments/transactions', { params }),
    getTransaction: (id: string) => get<Transaction>(`/payments/transactions/${id}`),
    refund: (transactionId: string) => post(`/payments/refund`, { transactionId }),
}
