import type { Categories } from '@/types/category';
import { Briefcase, Footprints, Glasses, Hand, Shirt, ShoppingBag, ShoppingBasket, Store, Venus } from 'lucide-react';

export const categories: Categories = [
  {
    name: 'TẤT CẢ',
    icon: <ShoppingBasket className="w-4 h-4" />,
    slug: 'tat-ca',
    subs: [
      {
        name: 'QUẦN ÁO',
        slug: 'quan-ao',
        subs: [
          { name: 'ÁO THUN', slug: 'ao-thun' },
          { name: 'ÁO POLO', slug: 'ao-polo' },
          { name: 'ÁO SƠ MI', slug: 'ao-so-mi' },
          { name: 'ÁO KHOÁC', slug: 'ao-khoac' },
          { name: 'ÁO HOODIE', slug: 'ao-hoodie' },
          { name: 'SET QUẦN ÁO', slug: 'set-quan-ao' },
          { name: 'ÁO NỈ - SWEATSHIRT', slug: 'ao-ni' },
          { name: 'ÁO LEN', slug: 'ao-len' },
        ],
      },
      {
        name: 'PHỤ KIỆN',
        slug: 'phu-kien',
        subs: [
          { name: 'MẮT KÍNH', slug: 'mat-kinh' },
          { name: 'ĐỒNG HỒ', slug: 'dong-ho' },
          { name: 'TRANG SỨC', slug: 'trang-suc' },
        ],
      },
    ],
  },
  {
    name: 'ÁO NAM',
    icon: <Shirt className="w-4 h-4" />,
    slug: 'ao-nam',
    subs: [
      { name: 'ÁO THUN', slug: 'ao-thun' },
      { name: 'ÁO POLO', slug: 'ao-polo' },
      { name: 'ÁO SƠ MI', slug: 'ao-so-mi' },
      { name: 'ÁO KHOÁC', slug: 'ao-khoac' },
      { name: 'ÁO HOODIE', slug: 'ao-hoodie' },
      { name: 'SET QUẦN ÁO', slug: 'set-quan-ao' },
      { name: 'ÁO NỈ - SWEATSHIRT', slug: 'ao-ni' },
      { name: 'ÁO LEN', slug: 'ao-len' },
    ],
  },
  {
    name: 'GIÀY DÉP',
    icon: <Footprints className="w-4 h-4" />,
    slug: 'giay-dep',
    subs: [
      { name: 'SNEAKER', slug: 'sneaker' },
      { name: 'SANDAL', slug: 'sandal' },
      { name: 'BOOT', slug: 'boot' },
    ],
  },
  {
    name: 'TÚI SÁCH',
    icon: <Briefcase className="w-4 h-4" />,
    slug: 'tui-sach',
    subs: [
      { name: 'TÚI DA', slug: 'tui-da' },
      { name: 'TÚI VẢI', slug: 'tui-vai' },
      { name: 'BALO', slug: 'balo' },
    ],
  },
  {
    name: 'BAO TAY',
    icon: <Hand className="w-4 h-4" />,
    slug: 'bao-tay',
    subs: [
      { name: 'LEN', slug: 'len' },
      { name: 'DA', slug: 'da' },
      { name: 'THỂ THAO', slug: 'the-thao' },
    ],
  },
  {
    name: 'VÁY',
    icon: <Venus className="w-4 h-4" />,
    slug: 'vay',
    subs: [
      { name: 'DÀI', slug: 'dai' },
      { name: 'NGẮN', slug: 'ngan' },
      { name: 'DẠ HỘI', slug: 'da-hoi' },
    ],
  },
  {
    name: 'HỘP QUÀ',
    icon: <ShoppingBag className="w-4 h-4" />,
    slug: 'hop-qua',
    subs: [
      { name: 'SINH NHẬT', slug: 'sinh-nhat' },
      { name: 'LỄ TÌNH NHÂN', slug: 'le-tinh-nhan' },
      { name: 'NOEL', slug: 'noel' },
    ],
  },
  {
    name: 'PHỤ KIỆN',
    icon: <Glasses className="w-4 h-4" />,
    slug: 'phu-kien',
    subs: [
      { name: 'MẮT KÍNH', slug: 'mat-kinh' },
      { name: 'ĐỒNG HỒ', slug: 'dong-ho' },
      { name: 'TRANG SỨC', slug: 'trang-suc' },
    ],
  },
  {
    name: 'CỬA HÀNG',
    icon: <Store className="w-4 h-4" />,
    slug: 'cua-hang',
    subs: [],
  },
];
