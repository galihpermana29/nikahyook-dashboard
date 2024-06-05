import type { IDetailProductData } from '@/shared/models/productServicesInterface';
import useGetAllInspirations from './useGetAllInspirations';
import InspirationCard from '@/shared/view/presentations/inspiration-card/InspirationCard';

type Props = {
  selectedItemsId: number[];
  emptyComponent: React.ReactNode;
};

export default function DisplaySelectedInspirations({
  selectedItemsId,
  emptyComponent,
}: Props) {
  const { result } = useGetAllInspirations();
  const selectedItems = result?.data?.filter((item: IDetailProductData) =>
    selectedItemsId?.includes(item.id)
  );

  if (!selectedItems || !selectedItemsId) return emptyComponent;

  return (
    <div className="grid grid-cols-2 gap-2">
      {selectedItems.map((inspiration) => (
        <InspirationCard key={inspiration.id} inspiration={inspiration} />
      ))}
    </div>
  );
}
