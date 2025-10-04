export type Product = {
  id: string | number;
  name: string;
  shortDescription: string;
  description: string;
  price: number;
  sizes: string[];
  colors: string[];
  images: Record<string, string>;
};

export type Cart = Product & {
  quantity: number;
  selectedSize: string;
  selectedColor: string;
};

export type Products = Product[];

export type Carts = Cart[];
