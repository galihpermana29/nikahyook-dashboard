import { IDetailVendorUser } from '@/shared/models/userServicesInterface';
import { DashboardUserAPI } from '@/shared/repositories/userServices';
import { FormInstance } from 'antd';
import { useQuery } from 'react-query';
import { IVendorLocation } from '../view/container/Create/VendorUserCreate';
import { useState } from 'react';

const useQueryVendorUserDetail = (
  id: string,
  form: FormInstance,
  setLocationState: React.Dispatch<React.SetStateAction<IVendorLocation>>
) => {
  const [initialDetailData, setInitialDetailData] = useState();

  const getDetail = async () => {
    const { data } = await DashboardUserAPI.getUserById<IDetailVendorUser>(
      id as string
    );
    setLocationState(data.detail.location);
    const vendorDetailJSON = data.detail.json_text
      ? JSON.parse(data.detail.json_text)
      : {
          vendor_description: '',
          vendor_album: [],
        };

    const detailData = {
      ...data,
      ...vendorDetailJSON,
    };

    form!.setFieldsValue(detailData);

    setInitialDetailData(detailData);

    return data;
  };

  const { data, error, isLoading, refetch } = useQuery({
    queryKey: ['vendor-detail', id],
    queryFn: getDetail,
    enabled: id ? true : false,
    refetchOnWindowFocus: false,
  });

  return {
    data,
    error,
    isLoading,
    refetch,
    initialDetailData,
    setInitialDetailData,
  };
};

export default useQueryVendorUserDetail;
