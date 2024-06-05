import defaultInspirationImage from '@/assets/default-inspiration-image.jpeg';
import type { IDetailProductData } from '@/shared/models/productServicesInterface';
import { Tag } from 'antd';

interface IProductCardProps {
  product: IDetailProductData;
  miscButton?: React.ReactNode;
}

export default function ProductCard({
  product,
  miscButton,
}: IProductCardProps) {
  return (
    <div className="flex rounded-md border-2 h-full flex-col">
      <div className="h-[348px]">
        <img
          className="bg-cover h-[348px] w-full"
          src={product.images[0] ?? defaultInspirationImage}
          alt="default inspiration"
        />
      </div>
      <div className="flex flex-col gap-2 p-3 w-full">
        <div className="flex items-center gap-4 w-full justify-between">
          <h4 className="font-medium">{product.title}</h4>

          {miscButton}
        </div>

        <div className="flex flex-col w-full gap-2">
          <div className="flex w-full items-center flex-wrap gap-y-2">
            {product.tags.map((tag) => (
              <Tag key={tag.name} className="capitalize w-max">
                {tag.name}
              </Tag>
            ))}
          </div>

          <p className="text-ny-gray-400 w-full text-left">
            {product.vendor_name}
          </p>
        </div>
      </div>
    </div>
  );
}
