import type { FormInstance } from 'antd';
import InspirationModal from '../view/presentations/Modal/InspirationModal';
import ProductModal from '../view/presentations/Modal/ProductModal';

type TGetCuratorialModalTypeProps = {
  filterForm: FormInstance;
  form: FormInstance;
  closeModal: () => void;
};

export default function useGetCuratorialModalType({
  filterForm,
  form,
  closeModal,
}: TGetCuratorialModalTypeProps) {
  return {
    product: (
      <ProductModal
        filterForm={filterForm}
        form={form}
        fieldName="products"
        priceFieldName="total_price"
        closeModal={closeModal}
      />
    ),
    inspiration: (
      <InspirationModal
        filterForm={filterForm}
        form={form}
        fieldName="inspirations"
        closeModal={closeModal}
      />
    ),
  };
}
