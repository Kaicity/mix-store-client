import type { Products } from '@/types/product';
import ProductCard from './ProductCard';

interface ProductListProps {
  products: Products;
}

const ProductList = ({ products }: ProductListProps) => {
  return (
    <div className="w-full flex flex-col items-center gap-6">
      <div className="grid grid-cols-2 gap-4 md:grid-cols-3 lg:grid-cols-4">
        {products.map((product) => (
          <ProductCard key={product.id} product={product} />
        ))}
      </div>
    </div>
  );
};

export default ProductList;
