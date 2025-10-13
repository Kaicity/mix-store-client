export enum ProductTag {
  NEW = 'NEW',
  SALE = 'SALE',
  BASIC = 'BASIC',
}

export const ProductTagLabel: Record<ProductTag, string> = {
  [ProductTag.NEW]: 'Sản phẩm mới',
  [ProductTag.SALE]: 'Đang Sale',
  [ProductTag.BASIC]: 'Dành cho bạn',
};
