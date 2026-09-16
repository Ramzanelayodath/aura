import { useCallback } from 'react';
import { useAppDispatch, useAppSelector } from '../../store/hooks';
import { fetchProductsByCategory } from './productsSlice';

/**
 * The one place screens go to read or trigger product-listing state.
 * Keeps Redux (dispatch, selectors, action creators) out of the views.
 */
export function useProductsViewModel() {
  const dispatch = useAppDispatch();
  const products = useAppSelector(state => state.products);

  const loadProducts = useCallback(
    (slug: string) => dispatch(fetchProductsByCategory({ slug, reset: true })),
    [dispatch],
  );
  const loadMoreProducts = useCallback(
    (slug: string) => dispatch(fetchProductsByCategory({ slug, reset: false })),
    [dispatch],
  );

  return {
    products: products.items,
    total: products.total,
    isLoading: products.status === 'loading',
    isLoadingMore: products.status === 'loadingMore',
    error: products.error,
    loadProducts,
    loadMoreProducts,
  };
}
