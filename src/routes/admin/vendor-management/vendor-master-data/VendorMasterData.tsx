import PageTitle from '@/shared/view/presentations/page-title/PageTitle';
import { Tabs } from 'antd';
import { useGenerateTabItems } from './usecase/useGenerateTabItems';

export const VendorMasterDataContainer = () => {
  const { tabItems, currentActiveTab, setCurrentActiveTab } =
    useGenerateTabItems();

  return (
    <>
      <PageTitle title={tabItems[currentActiveTab - 1].label as string} />

      <Tabs
        items={tabItems}
        defaultActiveKey="1"
        onChange={(key) => setCurrentActiveTab(parseInt(key))}
      />
    </>
  );
};
