import type { Category } from '@/types/category';
import { cn } from '@/utils/tw-merge';
import { ChevronDown, ChevronRight } from 'lucide-react';
import { usePathname, useRouter, useSearchParams } from 'next/navigation';
import { useState } from 'react';

interface MobileCategoryItemProps {
  category: Category;
}

const MobileCategoryItem = ({ category }: MobileCategoryItemProps) => {
  const [open, setOpen] = useState(false);
  const [openSub, setOpenSub] = useState(false);

  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const selectedCategory = searchParams.get('category');

  const handleCategorySelect = (values: string[]) => {
    const params = new URLSearchParams(searchParams);
    // Xóa các giá trị category cũ
    params.delete('category');

    // Thêm danh sách category mới
    values.forEach((v) => params.append('category', v));
    router.push(`${pathname}?${params.toString()}`, { scroll: false });
  };

  return (
    <div className="border-b border-gray-100">
      <button
        onClick={() => (category.subs.length ? setOpen((prev) => !prev) : handleCategorySelect([category.slug]))}
        className={cn(
          'flex items-center justify-between w-full py-3 text-left font-medium transition',
          selectedCategory === category.slug ? 'text-yellow-600' : 'text-gray-800',
        )}
      >
        <div className="flex items-center gap-2">
          {category.icon}
          {category.name}
        </div>
        {category.subs.length > 0 && (
          <ChevronDown className={cn('w-4 h-4 transition-transform duration-200', open && 'rotate-180')} />
        )}
      </button>

      {/* Submenu cấp 1 */}
      {open && category.subs.length > 0 && (
        <div className="ml-5 flex flex-col border-l border-gray-200">
          {category.subs.map((subsItem) => (
            <div className="ml-2" key={subsItem.slug}>
              <button
                onClick={() =>
                  subsItem.subs?.length
                    ? setOpenSub((prev) => !prev)
                    : handleCategorySelect([category.slug, subsItem.slug])
                }
                className="flex items-center justify-between w-full py-2 text-sm text-gray-700 hover:text-yellow-600"
              >
                <span>{subsItem.name}</span>
                {subsItem.subs && subsItem.subs.length > 0 && (
                  <ChevronRight className={cn('w-4 h-4 transition-transform duration-200', open && 'rotate-90')} />
                )}
              </button>

              {openSub && subsItem.subs && (
                <div className="ml-4 flex flex-col items-start border-l border-gray-200">
                  {subsItem.subs.map((deepItem) => (
                    <button
                      key={deepItem.slug}
                      onClick={() => {
                        handleCategorySelect([category.slug, subsItem.slug, deepItem.slug]);
                      }}
                      className="py-1 pl-3 text-sm text-gray-600 hover:text-yellow-600"
                    >
                      {deepItem.name}
                    </button>
                  ))}
                </div>
              )}
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default MobileCategoryItem;
