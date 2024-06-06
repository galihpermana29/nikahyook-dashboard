import type { IDetailProductData } from '@/shared/models/productServicesInterface';
import InspirationCard from '@/shared/view/presentations/inspiration-card/InspirationCard';
import useGetAllInspirations from '../../repositories/useGetAllInspirations';

type Props = {
  selectedItemsId: number[];
  emptyComponent: React.ReactNode;
};

export default function SelectedInspirations({
  selectedItemsId,
  emptyComponent,
}: Props) {
  const { result } = useGetAllInspirations();
  const selectedItems = result?.data?.filter((item: IDetailProductData) =>
    selectedItemsId?.includes(item.id)
  );

  if (!selectedItems || selectedItems.length === 0 || !selectedItemsId)
    return emptyComponent;

  return (
    <div className="grid grid-cols-3 gap-2">
      {selectedItems.map((inspiration) => (
        <InspirationCard key={inspiration.id} inspiration={inspiration} />
      ))}
    </div>
  );
}
