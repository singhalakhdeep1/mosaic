/**
 * Shared State Management for Micro-frontends
 * Uses Zustand for cross-micro-frontend state synchronization
 */

import { create } from 'zustand';
import { devtools, persist } from 'zustand/middleware';

// User state shared across all micro-frontends
interface UserState {
  user: {
    id: string;
    name: string;
    email: string;
    role: string;
  } | null;
  setUser: (user: UserState['user']) => void;
  clearUser: () => void;
}

export const useUserStore = create<UserState>()(
  devtools(
    persist(
      (set) => ({
        user: null,
        setUser: (user) => set({ user }),
        clearUser: () => set({ user: null }),
      }),
      {
        name: 'user-storage',
      }
    )
  )
);

// Theme state shared across all micro-frontends
interface ThemeState {
  theme: 'light' | 'dark' | 'system';
  setTheme: (theme: ThemeState['theme']) => void;
}

export const useThemeStore = create<ThemeState>()(
  devtools(
    persist(
      (set) => ({
        theme: 'system',
        setTheme: (theme) => set({ theme }),
      }),
      {
        name: 'theme-storage',
      }
    )
  )
);

// Notification state shared across all micro-frontends
interface NotificationState {
  notifications: Array<{
    id: string;
    type: 'success' | 'error' | 'warning' | 'info';
    message: string;
    timestamp: number;
  }>;
  addNotification: (notification: Omit<NotificationState['notifications'][0], 'id' | 'timestamp'>) => void;
  removeNotification: (id: string) => void;
  clearNotifications: () => void;
}

export const useNotificationStore = create<NotificationState>()(
  devtools(
    (set) => ({
      notifications: [],
      addNotification: (notification) =>
        set((state) => ({
          notifications: [
            ...state.notifications,
            {
              ...notification,
              id: crypto.randomUUID(),
              timestamp: Date.now(),
            },
          ],
        })),
      removeNotification: (id) =>
        set((state) => ({
          notifications: state.notifications.filter((n) => n.id !== id),
        })),
      clearNotifications: () => set({ notifications: [] }),
    })
  )
);

// Cart state shared across e-commerce micro-frontends
interface CartState {
  items: Array<{
    id: string;
    productId: string;
    name: string;
    price: number;
    quantity: number;
  }>;
  addItem: (item: Omit<CartState['items'][0], 'quantity'>) => void;
  removeItem: (id: string) => void;
  updateQuantity: (id: string, quantity: number) => void;
  clearCart: () => void;
  getTotalPrice: () => number;
  getTotalItems: () => number;
}

export const useCartStore = create<CartState>()(
  devtools(
    persist(
      (set, get) => ({
        items: [],
        addItem: (item) =>
          set((state) => {
            const existing = state.items.find((i) => i.id === item.id);
            if (existing) {
              return {
                items: state.items.map((i) =>
                  i.id === item.id ? { ...i, quantity: i.quantity + 1 } : i
                ),
              };
            }
            return { items: [...state.items, { ...item, quantity: 1 }] };
          }),
        removeItem: (id) =>
          set((state) => ({
            items: state.items.filter((i) => i.id !== id),
          })),
        updateQuantity: (id, quantity) =>
          set((state) => ({
            items: state.items.map((i) =>
              i.id === id ? { ...i, quantity: Math.max(0, quantity) } : i
            ),
          })),
        clearCart: () => set({ items: [] }),
        getTotalPrice: () => {
          const state = get();
          return state.items.reduce((sum, item) => sum + item.price * item.quantity, 0);
        },
        getTotalItems: () => {
          const state = get();
          return state.items.reduce((sum, item) => sum + item.quantity, 0);
        },
      }),
      {
        name: 'cart-storage',
      }
    )
  )
);

// Event bus for cross-micro-frontend communication
class EventBus {
  private listeners: Map<string, Set<Function>> = new Map();

  on(event: string, callback: Function) {
    if (!this.listeners.has(event)) {
      this.listeners.set(event, new Set());
    }
    this.listeners.get(event)!.add(callback);

    // Return unsubscribe function
    return () => this.off(event, callback);
  }

  off(event: string, callback: Function) {
    const listeners = this.listeners.get(event);
    if (listeners) {
      listeners.delete(callback);
    }
  }

  emit(event: string, data?: any) {
    const listeners = this.listeners.get(event);
    if (listeners) {
      listeners.forEach((callback) => callback(data));
    }
  }

  once(event: string, callback: Function) {
    const wrappedCallback = (data: any) => {
      callback(data);
      this.off(event, wrappedCallback);
    };
    this.on(event, wrappedCallback);
  }
}

export const eventBus = new EventBus();

// Common event types
export const Events = {
  USER_LOGIN: 'user:login',
  USER_LOGOUT: 'user:logout',
  THEME_CHANGE: 'theme:change',
  CART_UPDATE: 'cart:update',
  NAVIGATION: 'navigation',
  ERROR: 'error',
} as const;
