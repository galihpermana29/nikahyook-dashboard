import type { FormInstance } from 'antd';
import CuratorialModalFooter from '../view/presentations/CuratorialModalFooter';
import InspirationModal from '../view/presentations/Modal/InspirationModal';
import ProductModal from '../view/presentations/Modal/ProductModal';

type TGetCuratorialModalTypeProps = {
  filterForm: FormInstance<any>;
  form: FormInstance<any>;
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
        footer={
          <CuratorialModalFooter
            itemCount={form.getFieldValue('products')?.length}
            secondaryText="Cancel"
            secondaryProps={{
              onClick: () => closeModal!(),
            }}
            primaryText="Add"
            primaryProps={{ type: 'submit' }}
          />
        }
      />
    ),
    inspiration: (
      <InspirationModal
        filterForm={filterForm}
        form={form}
        fieldName="inspirations"
        footer={
          <CuratorialModalFooter
            itemCount={form.getFieldValue('inspirations')?.length}
            secondaryText="Cancel"
            secondaryProps={{
              onClick: () => closeModal!(),
            }}
            primaryText="Add"
            primaryProps={{ type: 'submit' }}
          />
        }
      />
    ),
  };
}
