import { useCallback } from 'react';
import { useAppDispatch, useAppSelector } from '../../store/hooks';
import { clearProductDetail, fetchProductById } from './productDetailSlice';

/**
 * The one place screens go to read or trigger product-detail state.
 * Keeps Redux (dispatch, selectors, action creators) out of the views.
 */
export function useProductDetailViewModel() {
  const dispatch = useAppDispatch();
  const detail = useAppSelector(state => state.productDetail);

  const loadProduct = useCallback(
    (id: number) => dispatch(fetchProductById(id)),
    [dispatch],
  );
  const clearProduct = useCallback(() => dispatch(clearProductDetail()), [dispatch]);

  return {
    product: detail.product,
    isLoading: detail.status === 'loading',
    error: detail.error,
    loadProduct,
    clearProduct,
  };
}
