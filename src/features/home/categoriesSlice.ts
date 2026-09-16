import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { getCategories, type Category } from '../../api/productsApi';

export type CategoriesState = {
  items: Category[];
  status: 'idle' | 'loading' | 'succeeded' | 'failed';
  error: string | null;
};

const initialState: CategoriesState = {
  items: [],
  status: 'idle',
  error: null,
};

export const fetchCategories = createAsyncThunk<
  Category[],
  void,
  { rejectValue: string }
>('categories/fetch', async (_, { rejectWithValue }) => {
  try {
    return await getCategories();
  } catch (err: any) {
    const message =
      err?.response?.data?.message ??
      err?.message ??
      'Unable to load categories.';
    return rejectWithValue(message);
  }
});

const categoriesSlice = createSlice({
  name: 'categories',
  initialState,
  reducers: {},
  extraReducers: builder => {
    builder
      .addCase(fetchCategories.pending, state => {
        state.status = 'loading';
        state.error = null;
      })
      .addCase(fetchCategories.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.items = action.payload;
      })
      .addCase(fetchCategories.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.payload ?? 'Unable to load categories.';
      });
  },
});

export default categoriesSlice.reducer;
