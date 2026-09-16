import { createAsyncThunk, createSlice, type PayloadAction } from '@reduxjs/toolkit';
import { getCarts, type ApiCart, type CartsPage } from '../../api/cartsApi';

export type CartItemStockVariant = 'check' | 'dot' | 'box';
export type CartItemBadgeVariant = 'discount' | 'tag';

export type CartItem = {
  id: string;
  productId: number;
  title: string;
  variant: string;
  price: number;
  originalPrice?: number;
  quantity: number;
  badgeLabel: string;
  badgeVariant: CartItemBadgeVariant;
  stockLabel: string;
  stockVariant: CartItemStockVariant;
  swatchColor: string;
};

export type CartState = {
  items: CartItem[];
  cartsLoaded: number;
  total: number;
  promoCode: string | null;
  status: 'idle' | 'loading' | 'loadingMore' | 'succeeded' | 'failed';
  error: string | null;
};

const initialState: CartState = {
  items: [],
  cartsLoaded: 0,
  total: 0,
  promoCode: null,
  status: 'idle',
  error: null,
};

export const VALID_PROMO_CODE = 'AURACOLLECTION';
export const PROMO_DISCOUNT_RATE = 0.1;
export const FREE_SHIPPING_THRESHOLD = 150;
export const CARTS_PAGE_SIZE = 30;

const SWATCH_COLORS = ['#DCE7E2', '#E7E0D5', '#E3DCD3', '#EAE4D9', '#DFD8CE'];

function mapCartToItems(cart: ApiCart): CartItem[] {
  return cart.products.map((product, index) => {
    const hasDiscount = product.discountPercentage > 0;
    return {
      id: `${cart.id}-${product.id}-${index}`,
      productId: product.id,
      title: product.title,
      variant: `Cart #${cart.id} • SKU-${product.id}`,
      price: hasDiscount ? product.discountedTotal / product.quantity : product.price,
      originalPrice: hasDiscount ? product.price : undefined,
      quantity: product.quantity,
      badgeLabel: hasDiscount
        ? `${product.discountPercentage.toFixed(1)}% OFF`
        : 'Cart Item',
      badgeVariant: hasDiscount ? 'discount' : 'tag',
      stockLabel: 'In Stock',
      stockVariant: 'box',
      swatchColor: SWATCH_COLORS[(cart.id + index) % SWATCH_COLORS.length],
    };
  });
}

// Minimal shape of the slice of RootState this thunk needs, so it doesn't
// have to import RootState from the store (which would create a cycle).
type ThunkState = { cart: CartState };

export const fetchCarts = createAsyncThunk<
  { page: CartsPage; reset: boolean },
  { reset: boolean },
  { state: ThunkState; rejectValue: string }
>('cart/fetch', async ({ reset }, { getState, rejectWithValue }) => {
  const skip = reset ? 0 : getState().cart.cartsLoaded;
  try {
    const page = await getCarts({ limit: CARTS_PAGE_SIZE, skip });
    return { page, reset };
  } catch (err: any) {
    const message =
      err?.response?.data?.message ?? err?.message ?? 'Unable to load cart.';
    return rejectWithValue(message);
  }
});

const cartSlice = createSlice({
  name: 'cart',
  initialState,
  reducers: {
    incrementQuantity: (state, action: PayloadAction<string>) => {
      const item = state.items.find(i => i.id === action.payload);
      if (item) item.quantity += 1;
    },
    decrementQuantity: (state, action: PayloadAction<string>) => {
      const item = state.items.find(i => i.id === action.payload);
      if (item) item.quantity = Math.max(1, item.quantity - 1);
    },
    removeItem: (state, action: PayloadAction<string>) => {
      state.items = state.items.filter(i => i.id !== action.payload);
    },
    applyPromoCode: (state, action: PayloadAction<string>) => {
      if (action.payload.trim().toUpperCase() === VALID_PROMO_CODE) {
        state.promoCode = VALID_PROMO_CODE;
      }
    },
    removePromoCode: state => {
      state.promoCode = null;
    },
  },
  extraReducers: builder => {
    builder
      .addCase(fetchCarts.pending, (state, action) => {
        state.status = action.meta.arg.reset ? 'loading' : 'loadingMore';
        state.error = null;
        if (action.meta.arg.reset) {
          state.items = [];
          state.cartsLoaded = 0;
        }
      })
      .addCase(fetchCarts.fulfilled, (state, action) => {
        const { page, reset } = action.payload;
        const newItems = page.carts.flatMap(mapCartToItems);
        state.items = reset ? newItems : [...state.items, ...newItems];
        state.cartsLoaded = (reset ? 0 : state.cartsLoaded) + page.carts.length;
        state.total = page.total;
        state.status = 'succeeded';
      })
      .addCase(fetchCarts.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.payload ?? 'Unable to load cart.';
      });
  },
});

export const {
  incrementQuantity,
  decrementQuantity,
  removeItem,
  applyPromoCode,
  removePromoCode,
} = cartSlice.actions;
export default cartSlice.reducer;
