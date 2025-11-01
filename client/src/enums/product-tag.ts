export enum ProductTag {
  NEW = 'NEW',
  SALE = 'SALE',
}

export const ProductTagLabel: Record<ProductTag, string> = {
  [ProductTag.NEW]: 'Sản phẩm mới',
  [ProductTag.SALE]: 'Đang Sale',
};
