import { DashboardNotificationAPI } from '@/shared/repositories/notificationServices';
import useConvertQuery from '@/shared/usecase/useConvertQuery';
import useSuccessAxios from '@/shared/usecase/useSuccessAxios';
import { useDebounce } from '@uidotdev/usehooks';
import { useState } from 'react';
import { useQuery } from 'react-query';

const useQueryNotification = () => {
  const [queryVendorNotification, setQueryVendorNotification] = useState({
    user_id: JSON.parse(localStorage.getItem('admin')!).user_id,
    status: '',
  });

  const { objectToQueryParams } = useConvertQuery();
  const { addIndexToData } = useSuccessAxios();
  const queries = useDebounce(queryVendorNotification, 1000);

  const userType = JSON.parse(localStorage.getItem('admin')!).type;

  const getNotifications = async () => {
    const queryParams = objectToQueryParams(queryVendorNotification);

    if (userType === 'admin') {
      const { data } = await DashboardNotificationAPI.getAllAdminNotifications(
        queryParams
      );
      return { data: addIndexToData(data) };
    }

    const { data } = await DashboardNotificationAPI.getAllVendorNotifications(
      queryParams
    );
    return { data: addIndexToData(data) };
  };

  const {
    data: result,
    error,
    isLoading,
    refetch,
  } = useQuery({
    queryKey: ['admin-notification', { ...queries }],
    queryFn: getNotifications,
  });

  return {
    result,
    error,
    isLoading,
    refetch,
    setQueryVendorNotification,
    queryVendorNotification,
  };
};

export default useQueryNotification;
