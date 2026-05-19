import { io, Socket } from 'socket.io-client'

const WS_URL = process.env.NEXT_PUBLIC_WS_URL || 'ws://localhost:5000'

class WebSocketClient {
    private socket: Socket | null = null
    private listeners: Map<string, Set<Function>> = new Map()

    connect(token?: string) {
        if (this.socket?.connected) {
            console.log('WebSocket already connected')
            return this.socket
        }

        this.socket = io(WS_URL, {
            auth: {
                token: token || (typeof window !== 'undefined' ? localStorage.getItem('accessToken') : ''),
            },
            transports: ['websocket', 'polling'],
            reconnection: true,
            reconnectionDelay: 1000,
            reconnectionAttempts: 5,
        })

        // Connection events
        this.socket.on('connect', () => {
            console.log('WebSocket connected:', this.socket?.id)
        })

        this.socket.on('disconnect', (reason) => {
            console.log('WebSocket disconnected:', reason)
        })

        this.socket.on('error', (error) => {
            console.error('WebSocket error:', error)
        })

        this.socket.on('reconnect', (attemptNumber) => {
            console.log('WebSocket reconnected after', attemptNumber, 'attempts')
        })

        return this.socket
    }

    disconnect() {
        if (this.socket) {
            this.socket.disconnect()
            this.socket = null
            this.listeners.clear()
        }
    }

    on(event: string, callback: Function) {
        if (!this.socket) {
            console.error('WebSocket not connected. Call connect() first.')
            return
        }

        // Store listener for cleanup
        if (!this.listeners.has(event)) {
            this.listeners.set(event, new Set())
        }
        this.listeners.get(event)?.add(callback)

        // Register socket listener
        this.socket.on(event, (...args: any[]) => callback(...args))
    }

    off(event: string, callback?: Function) {
        if (!this.socket) return

        if (callback) {
            this.listeners.get(event)?.delete(callback)
            this.socket.off(event, callback as any)
        } else {
            // Remove all listeners for this event
            this.listeners.delete(event)
            this.socket.off(event)
        }
    }

    emit(event: string, data?: any) {
        if (!this.socket) {
            console.error('WebSocket not connected. Call connect() first.')
            return
        }

        this.socket.emit(event, data)
    }

    // Helper methods for common events
    onNotification(callback: (notification: any) => void) {
        this.on('notification', callback)
    }

    onMessage(callback: (message: any) => void) {
        this.on('message', callback)
    }

    onBookingUpdate(callback: (booking: any) => void) {
        this.on('bookingUpdate', callback)
    }

    onOrderUpdate(callback: (order: any) => void) {
        this.on('orderUpdate', callback)
    }

    sendMessage(roomId: string, message: string) {
        this.emit('sendMessage', { roomId, message })
    }

    joinRoom(roomId: string) {
        this.emit('joinRoom', { roomId })
    }

    leaveRoom(roomId: string) {
        this.emit('leaveRoom', { roomId })
    }

    getSocket() {
        return this.socket
    }

    isConnected() {
        return this.socket?.connected || false
    }
}

// Export singleton instance
export const wsClient = new WebSocketClient()

export default wsClient
