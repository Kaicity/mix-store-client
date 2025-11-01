'use client';

import Link from 'next/link';
import { cn } from '@/utils/tw-merge';

export interface BreadcrumbItem {
  name: string;
  href?: string; // Nếu không có href thì item là phần cuối (không phải link)
}

interface BreadcrumbsProps {
  items: BreadcrumbItem[];
  className?: string;
}

const Breadcrumbs = ({ items, className }: BreadcrumbsProps) => {
  if (!items || items.length === 0) return null;

  return (
    <nav aria-label="Breadcrumb" className={cn('flex flex-wrap items-center text-sm text-gray-600 gap-1', className)}>
      {items.map((item, index) => {
        const isLast = index === items.length - 1;
        return (
          <div key={index} className="flex items-center gap-1">
            {item.href && !isLast ? (
              <Link href={item.href} className="hover:text-yellow-600 transition-colors">
                {item.name}
              </Link>
            ) : (
              <span className={cn(isLast ? 'text-yellow-600 font-medium' : '')}>{item.name}</span>
            )}
            {!isLast && <span className="text-gray-400">/</span>}
          </div>
        );
      })}
    </nav>
  );
};

export default Breadcrumbs;
