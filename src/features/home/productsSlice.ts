import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import {
  getProductsByCategory,
  type ApiProduct,
  type ProductsPage,
} from '../../api/productsApi';

export const PRODUCTS_PAGE_SIZE = 6;

export type ProductsState = {
  items: ApiProduct[];
  total: number;
  category: string | null;
  status: 'idle' | 'loading' | 'loadingMore' | 'succeeded' | 'failed';
  error: string | null;
};

const initialState: ProductsState = {
  items: [],
  total: 0,
  category: null,
  status: 'idle',
  error: null,
};

// Minimal shape of the slice of RootState this thunk needs, so it doesn't
// have to import RootState from the store (which would create a cycle).
type ThunkState = { products: ProductsState };

export const fetchProductsByCategory = createAsyncThunk<
  { page: ProductsPage; reset: boolean },
  { slug: string; reset: boolean },
  { state: ThunkState; rejectValue: string }
>('products/fetch', async ({ slug, reset }, { getState, rejectWithValue }) => {
  const skip = reset ? 0 : getState().products.items.length;
  try {
    const page = await getProductsByCategory(slug, {
      limit: PRODUCTS_PAGE_SIZE,
      skip,
    });
    return { page, reset };
  } catch (err: any) {
    const message =
      err?.response?.data?.message ??
      err?.message ??
      'Unable to load products.';
    return rejectWithValue(message);
  }
});

const productsSlice = createSlice({
  name: 'products',
  initialState,
  reducers: {},
  extraReducers: builder => {
    builder
      .addCase(fetchProductsByCategory.pending, (state, action) => {
        state.status = action.meta.arg.reset ? 'loading' : 'loadingMore';
        state.error = null;
        if (action.meta.arg.reset) {
          state.items = [];
        }
      })
      .addCase(fetchProductsByCategory.fulfilled, (state, action) => {
        const { page, reset } = action.payload;
        state.items = reset ? page.products : [...state.items, ...page.products];
        state.total = page.total;
        state.category = action.meta.arg.slug;
        state.status = 'succeeded';
      })
      .addCase(fetchProductsByCategory.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.payload ?? 'Unable to load products.';
      });
  },
});

export default productsSlice.reducer;
