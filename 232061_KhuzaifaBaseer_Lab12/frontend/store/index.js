import { create } from 'zustand';
import { persist } from 'zustand/middleware';

// Cart Store
export const useCartStore = create(
  persist(
    (set, get) => ({
      items: [],
      addItem: (product, qty = 1) => {
        const items = get().items;
        const existing = items.find(i => i._id === product._id);
        if (existing) {
          set({ items: items.map(i => i._id === product._id ? { ...i, qty: i.qty + qty } : i) });
        } else {
          set({ items: [...items, { ...product, qty }] });
        }
      },
      removeItem: (id) => set({ items: get().items.filter(i => i._id !== id) }),
      updateQty: (id, qty) => {
        if (qty < 1) return;
        set({ items: get().items.map(i => i._id === id ? { ...i, qty } : i) });
      },
      clearCart: () => set({ items: [] }),
      get total() {
        return get().items.reduce((s, i) => s + i.price * i.qty, 0);
      },
      get count() {
        return get().items.reduce((s, i) => s + i.qty, 0);
      },
    }),
    { name: 'rustik-cart' }
  )
);

// Auth Store
export const useAuthStore = create(
  persist(
    (set) => ({
      user: null,
      token: null,
      setAuth: (user, token) => {
        if (typeof window !== 'undefined') localStorage.setItem('token', token);
        set({ user, token });
      },
      logout: () => {
        if (typeof window !== 'undefined') localStorage.removeItem('token');
        set({ user: null, token: null });
      },
    }),
    { name: 'rustik-auth' }
  )
);
