import { useReducer } from 'react';
import { FormInstance } from 'antd';

const OPEN_MODAL = 'OPEN_MODAL';
const CLOSE_MODAL = 'CLOSE_MODAL';

export type TCuratorialModalType = 'product' | 'inspiration';

export interface ICuratorialModalReducerReturn {
  modalState?: TCuratorialModalState;
  openModal?: (modalType: TCuratorialModalType, id?: string) => void;
  closeModal?: () => void;
}

export type TCuratorialModalState = {
  isOpen: boolean;
  type: TCuratorialModalType;
  queryRoutes?: string;
  id?: string;
};

export type Action =
  | { type: 'OPEN_MODAL'; modalType: TCuratorialModalType; id?: string }
  | { type: 'CLOSE_MODAL' };

const modalReducer = (state: TCuratorialModalState, action: Action) => {
  switch (action.type) {
    case OPEN_MODAL:
      return {
        isOpen: true,
        type: action.modalType,
        id: action.id,
      };
    case CLOSE_MODAL:
      return {
        ...state,
        isOpen: false,
      };
    default:
      return state;
  }
};

const initialState: TCuratorialModalState = {
  isOpen: false,
  type: 'product',
  id: undefined,
};

const useModalReducer = (
  form?: FormInstance<any>
): ICuratorialModalReducerReturn => {
  const [modalState, dispatch] = useReducer(modalReducer, initialState);

  const openModal = (modalType: TCuratorialModalType, id?: string) => {
    form!.resetFields();
    dispatch({ type: 'OPEN_MODAL', modalType, id });
  };

  const closeModal = () => {
    dispatch({ type: 'CLOSE_MODAL' });
  };

  return { openModal, closeModal, modalState };
};

export default useModalReducer;
