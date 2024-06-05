import type { IDetailProductData } from '@/shared/models/productServicesInterface';
import useGetAllProducts from './useGetAllProducts';
import ProductCard from '@/shared/view/presentations/product-card/ProductCard';

type Props = {
  selectedItemsId: number[];
  emptyComponent: React.ReactNode;
};

export default function DisplaySelectedProducts({
  selectedItemsId,
  emptyComponent,
}: Props) {
  const { result } = useGetAllProducts();
  const selectedItems = result?.data?.filter((item: IDetailProductData) =>
    selectedItemsId?.includes(item.id)
  );

  if (!selectedItems || !selectedItemsId) return emptyComponent;

  return (
    <div className="grid grid-cols-2 gap-2">
      {selectedItems.map((product) => (
        <ProductCard key={product.id} product={product} />
      ))}
    </div>
  );
}
