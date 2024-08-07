import useErrorAxios from '@/shared/usecase/useErrorAxios';
import { Button } from 'antd';
import { AxiosError } from 'axios';
import { useNavigate } from 'react-router-dom';

interface ErrorBoundaryI {
  error: AxiosError;
  children: React.ReactNode;
  refetch?: () => void;
}

const ErrorBoundary = ({ error, children, refetch }: ErrorBoundaryI) => {
  const navigate = useNavigate();
  if (error) {
    const { generateErrorMsg } = useErrorAxios();
    const msg = generateErrorMsg(error as AxiosError);
    if (error.response?.status === 401) {
      navigate('/login');
      localStorage.clear();
      setTimeout(() => window.location.reload(), 1500);
    }
    return (
      <div className="h-[100vh] justify-center items-center bg-red-100  flex">
        <div className="flex flex-col text-center gap-[20px] justify-center items-center">
          <div>
            <div className="text-[30px] font-bold">Something went wrong!</div>
            <div className="text-[18px] font-regular">{msg}</div>
          </div>
          <Button className="max-w-max h-[40px]" onClick={refetch}>
            Retry
          </Button>
        </div>
      </div>
    );
  }
  return children;
};

export default ErrorBoundary;
