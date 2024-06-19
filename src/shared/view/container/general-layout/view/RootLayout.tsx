import './style.scss';
import { AxiosError } from 'axios';
import { ILoginData } from '@/shared/models/userServicesInterface';
import { ConfigProvider, Layout, Menu, theme } from 'antd';
import { Outlet } from 'react-router-dom';
import CustomHeader from './presentation/CustomHeader/CustomHeader';
import CustomLogoSidebar from './presentation/CustomLogoSidebar/CustomLogoSidebar';
import ErrorBoundary from '../../error-boundary/ErrorBoundary';
import GuardRoute from '../usecase/useGuard';
import LoadingHandler from '../../loading/Loading';
import React from 'react';
import UseGenerateItems, { actionType } from '../usecase/useGenerateItems';
import useQueryDetailUser from '../repositories/useQueryDetailUser';

const { Content, Footer, Sider } = Layout;

const RootLayout: React.FC = () => {
  const {
    token: { colorBgContainer, borderRadiusLG },
  } = theme.useToken();

  const admin: ILoginData = JSON.parse(localStorage.getItem('admin')!);
  const { data, error, refetch, isLoading } = useQueryDetailUser(
    admin?.user_id
  );
  const { items, handleClickMenu } = UseGenerateItems(data?.type as actionType);

  return (
    // INFO: Can guard this layout or whatever routes use this layout by using <GuardRoute/>
    <GuardRoute>
      <LoadingHandler isLoading={isLoading} fullscreen={true}>
        <ErrorBoundary error={error as AxiosError} refetch={refetch}>
          <ConfigProvider
            theme={{
              token: {
                colorPrimary: '#E60B6A',
              },
            }}>
            <Layout style={{ height: '100vh', overflow: 'hidden' }}>
              <Sider
                theme="light"
                className="border-r-[1px] border-ny-gray-200 h-screen hidden lg:block"
                collapsed={false}>
                {/*
					    INFO: this is logo sidebar
          */}
                <CustomLogoSidebar />
                <Menu
                  className="mt-[16px] px-[16px]"
                  theme="light"
                  defaultSelectedKeys={['/home']}
                  mode="inline"
                  items={items}
                  onClick={({ key }) => handleClickMenu(key)}
                />
              </Sider>
              <Layout>
                {/* 
            INFO: This is the header/navigation bar
          */}
                <CustomHeader data={data!} />
                <Content style={{ margin: '0 16px', overflow: 'auto' }}>
                  <div
                    className="p-[15px] lg:[30px]"
                    style={{
                      minHeight: '100vh',
                      borderRadius: borderRadiusLG,
                      backgroundColor: 'white',
                    }}>
                    <Outlet />
                  </div>
                </Content>
                <Footer
                  style={{ textAlign: 'center', background: colorBgContainer }}>
                  Nikahyook Dashboard
                </Footer>
              </Layout>
            </Layout>
          </ConfigProvider>
        </ErrorBoundary>
      </LoadingHandler>
    </GuardRoute>
  );
};

export default RootLayout;
