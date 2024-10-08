import type { IDetailProductData } from '@/shared/models/productServicesInterface';
import ProductCard from '@/shared/view/presentations/product-card/ProductCard';
import useGetAllProducts from '../../repositories/useGetAllProducts';

type Props = {
  selectedItemsId: number[];
  emptyComponent: React.ReactNode;
};

export default function SelectedProducts({
  selectedItemsId,
  emptyComponent,
}: Props) {
  const { result } = useGetAllProducts();
  const selectedItems = result?.data?.filter((item: IDetailProductData) =>
    selectedItemsId?.includes(item.id)
  );

  if (!selectedItems || selectedItems.length === 0 || !selectedItemsId)
    return emptyComponent;

  return (
    <div className="grid grid-cols-4 lg:grid-cols-3 gap-2">
      {selectedItems.map((product) => (
        <ProductCard gridResponsive key={product.id} product={product} />
      ))}
    </div>
  );
}
