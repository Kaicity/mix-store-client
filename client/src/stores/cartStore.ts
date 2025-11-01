import type { CartStoreActions, CartStoreState } from '@/types/cart';
import { create } from 'zustand';
import { createJSONStorage, persist } from 'zustand/middleware';

const useCartStore = create<CartStoreState & CartStoreActions>()(
  persist(
    (set) => ({
      carts: [],
      hasHydrated: false,
      addToCart: (product) =>
        set((state) => {
          const existingCartItemIndex = state.carts.findIndex(
            (p) =>
              p.id === product.id &&
              p.selectedSize === product.selectedSize &&
              p.selectedColor === product.selectedColor,
          );

          if (existingCartItemIndex !== -1) {
            const updatedCart = [...state.carts];
            updatedCart[existingCartItemIndex].quantity += product.quantity || 1;
            return { carts: updatedCart };
          }

          return {
            carts: [
              ...state.carts,
              {
                ...product,
                quantity: product.quantity,
                selectedSize: product.selectedSize,
                selectedColor: product.selectedColor,
              },
            ],
          };
        }),
      removeFromCart: (product) =>
        set((state) => ({
          carts: state.carts.filter(
            (p) =>
              !(
                p.id === product.id &&
                p.selectedSize === product.selectedSize &&
                p.selectedColor === product.selectedColor
              ),
          ),
        })),
      updateQuantity: (product, quantity) =>
        set((state) => ({
          carts: state.carts.map((p) =>
            p.id === product.id && p.selectedSize === product.selectedSize && p.selectedColor === product.selectedColor
              ? { ...p, quantity }
              : p,
          ),
        })),
      clearCart: () => set({ carts: [] }),
    }),
    {
      name: 'cart',
      storage: createJSONStorage(() => localStorage),
      onRehydrateStorage: () => (state) => {
        if (state) {
          state.hasHydrated = true;
        }
      },
    },
  ),
);

export default useCartStore;
