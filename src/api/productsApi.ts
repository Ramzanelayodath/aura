import apiClient from './client';

export type Category = {
  slug: string;
  name: string;
  url: string;
};

export const getCategories = () =>
  apiClient
    .get<Category[]>('/products/categories')
    .then(response => response.data);

export type ApiProduct = {
  id: number;
  title: string;
  description: string;
  category: string;
  price: number;
  discountPercentage: number;
  rating: number;
  stock: number;
  brand?: string;
  thumbnail: string;
  images: string[];
};

export type ProductsPage = {
  products: ApiProduct[];
  total: number;
  skip: number;
  limit: number;
};

export const getProductsByCategory = (
  slug: string,
  params: { limit: number; skip: number },
) =>
  apiClient
    .get<ProductsPage>(`/products/category/${slug}`, { params })
    .then(response => response.data);

export type ApiReview = {
  rating: number;
  comment: string;
  date: string;
  reviewerName: string;
  reviewerEmail: string;
};

export type ApiProductDetail = {
  id: number;
  title: string;
  description: string;
  category: string;
  price: number;
  discountPercentage: number;
  rating: number;
  stock: number;
  tags: string[];
  brand?: string;
  sku: string;
  warrantyInformation: string;
  shippingInformation: string;
  availabilityStatus: string;
  reviews: ApiReview[];
  returnPolicy: string;
  minimumOrderQuantity: number;
  thumbnail: string;
  images: string[];
};

export const getProductById = (id: number) =>
  apiClient
    .get<ApiProductDetail>(`/products/${id}`)
    .then(response => response.data);
