import { IDetailClientUser } from '@/shared/models/userServicesInterface';
import { DashboardUserAPI } from '@/shared/repositories/userServices';
import { FormInstance } from 'antd';
import dayjs from 'dayjs';
import { useQuery } from 'react-query';
import { IVendorLocation } from '../../vendor-management/vendor-user-management/view/container/Create/VendorUserCreate';

const useQueryClientUserDetail = (
  id: string,
  form?: FormInstance,
  setLocationState?: React.Dispatch<React.SetStateAction<IVendorLocation>>
) => {
  const getDetail = async () => {
    const { data } = await DashboardUserAPI.getUserById<IDetailClientUser>(
      id as string
    );
    const provinceId = data?.detail?.location.value.slice(0, 2);
    const cityId = data?.detail?.location.value;
    const cityLabel = data?.detail?.location.label;

    setLocationState!((dx) => ({
      ...dx,
      province: { value: provinceId, label: '' },
      city: { value: cityId, label: cityLabel },
    }));

    const detailJson = JSON.parse(data?.detail?.json_text as string);

    form!.setFieldsValue({
      ...data,
      ...detailJson,
      province: provinceId,
      city: cityId,
      gender: data?.detail?.gender,
      date_of_birth: dayjs(data?.detail?.date_of_birth),
      wedding_date: dayjs(data?.detail?.wedding_date),
    });
    return data;
  };

  const { data, error, isLoading, refetch } = useQuery({
    queryKey: ['vendor-detail', id],
    queryFn: getDetail,
    enabled: id ? true : false,
    refetchOnWindowFocus: false,
  });

  return { data, error, isLoading, refetch };
};

export default useQueryClientUserDetail;
