import type { Product } from './product';

export type Cart = Product & {
  quantity: number;
  selectedSize: string;
  selectedColor: string;
};
export type Carts = Cart[];

// Cart Store action Zustand
export type CartStoreState = {
  carts: Carts;
  hasHydrated: boolean;
};

export type CartStoreActions = {
  addToCart: (product: Cart) => void;
  removeFromCart: (product: Cart) => void;
  updateQuantity: (product: Cart, quantity: number) => void;
  clearCart: () => void;
};
