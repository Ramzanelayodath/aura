import { useCallback, useMemo, useState } from 'react';
import { useAppDispatch, useAppSelector } from '../../store/hooks';
import {
  applyPromoCode,
  decrementQuantity,
  fetchCarts,
  FREE_SHIPPING_THRESHOLD,
  incrementQuantity,
  PROMO_DISCOUNT_RATE,
  removeItem,
  removePromoCode,
  VALID_PROMO_CODE,
} from './cartSlice';

/**
 * The one place the Cart screen goes to read or trigger cart state.
 * Keeps Redux (dispatch, selectors, action creators) out of the view and
 * derives the order-summary math (subtotal, promo discount, total) here.
 */
export function useCartViewModel() {
  const dispatch = useAppDispatch();
  const { items, promoCode, total, status, error } = useAppSelector(state => state.cart);
  const [promoError, setPromoError] = useState<string | null>(null);

  const totals = useMemo(() => {
    const subtotal = items.reduce((sum, item) => sum + item.price * item.quantity, 0);
    const promoDiscount = promoCode ? subtotal * PROMO_DISCOUNT_RATE : 0;
    const total = subtotal - promoDiscount;
    const totalQuantity = items.reduce((sum, item) => sum + item.quantity, 0);
    const shippingProgress = Math.min(1, subtotal / FREE_SHIPPING_THRESHOLD);
    const freeShippingUnlocked = shippingProgress >= 1;
    const installmentAmount = total / 4;

    return {
      subtotal,
      promoDiscount,
      total,
      totalQuantity,
      totalItems: items.length,
      shippingProgress,
      freeShippingUnlocked,
      installmentAmount,
    };
  }, [items, promoCode]);

  const applyPromo = useCallback(
    (code: string) => {
      if (code.trim().toUpperCase() === VALID_PROMO_CODE) {
        dispatch(applyPromoCode(code));
        setPromoError(null);
      } else {
        setPromoError('That code is not valid.');
      }
    },
    [dispatch],
  );

  return {
    items,
    promoCode,
    promoError,
    clearPromoError: () => setPromoError(null),
    ...totals,
    catalogTotal: total,
    isLoading: status === 'loading',
    isLoadingMore: status === 'loadingMore',
    loadError: error,
    loadCarts: () => dispatch(fetchCarts({ reset: true })),
    loadMoreCarts: () => dispatch(fetchCarts({ reset: false })),
    increment: (id: string) => dispatch(incrementQuantity(id)),
    decrement: (id: string) => dispatch(decrementQuantity(id)),
    remove: (id: string) => dispatch(removeItem(id)),
    applyPromo,
    removePromo: () => dispatch(removePromoCode()),
  };
}
