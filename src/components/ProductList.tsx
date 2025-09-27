import { productsData } from "@/data/fake-data";
import ProductCard from "./ProductCard";

const ProductList = () => {
  return (
    <div className="w-full">
      <div className="grid grid-cols-2 gap-2 xl:grid-cols-3 xl:gap-3 2xl:grid-cols-4 2xl:gap-4 ">
        {productsData.map((product) => (
          <ProductCard key={product.id} product={product} />
        ))}
      </div>
    </div>
  );
};

export default ProductList;
