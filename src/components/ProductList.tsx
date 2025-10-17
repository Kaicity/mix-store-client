import { productsData } from '@/data/fake-data';
import ProductCard from './ProductCard';

const ProductList = () => {
  return (
    <div className="w-full">
      <div className="grid grid-cols-2 gap-4 md:grid-cols-3 lg:grid-cols-4">
        {productsData.map((product) => (
          <ProductCard key={product.id} product={product} />
        ))}
      </div>
    </div>
  );
};

export default ProductList;
