'use client';

import Breadcrumbs from '@/components/Breadcrumb';
import ProductList from '@/components/ProductList';
import { productsData } from '@/data/fake-data';
import { findCategoryWithPath } from '@/helpers/findCategoryPath';
import { Pagination, Select, SelectItem } from '@heroui/react';
import { notFound } from 'next/navigation';
import React from 'react';

interface CollectionPageProps {
  params: Promise<{ slug: string }>;
}

export const productSortOptions = [
  { key: 'featured', label: 'Sản phẩm nổi bật' },
  { key: 'price-asc', label: 'Giá: Tăng dần' },
  { key: 'price-desc', label: 'Giá: Giảm dần' },
  { key: 'name-asc', label: 'Tên: A-Z' },
  { key: 'name-desc', label: 'Tên: Z-A' },
  { key: 'oldest', label: 'Cũ nhất' },
  { key: 'newest', label: 'Mới nhất' },
  { key: 'best-seller', label: 'Bán chạy nhất' },
  { key: 'stock-desc', label: 'Tồn kho: Giảm dần' },
];

const CollectionsPage = ({ params }: CollectionPageProps) => {
  const { slug } = React.use(params);
  const result = findCategoryWithPath(slug);
  if (!result) return notFound();

  const { category } = result;

  const breadcrumbItems = [{ name: 'Trang chủ', href: '/' }, { name: category.name }];

  return (
    <div className="flex flex-col gap-6 mt-3">
      <Breadcrumbs items={breadcrumbItems} />

      <div className="flex flex-col md:flex-row justify-between ">
        <h1 className="text-2xl font-bold mb-6">Bộ sưu tập: {category.name}</h1>
        <Select className="max-w-xs" label="Lọc sản phẩm" placeholder="Chọn để lọc">
          {productSortOptions.map((filter) => (
            <SelectItem key={filter.key}>{filter.label}</SelectItem>
          ))}
        </Select>
      </div>
      <div className="flex flex-col gap-6 items-center">
        <ProductList products={productsData} />
        <Pagination variant="light" color="warning" showControls initialPage={1} total={10} />
      </div>
    </div>
  );
};

export default CollectionsPage;
