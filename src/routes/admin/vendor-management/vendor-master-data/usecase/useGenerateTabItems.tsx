import { ProductTypeContainer } from '../view/container/Table/TableProductType';
import { TabsProps } from 'antd';
import { TagDataContainer } from '../view/container/Table/TableTagData';
import { useState } from 'react';
import { VendorTypeContainer } from '../view/container/Table/TableVendorType';

export const useGenerateTabItems = () => {
  const [currentActiveTab, setCurrentActiveTab] = useState(1);

  const tabItems: TabsProps['items'] = [
    {
      key: '1',
      label: 'Tag Data',
      children: <TagDataContainer />,
    },
    {
      key: '2',
      label: 'Product Type',
      children: <ProductTypeContainer />,
    },
    {
      key: '3',
      label: 'Vendor Type',
      children: <VendorTypeContainer />,
    },
  ];

  return { tabItems, currentActiveTab, setCurrentActiveTab };
};
