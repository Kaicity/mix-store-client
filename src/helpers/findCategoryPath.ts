import { categories } from '@/constants/navCategoriesItem';

export function findCategoryWithPath(slug: string) {
  for (const cat of categories) {
    if (cat.slug === slug) return { category: cat, path: [cat] };
    for (const sub of cat.subs || []) {
      if (sub.slug === slug) return { category: sub, path: [cat, sub] };
      for (const deep of sub.subs || []) {
        if (deep.slug === slug) return { category: deep, path: [cat, sub, deep] };
      }
    }
  }
  return null;
}
