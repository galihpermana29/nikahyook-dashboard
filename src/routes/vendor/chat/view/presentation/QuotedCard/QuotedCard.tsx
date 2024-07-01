import formatToRupiah from '@/shared/usecase/formatToRupiah';
import { Avatar } from 'antd';

export type TQuotedCardProduct = {
  productImage: string;
  productName: string;
  productPrice: number;
  productQuantityLabel: string;
};

export default function QuotedCard({
  product,
  closeComponent,
}: {
  product: TQuotedCardProduct;
  closeComponent: React.ReactNode;
}) {
  return (
    <div className="py-3 px-4 bg-white max-w-fit flex box-border rounded-lg h-[100px] gap-3 border">
      <Avatar
        className="size-20 shrink-0"
        shape="square"
        src={product.productImage}
      />

      <div className="flex flex-col justify-between w-full">
        <div className="flex justify-between items-start">
          <h1 className="text-caption-2 sm:text-caption-1 line-clamp-2 font-medium">
            {product.productName}
          </h1>

          {closeComponent}
        </div>

        <div className="flex items-center justify-between gap-2">
          <span className="text-ny-primary-500 text-caption-1 font-medium">
            {formatToRupiah(product.productPrice)}

            <span className="text-caption-2">
              {'/'}
              {product.productQuantityLabel}
            </span>
          </span>
        </div>
      </div>
    </div>
  );
}
