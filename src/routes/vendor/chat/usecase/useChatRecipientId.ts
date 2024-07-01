import useConvertQuery from '@/shared/usecase/useConvertQuery';
import { useSearchParams } from 'react-router-dom';

type TSetParamsOptions = {
  recipientId?: string;
};

export default function useChatRecipientId() {
  const [params, setParams] = useSearchParams();
  const recipientId = params.get('recipientId');

  const setIds = (options: TSetParamsOptions) => {
    const idParams = Object.fromEntries(params.entries());
    const { objectToQueryParams } = useConvertQuery();
    const newParams = objectToQueryParams({ ...idParams, ...options });

    return setParams(newParams);
  };

  return { recipientId, setIds };
}
