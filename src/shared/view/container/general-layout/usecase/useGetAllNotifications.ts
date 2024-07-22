import { DashboardNotificationAPI } from '@/shared/repositories/notificationServices';
import useConvertQuery from '@/shared/usecase/useConvertQuery';
import useSuccessAxios from '@/shared/usecase/useSuccessAxios';
import { useDebounce } from '@uidotdev/usehooks';
import { useState } from 'react';
import { useQuery } from 'react-query';

const useQueryVendorNotification = () => {
  const [queryVendorNotification, setQueryVendorNotification] = useState({
    // user_id: JSON.parse(localStorage.getItem('admin')!).user_id,
    status: 'unread',
  });

  const { objectToQueryParams } = useConvertQuery();
  const { addIndexToData } = useSuccessAxios();
  const queries = useDebounce(queryVendorNotification, 1000);

  const getVendorContent = async () => {
    const queryParams = objectToQueryParams(queryVendorNotification);
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
    queryKey: ['vendor-notification', { ...queries }],
    queryFn: getVendorContent,
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

export default useQueryVendorNotification;
