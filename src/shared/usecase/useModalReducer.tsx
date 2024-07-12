import { useReducer } from 'react';
import { FormInstance } from 'antd';

const OPEN_MODAL = 'OPEN_MODAL';
const CLOSE_MODAL = 'CLOSE_MODAL';

export type TModalType = 'edit' | 'create' | 'password' | 'detail' | 'reset';

export interface IModalReducerReturn {
  modalState?: TModalState;
  openModal?: (modalType: TModalType, id?: string) => void;
  closeModal?: () => void;
}

export type TModalState = {
  isOpen: boolean;
  type: TModalType;
  queryRoutes?: string;
  id?: string;
};

export type Action =
  | { type: 'OPEN_MODAL'; modalType: TModalType; id?: string }
  | { type: 'CLOSE_MODAL' };

const modalReducer = (state: TModalState, action: Action) => {
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

const initialState: TModalState = {
  isOpen: false,
  type: 'create',
  id: undefined,
};

const useModalReducer = (form?: FormInstance<any>): IModalReducerReturn => {
  const [modalState, dispatch] = useReducer(modalReducer, initialState);

  const openModal = (modalType: TModalType, id?: string) => {
    if (modalType === 'create') form!.resetFields();
    dispatch({ type: 'OPEN_MODAL', modalType, id });
  };

  const closeModal = () => {
    dispatch({ type: 'CLOSE_MODAL' });
  };

  return { openModal, closeModal, modalState };
};

export default useModalReducer;
