'use client';

import { categories } from '@/constants/navCategoriesItem';
import { cn } from '@/utils/tw-merge';
import { ChevronDown, ChevronRight } from 'lucide-react';
import { usePathname, useRouter, useSearchParams } from 'next/navigation';

const NavbarItems = () => {
  const searchParams = useSearchParams();
  const router = useRouter();
  const pathname = usePathname();
  const selectedCategory = searchParams.get('category');

  const handleCategorySelect = (values: string[]) => {
    const lastSlug = values[values.length - 1];

    router.push(`/collections/${lastSlug}`);
  };

  return (
    <div className="hidden lg:flex justify-center gap-6 py-2 text-sm shadow-lg mb-6">
      {categories.map((category) => (
        <div key={category.slug} className="relative group">
          {/* Mục chính */}
          <button
            onClick={() => handleCategorySelect([category.slug])}
            className={cn(
              'flex items-center gap-1 px-2 py-1 transition font-medium',
              category.slug === selectedCategory
                ? 'text-yellow-500 font-medium'
                : 'border-transparent hover:text-yellow-500',
            )}
          >
            {category.icon}
            {category.name}
            {category.subs.length > 0 && <ChevronDown className="w-4 h-4" />}
          </button>

          {/* Dropdown cấp 1 */}
          {category.subs && category.subs.length > 0 && (
            <div
              className={cn(
                'absolute left-0 top-full min-w-40 w-max bg-white shadow-lg transition-all duration-200',
                'opacity-0 pointer-events-none translate-y-2',
                'group-hover:opacity-100 group-hover:pointer-events-auto group-hover:translate-y-0 z-50',
              )}
            >
              <div className="flex flex-col py-2">
                {category.subs.map((subsItem) => (
                  <div key={subsItem.slug} className="relative group/subs">
                    <button
                      onClick={() => handleCategorySelect([category.slug, subsItem.slug])}
                      className="px-4 py-2 text-sm flex items-center justify-between w-full hover:text-yellow-500 hover:font-medium text-left"
                    >
                      {subsItem.name}
                      {subsItem.subs && subsItem.subs.length > 0 && <ChevronRight className="w-3 h-3 ml-1" />}
                    </button>

                    {/* Dropdown cấp 2 */}
                    {subsItem.subs && subsItem.subs.length > 0 && (
                      <div
                        className={cn(
                          'absolute left-full top-0 min-w-40 w-max bg-white shadow-lg transition-all duration-200',
                          'opacity-0 pointer-events-none translate-x-2',
                          'group-hover/subs:opacity-100 group-hover/subs:pointer-events-auto group-hover/subs:translate-x-0 z-50',
                        )}
                      >
                        <div className="flex flex-col py-2">
                          {subsItem.subs.map((deepItem) => (
                            <button
                              onClick={() => handleCategorySelect([category.slug, subsItem.slug, deepItem.slug])}
                              key={deepItem.slug}
                              className="px-4 py-2 text-sm hover:text-yellow-500 text-left"
                            >
                              {deepItem.name}
                            </button>
                          ))}
                        </div>
                      </div>
                    )}
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      ))}
    </div>
  );
};

export default NavbarItems;
