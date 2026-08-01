import { createSlice, type PayloadAction } from '@reduxjs/toolkit';
import type { SortOrder, WinnersSortField } from '../../types';

interface WinnersState {
  currentPage: number;
  sort: WinnersSortField;
  order: SortOrder;
}

const initialState: WinnersState = {
  currentPage: 1,
  sort: 'time',
  order: 'ASC',
};

const winnersSlice = createSlice({
  name: 'winners',
  initialState,
  reducers: {
    setWinnersPage(state, action: PayloadAction<number>) {
      state.currentPage = action.payload;
    },
    setSort(state, action: PayloadAction<WinnersSortField>) {
      if (state.sort === action.payload) {
        state.order = state.order === 'ASC' ? 'DESC' : 'ASC';
      } else {
        state.sort = action.payload;
        state.order = 'ASC';
      }
    },
  },
});

export const { setWinnersPage, setSort } = winnersSlice.actions;
export default winnersSlice.reducer;