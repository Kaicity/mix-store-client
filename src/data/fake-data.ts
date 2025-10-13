import { ProductTag } from '@/enums/product-tag';
import { Products } from '@/types/product';

const productsData: Products = [
  {
    id: 1,
    name: 'Áo Thun CoreFit',
    shortDescription: 'Áo thun thể thao co giãn thoải mái, phù hợp cho tập luyện hoặc mặc hàng ngày.',
    description:
      'Áo thun CoreFit được làm từ chất liệu cotton pha spandex giúp thấm hút mồ hôi nhanh và co giãn linh hoạt. Thiết kế ôm vừa vặn, dễ phối cùng quần jeans hoặc quần jogger.',
    price: 399000,
    sizes: ['s', 'm', 'l', 'xl', 'xxl', '2xl'],
    colors: ['gray', 'purple', 'green'],
    images: {
      gray: '/products/1g.png',
      purple: '/products/1p.png',
      green: '/products/1gr.png',
    },
    tag: ProductTag.SALE,
  },
  {
    id: 2,
    name: 'Áo Khoác Puma Ultra Warm',
    shortDescription: 'Áo khoác giữ ấm nhẹ, thiết kế thời trang cho mùa lạnh.',
    description:
      'Áo khoác Puma Ultra Warm sử dụng vải nỉ cao cấp, nhẹ và ấm. Kiểu dáng thể thao hiện đại, phù hợp cho cả nam và nữ trong thời tiết se lạnh.',
    price: 599000,
    sizes: ['s', 'm', 'l', 'xl'],
    colors: ['gray', 'green'],
    images: { gray: '/products/2g.png', green: '/products/2gr.png' },
    tag: ProductTag.SALE,
  },
  {
    id: 3,
    name: 'Áo Thun Nike Air Essentials',
    shortDescription: 'Áo thun cao cấp Nike, thoáng khí và mềm mại khi mặc.',
    description:
      'Nike Air Essentials được làm từ cotton hữu cơ kết hợp sợi tổng hợp giúp tăng độ bền và cảm giác mát mẻ. Logo Nike in nổi bật ở ngực, thích hợp cho phong cách năng động.',
    price: 699000,
    sizes: ['s', 'm', 'l'],
    colors: ['green', 'blue', 'black'],
    images: {
      green: '/products/3gr.png',
      blue: '/products/3b.png',
      black: '/products/3bl.png',
    },
    tag: ProductTag.NEW,
  },
  {
    id: 4,
    name: 'Áo Thun Nike Flex',
    shortDescription: 'Áo thun co giãn 4 chiều, cực kỳ thoải mái khi vận động.',
    description:
      'Nike Flex T-Shirt được thiết kế với công nghệ Dri-FIT giúp thấm hút mồ hôi nhanh, mang lại cảm giác khô thoáng suốt cả ngày. Kiểu dáng trẻ trung, năng động.',
    price: 299000,
    sizes: ['s', 'm', 'l'],
    colors: ['white', 'pink'],
    images: { white: '/products/4w.png', pink: '/products/4p.png' },
    tag: ProductTag.NEW,
  },
  {
    id: 5,
    name: 'Áo Thun Under Armour',
    shortDescription: 'Áo thể thao chính hãng Under Armour, chống nhăn và co giãn tốt.',
    description:
      'Under Armour mang lại cảm giác nhẹ, thoáng, với khả năng khử mùi và chống nhăn vượt trội. Thích hợp cho các hoạt động thể thao hoặc đi chơi.',
    price: 499000,
    sizes: ['s', 'm', 'l'],
    colors: ['red', 'orange', 'black'],
    images: {
      red: '/products/5r.png',
      orange: '/products/5o.png',
      black: '/products/5bl.png',
    },
    tag: ProductTag.NEW,
  },
  {
    id: 6,
    name: 'Giày Nike Air Max 270',
    shortDescription: 'Mẫu giày biểu tượng của Nike, êm ái và phong cách.',
    description:
      'Nike Air Max 270 được trang bị đệm Air lớn nhất của Nike giúp nâng đỡ bàn chân tối đa. Thiết kế thể thao năng động, dễ phối đồ cho cả nam và nữ.',
    price: 1599000,
    sizes: ['40', '42', '43', '44'],
    colors: ['gray', 'white'],
    images: { gray: '/products/6g.png', white: '/products/6w.png' },
    tag: ProductTag.BASIC,
  },
  {
    id: 7,
    name: 'Giày Chạy Nike Ultraboost',
    shortDescription: 'Giày chạy bộ cao cấp với độ đàn hồi tuyệt vời.',
    description:
      'Nike Ultraboost sử dụng công nghệ đế Boost êm ái, giúp tăng hiệu suất khi chạy. Thiết kế hiện đại, phù hợp cả khi tập luyện hoặc dạo phố.',
    price: 1799000,
    sizes: ['40', '42', '43'],
    colors: ['gray', 'pink'],
    images: { gray: '/products/7g.png', pink: '/products/7p.png' },
    tag: ProductTag.BASIC,
  },
  {
    id: 8,
    name: 'Quần Jean Levi’s Classic Denim',
    shortDescription: 'Quần jean Levi’s dáng cổ điển, chất liệu denim bền đẹp.',
    description:
      'Levi’s Classic Denim được làm từ vải denim cao cấp, giữ form tốt và ít phai màu. Dễ dàng phối cùng áo thun hoặc áo sơ mi cho phong cách năng động.',
    price: 799000,
    sizes: ['s', 'm', 'l'],
    colors: ['blue', 'green'],
    images: { blue: '/products/8b.png', green: '/products/8gr.png' },
    tag: ProductTag.BASIC,
  },
];

export { productsData };
