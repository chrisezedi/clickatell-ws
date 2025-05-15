export interface Product {
  id: number;
  title: string;
  slug: string;
  price: number;
  description: string;
  category: {
    id: number;
    name: string;
    image: string;
    slug: string;
  };
  images: string[];
}

export interface Category {
  id: number;
  name: string;
  slug: string;
}

export interface Filters {
  categoryId?:number;
  offset:number;
  limit:number;
}
