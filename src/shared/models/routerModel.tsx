import { createBrowserRouter } from 'react-router-dom';
import RootLayout from '../view/container/general-layout/view/RootLayout';
import generateRoutesChild from '../usecase/useRenderRoutes';
import LoginContainer from '@/routes/admin/authentication/login/Login';
import RegisterVendorContainer from '@/routes/admin/authentication/register-vendor/Register';

export const router = createBrowserRouter([
  {
    path: '/',
    element: <RootLayout />,
    children: generateRoutesChild(),
  },
  {
    path: '/login',
    element: <LoginContainer />,
  },
  {
    path: '/login',
    element: <LoginContainer />,
  },
  {
    path: '/register-vendor',
    element: <RegisterVendorContainer />,
  },
]);
