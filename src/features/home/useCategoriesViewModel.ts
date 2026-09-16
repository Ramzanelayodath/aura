import { useCallback } from 'react';
import { useAppDispatch, useAppSelector } from '../../store/hooks';
import { fetchCategories } from './categoriesSlice';

/**
 * The one place screens go to read or trigger category state.
 * Keeps Redux (dispatch, selectors, action creators) out of the views.
 */
export function useCategoriesViewModel() {
  const dispatch = useAppDispatch();
  const categories = useAppSelector(state => state.categories);

  const loadCategories = useCallback(
    () => dispatch(fetchCategories()),
    [dispatch],
  );

  return {
    categories: categories.items,
    isLoading: categories.status === 'loading',
    error: categories.error,
    loadCategories,
  };
}
