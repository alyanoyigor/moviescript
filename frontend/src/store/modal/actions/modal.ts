import { PayloadAction } from '@reduxjs/toolkit';
import { MODAL_NAME } from '../constants/modal';
import { ModalState } from '../reducer/modal';

export const modalOpenAction = (
  state: ModalState,
  action: PayloadAction<{ name: MODAL_NAME }>
) => {
  const { name } = action.payload;

  state.open = true;
  state.name = name;
};

export const modalCloseAction = (state: ModalState) => {
  state.open = false;
  state.name = null;
};
