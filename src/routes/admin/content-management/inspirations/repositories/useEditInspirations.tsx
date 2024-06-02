import type { IEditInspirationInputRoot } from '@/shared/models/inspirationInterfaces';
import { InspirationAPI } from '@/shared/repositories/inspirationService';
import useErrorAxios from '@/shared/usecase/useErrorAxios';
import useSuccessAxios from '@/shared/usecase/useSuccessAxios';
import { AxiosError } from 'axios';
import { useMutation } from 'react-query';

const useMutateEditInspirations = (
  id: number,
  closeModal?: () => void,
  refetch?: () => void
) => {
  const { generateErrorMsg, showPopError } = useErrorAxios();
  const { showSuccessMessage } = useSuccessAxios();

  const editInspirations = async (payload: IEditInspirationInputRoot) => {
    const newPayload = {
      image: payload.image,
      name: payload.name,
      tags: payload.tags.map((tagOptions) => ({ id: tagOptions.value })),
    };

    const data = await InspirationAPI.editInspiration(newPayload, id);

    return data;
  };

  const handleError = (error: AxiosError) => {
    const msg = generateErrorMsg(error);
    showPopError(msg);
  };

  const { mutate, error, isLoading } = useMutation({
    mutationFn: (payload: IEditInspirationInputRoot) =>
      editInspirations(payload),
    onError: handleError,
    onSuccess: () => {
      closeModal!();
      refetch!();
      showSuccessMessage('Inspiration successfully edited!');
    },
  });
  return { mutate, error, isLoading };
};

export default useMutateEditInspirations;
