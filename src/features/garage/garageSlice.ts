import { createSlice, type PayloadAction } from '@reduxjs/toolkit';
import { DEFAULT_CAR_COLOR } from '../../constants';
import type { CarDraft } from '../../types';

interface GarageState {
  currentPage: number;
  createForm: CarDraft;
  editForm: CarDraft;
  selectedCarId: number | null;
}

const emptyDraft: CarDraft = { name: '', color: DEFAULT_CAR_COLOR };

const initialState: GarageState = {
  currentPage: 1,
  createForm: { ...emptyDraft },
  editForm: { ...emptyDraft },
  selectedCarId: null,
};

const garageSlice = createSlice({
  name: 'garage',
  initialState,
  reducers: {
    setGaragePage(state, action: PayloadAction<number>) {
      state.currentPage = action.payload;
    },
    setCreateForm(state, action: PayloadAction<Partial<CarDraft>>) {
      state.createForm = { ...state.createForm, ...action.payload };
    },
    resetCreateForm(state) {
      state.createForm = { ...emptyDraft };
    },
    selectCar(state, action: PayloadAction<{ id: number; draft: CarDraft }>) {
      state.selectedCarId = action.payload.id;
      state.editForm = action.payload.draft;
    },
    setEditForm(state, action: PayloadAction<Partial<CarDraft>>) {
      state.editForm = { ...state.editForm, ...action.payload };
    },
    clearSelection(state) {
      state.selectedCarId = null;
      state.editForm = { ...emptyDraft };
    },
  },
});

export const {
  setGaragePage,
  setCreateForm,
  resetCreateForm,
  selectCar,
  setEditForm,
  clearSelection,
} = garageSlice.actions;
export default garageSlice.reducer;
