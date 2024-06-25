import {
  IVendorLocation,
  initialState,
} from '@/routes/admin/vendor-management/vendor-user-management/view/container/Create/VendorUserCreate';
import { IDetailVendorUser } from '@/shared/models/userServicesInterface';
import { DashboardUserAPI } from '@/shared/repositories/userServices';
import { FormInstance } from 'antd';
import { useEffect, useState } from 'react';
import { useQuery } from 'react-query';

const useSetInitialLocationForProduct = (
  id: string,
  setLocationState: React.Dispatch<React.SetStateAction<IVendorLocation>>,
  form: FormInstance<any>
) => {
  const [useTheSameLoc, setTheSameLoc] = useState(false);

  const getDetail = async () => {
    const { data } = await DashboardUserAPI.getUserById<IDetailVendorUser>(
      id as string
    );

    return data;
  };

  const setTheSameLocation = (data: IVendorLocation) => {
    setLocationState(data);
    form.setFieldsValue({ ...data });
  };

  const { data, error, isLoading, refetch } = useQuery({
    queryKey: ['vendor-detail', id],
    queryFn: getDetail,
    enabled: id ? true : false,
    refetchOnWindowFocus: false,
  });

  useEffect(() => {
    setTheSameLocation(
      useTheSameLoc ? (data?.detail.location as IVendorLocation) : initialState
    );
  }, [useTheSameLoc]);

  return {
    data,
    error,
    isLoading,
    refetch,
    setTheSameLocation,
    setTheSameLoc,
    useTheSameLoc,
  };
};

export default useSetInitialLocationForProduct;
