export type SubCategory = {
  name: string;
  slug: string;
  subs?: SubCategory[];
};

export type Category = {
  name: string;
  icon: React.ReactNode;
  slug: string;
  subs: SubCategory[];
};

export type Categories = Category[];
