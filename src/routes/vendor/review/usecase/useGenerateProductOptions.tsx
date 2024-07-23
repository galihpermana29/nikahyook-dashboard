import { TGeneralSelectOptions } from '@/shared/models/generalInterfaces';
import { useMemo } from 'react';

interface reviewProduct {
  product_id: string;
  product_name: string;
}

const useGenerateProductOptions = (uniqueProducts: reviewProduct[]) => {
  const productOptions = useMemo(() => {
    if (!uniqueProducts || !uniqueProducts.length) return [];

    const options: TGeneralSelectOptions[] = uniqueProducts.map((product) => ({
      label: product.product_name,
      value: product.product_id,
    }));

    return [{ label: 'All Products', value: 'default' }, ...options];
  }, [uniqueProducts]);

  return { productOptions };
};

export default useGenerateProductOptions;
