import type { IDetailProductData } from '@/shared/models/productServicesInterface';
import useGetAllProducts from './useGetAllProducts';

export default function useGetTotalSelectedPrice(selectedItems: number[]) {
  const { result } = useGetAllProducts();
  const prices = result?.data
    ?.filter((product: IDetailProductData) =>
      selectedItems?.includes(product.id)
    )
    .map((product: IDetailProductData) => product.price) as string[];

  const totalPrices = prices?.reduce((prev, curr) => prev + parseInt(curr), 0);

  return totalPrices ?? 0;
}
