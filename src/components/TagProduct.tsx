import { ProductTag } from '@/enums/product-tag';
import { cn } from '@/utils/tw-merge';

interface TagProductProps {
  title?: string;
  slug?: string;
}

const TagProduct = (props: TagProductProps) => {
  const { title, slug } = props;
  return title && slug ? (
    <div
      className={cn(
        'ring-1 rounded-md w-max text-[10px] flex items-center justify-center p-1',
        slug === ProductTag.NEW
          ? 'ring-black'
          : slug === ProductTag.SALE
          ? 'ring-red-500 text-red-500'
          : 'ring-gray-400 text-gray-600',
      )}
    >
      {title}
    </div>
  ) : (
    <></>
  );
};

export default TagProduct;
