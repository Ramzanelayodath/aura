import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { getProductById, type ApiProductDetail } from '../../api/productsApi';

export type ProductDetailState = {
  product: ApiProductDetail | null;
  status: 'idle' | 'loading' | 'succeeded' | 'failed';
  error: string | null;
};

const initialState: ProductDetailState = {
  product: null,
  status: 'idle',
  error: null,
};

export const fetchProductById = createAsyncThunk<
  ApiProductDetail,
  number,
  { rejectValue: string }
>('productDetail/fetch', async (id, { rejectWithValue }) => {
  try {
    return await getProductById(id);
  } catch (err: any) {
    const message =
      err?.response?.data?.message ??
      err?.message ??
      'Unable to load product.';
    return rejectWithValue(message);
  }
});

const productDetailSlice = createSlice({
  name: 'productDetail',
  initialState,
  reducers: {
    clearProductDetail: state => {
      state.product = null;
      state.status = 'idle';
      state.error = null;
    },
  },
  extraReducers: builder => {
    builder
      .addCase(fetchProductById.pending, state => {
        state.status = 'loading';
        state.error = null;
      })
      .addCase(fetchProductById.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.product = action.payload;
      })
      .addCase(fetchProductById.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.payload ?? 'Unable to load product.';
      });
  },
});

export const { clearProductDetail } = productDetailSlice.actions;
export default productDetailSlice.reducer;
