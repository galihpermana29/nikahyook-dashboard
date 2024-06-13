import {
  IDetailAdminUser,
  IDetailVendorUser,
} from '@/shared/models/userServicesInterface';
import { DashboardUserAPI } from '@/shared/repositories/userServices';
import { useQuery } from 'react-query';

const useQueryDetailUser = (id: string) => {
  const getlUserById = async () => {
    const { data } = await DashboardUserAPI.getUserById<
      IDetailAdminUser | IDetailVendorUser
    >(id);
    localStorage.setItem('type_user', JSON.stringify(data.type));
    return data;
  };

  const { data, error, isLoading, refetch } = useQuery({
    queryKey: ['detail-user', id],
    queryFn: getlUserById,
    enabled: id ? true : false,
  });

  return {
    data,
    error,
    isLoading,
    refetch,
  };
};

export default useQueryDetailUser;
