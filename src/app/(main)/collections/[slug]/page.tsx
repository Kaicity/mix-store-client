'use client';

import Breadcrumbs from '@/components/Breadcrumb';
import ProductList from '@/components/ProductList';
import { findCategoryWithPath } from '@/helpers/findCategoryPath';
import { notFound } from 'next/navigation';
import React from 'react';

interface CollectionPageProps {
  params: Promise<{ slug: string }>;
}

const CollectionsPage = ({ params }: CollectionPageProps) => {
  const { slug } = React.use(params);
  const result = findCategoryWithPath(slug);
  if (!result) return notFound();

  const { category } = result;

  const breadcrumbItems = [{ name: 'Trang chủ', href: '/' }, { name: category.name }];

  return (
    <div>
      <Breadcrumbs items={breadcrumbItems} className="mb-6" />

      <h1 className="text-2xl font-bold mb-6">Bộ sưu tập: {category.name}</h1>

      <ProductList />
    </div>
  );
};

export default CollectionsPage;
