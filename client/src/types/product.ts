import type { ProductTag } from '@/enums/product-tag';

export type Product = {
  id: string | number;
  name: string;
  shortDescription: string;
  description: string;
  price: number;
  sizes: string[];
  colors: string[];
  images: Record<string, string>;
  tag?: ProductTag;
};

export type Products = Product[];
