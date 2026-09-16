import apiClient from './client';

export type CartProductInput = {
  id: number;
  quantity: number;
};

export type AddToCartPayload = {
  userId: number;
  products: CartProductInput[];
};

export type ApiCart = {
  id: number;
  products: Array<{
    id: number;
    title: string;
    price: number;
    quantity: number;
    total: number;
    discountPercentage: number;
    discountedTotal: number;
    thumbnail: string;
  }>;
  total: number;
  discountedTotal: number;
  userId: number;
  totalProducts: number;
  totalQuantity: number;
};

export const addToCart = (payload: AddToCartPayload) =>
  apiClient.post<ApiCart>('/carts/add', payload).then(response => response.data);

export type CartsPage = {
  carts: ApiCart[];
  total: number;
  skip: number;
  limit: number;
};

export const getCarts = (params: { limit: number; skip: number }) =>
  apiClient.get<CartsPage>('/carts', { params }).then(response => response.data);
