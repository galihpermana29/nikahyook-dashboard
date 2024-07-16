import type { IValidateResetTokenPayloadRoot } from '@/shared/models/userServicesInterface';
import { DashboardUserAPI } from '@/shared/repositories/userServices';
import useErrorAxios from '@/shared/usecase/useErrorAxios';
import { AxiosError } from 'axios';
import { useState } from 'react';
import { useQuery } from 'react-query';
import { useSearchParams } from 'react-router-dom';

export const useValidateToken = () => {
  const { generateErrorMsg, showPopError } = useErrorAxios();

  const validateToken = async (payload: IValidateResetTokenPayloadRoot) => {
    if (!payload.token) return;

    const data = await DashboardUserAPI.validateResetToken(payload);
    return data;
  };

  const handleError = (error: AxiosError) => {
    const msg = generateErrorMsg(error);
    if (msg === 'UNAUTHORIZED_ACCESS') {
      showPopError('Token sudah tidak berlaku, harap meminta token baru.');
      setSearchParams();
      return;
    }

    showPopError(msg);
  };

  const [searchParams, setSearchParams] = useSearchParams();
  const token = searchParams.get('token');
  const [isTokenValid, setIsTokenValid] = useState(false);

  useQuery({
    queryFn: () => validateToken({ token }),
    onError: handleError,
    // to avoid user taking too long to wait
    retry: false,
    onSuccess: (data) => {
      if (!data) return;
      setIsTokenValid(true);
    },
  });

  return { isTokenValid };
};
