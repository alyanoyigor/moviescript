import { createSlice } from '@reduxjs/toolkit';
import { modalOpenAction, modalCloseAction } from '../actions/modal';
import { MODAL_NAME } from '../constants/modal';

export type ModalState = {
  open: boolean;
  name: MODAL_NAME | null;
};

const initialState: ModalState = { open: false, name: null };

const MODAL_SLICE_NAME = 'MODAL_SLICE';

const modalSlice = createSlice({
  name: MODAL_SLICE_NAME,
  initialState,
  reducers: { modalOpen: modalOpenAction, modalClose: modalCloseAction },
});

export const { modalOpen, modalClose } = modalSlice.actions;

export default modalSlice.reducer;
