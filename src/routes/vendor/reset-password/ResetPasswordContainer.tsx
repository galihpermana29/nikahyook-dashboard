import loginImg from '@/assets/login-image.png';
import logo from '@/assets/primary-logo.svg';
import LoadingHandler from '@/shared/view/container/loading/Loading';
import { RequestEmailForm } from './view/presentation/RequestEmailForm';
import { ResetPasswordForm } from './view/presentation/ResetPasswordForm';
import { useValidateToken } from './usecase/useValidateToken';
import { useRequestResetEmail } from './usecase/useRequestResetEmail';
import { useResetPassword } from './usecase/useResetPassword';

export const ResetPasswordContainer = () => {
  const { mutate: requestEmail, isLoading: isRequestingEmail } =
    useRequestResetEmail();
  const { mutate: resetPassword, isLoading: isResettingPassword } =
    useResetPassword();
  const { isTokenValid } = useValidateToken();
  const isLoading = isRequestingEmail || isResettingPassword;

  return (
    <div className="h-screen flex">
      <div className="flex-1 h-screen hidden md:block">
        <img
          src={loginImg}
          alt="login-image"
          className="object-cover w-full h-screen"
        />
      </div>
      <div className="flex-1 flex justify-center items-center px-8">
        <div className="p-[15px]">
          <img src={logo} alt="logo" className="w-[280px] m-auto mb-[40px]" />
          <div className="mb-[28px]">
            <h1 className="text-heading-5 font-[600] text-black">
              Atur ulang password
            </h1>
            <p className="text-caption-1 text-ny-gray-600 font-[400] max-w-[80ch]">
              {isTokenValid
                ? 'Harap masukkan password baru Anda untuk diatur ulang.'
                : 'Harap masukkan alamat email Anda untuk melakukan pengaturan ulang password'}
            </p>
          </div>
          <LoadingHandler isLoading={isLoading} classname="h-[150px]">
            {isTokenValid ? (
              <ResetPasswordForm mutate={resetPassword} />
            ) : (
              <RequestEmailForm mutate={requestEmail} />
            )}
          </LoadingHandler>
        </div>
      </div>
    </div>
  );
};
