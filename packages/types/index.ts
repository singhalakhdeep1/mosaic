// User & Auth Types
export interface User {
    id: string
    email: string
    firstName: string
    lastName: string
    phone?: string
    role: UserRole
    emailVerified: boolean
    avatar?: string
    createdAt: string
    updatedAt: string
}

export enum UserRole {
    USER = 'USER',
    PROVIDER = 'PROVIDER',
    ADMIN = 'ADMIN',
}

export interface AuthResponse {
    user: User
    accessToken: string
    refreshToken: string
}

export interface LoginRequest {
    email: string
    password: string
}

export interface RegisterRequest {
    email: string
    password: string
    firstName: string
    lastName: string
    phone?: string
}

// Event Types
export enum EventType {
    WEDDING = 'WEDDING',
    BIRTHDAY = 'BIRTHDAY',
    CORPORATE = 'CORPORATE',
    CONFERENCE = 'CONFERENCE',
    PARTY = 'PARTY',
    OTHER = 'OTHER',
}

export enum EventStatus {
    DRAFT = 'DRAFT',
    PLANNING = 'PLANNING',
    CONFIRMED = 'CONFIRMED',
    COMPLETED = 'COMPLETED',
    CANCELLED = 'CANCELLED',
}

export interface Event {
    id: string
    title: string
    description?: string
    type: EventType
    status: EventStatus
    startDate: string
    endDate: string
    location: string
    budget?: number
    guestCount?: number
    userId: string
    createdAt: string
    updatedAt: string
}

// Venue Types
export enum VenueType {
    BANQUET_HALL = 'BANQUET_HALL',
    OUTDOOR = 'OUTDOOR',
    HOTEL = 'HOTEL',
    RESTAURANT = 'RESTAURANT',
    CONFERENCE_CENTER = 'CONFERENCE_CENTER',
    OTHER = 'OTHER',
}

export interface Venue {
    id: string
    name: string
    description?: string
    type: VenueType
    address: string
    city: string
    state: string
    zipCode: string
    capacity: number
    pricePerHour: number
    amenities?: string[]
    photos?: VenuePhoto[]
    rating?: number
    reviewCount?: number
    ownerId: string
    createdAt: string
    updatedAt: string
}

export interface VenuePhoto {
    id: string
    url: string
    caption?: string
    venueId: string
}

// Booking Types
export enum BookingStatus {
    PENDING = 'PENDING',
    CONFIRMED = 'CONFIRMED',
    CANCELLED = 'CANCELLED',
    COMPLETED = 'COMPLETED',
}

export interface Booking {
    id: string
    startDate: string
    endDate: string
    guestCount: number
    totalAmount: number
    status: BookingStatus
    notes?: string
    userId: string
    venueId: string
    venue?: Venue
    createdAt: string
    updatedAt: string
}

// Payment Types
export enum PaymentStatus {
    PENDING = 'PENDING',
    PROCESSING = 'PROCESSING',
    COMPLETED = 'COMPLETED',
    FAILED = 'FAILED',
    REFUNDED = 'REFUNDED',
}

export interface Transaction {
    id: string
    amount: number
    currency: string
    status: PaymentStatus
    stripePaymentIntentId?: string
    bookingId?: string
    userId: string
    createdAt: string
    updatedAt: string
}

// Review Types
export interface Review {
    id: string
    rating: number
    comment?: string
    photos?: string[]
    venueId?: string
    userId: string
    user?: User
    venue?: Venue
    response?: string
    helpfulCount?: number
    createdAt: string
    updatedAt: string
}

// E-Commerce Types
export interface Product {
    id: string
    name: string
    description?: string
    price: number
    images?: string[]
    category?: string
    inStock: boolean
    rating?: number
    reviewCount?: number
    createdAt: string
    updatedAt: string
}

export interface CartItem {
    id: string
    productId: string
    product: Product
    quantity: number
    price: number
}

export interface Order {
    id: string
    orderNumber: string
    items: CartItem[]
    totalAmount: number
    status: OrderStatus
    shippingAddress: Address
    userId: string
    createdAt: string
    updatedAt: string
}

export enum OrderStatus {
    PENDING = 'PENDING',
    PROCESSING = 'PROCESSING',
    SHIPPED = 'SHIPPED',
    DELIVERED = 'DELIVERED',
    CANCELLED = 'CANCELLED',
}

export interface Address {
    street: string
    city: string
    state: string
    zipCode: string
    country: string
}

// Learning Types
export interface Course {
    id: string
    title: string
    description?: string
    thumbnail?: string
    price: number
    instructorId: string
    instructor?: User
    duration?: number
    lessonsCount?: number
    enrolledCount?: number
    rating?: number
    createdAt: string
    updatedAt: string
}

export interface Lesson {
    id: string
    title: string
    content?: string
    videoUrl?: string
    duration?: number
    order: number
    courseId: string
    createdAt: string
    updatedAt: string
}

// Common Types
export interface PaginatedResponse<T> {
    data: T[]
    total: number
    page: number
    limit: number
    totalPages: number
}

export interface ApiError {
    message: string
    statusCode: number
    errors?: Record<string, string[]>
}

export interface SearchParams {
    page?: number
    limit?: number
    search?: string
    sortBy?: string
    sortOrder?: 'asc' | 'desc'
}

export interface VenueSearchParams extends SearchParams {
    city?: string
    state?: string
    type?: VenueType
    minCapacity?: number
    maxCapacity?: number
    minPrice?: number
    maxPrice?: number
    startDate?: string
    endDate?: string
}
