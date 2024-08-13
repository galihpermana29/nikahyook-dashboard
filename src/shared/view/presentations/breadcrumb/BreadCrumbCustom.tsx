import useGenerateBreadcrumb from '@/shared/usecase/useGenerateBreadcrumb';
import { Breadcrumb } from 'antd';
import { useLocation, useNavigate } from 'react-router-dom';

import homeIcon from '@/assets/icon/home.png';
import { RightOutlined } from '@ant-design/icons';

export default function CustomBreadcrumbs() {
  const navigate = useNavigate();
  const location = useLocation();
  const breadCrumbsGenerated = useGenerateBreadcrumb(location.pathname);
  return (
    <div>
      <Breadcrumb
        className="[&>ol]:items-center"
        separator={<RightOutlined className="!text-[10px]" />}
        items={[
          {
            onClick: () => {
              navigate('/');
            },
            title: (
              <img
                src={homeIcon}
                className="cursor-pointer max-w-[18px]"
                alt={'icon'}
              />
            ),
          },
          ...breadCrumbsGenerated.map((data) => ({
            title: data.href ? (
              <a href={data.href}>{data.title}</a>
            ) : (
              <div className="capitalize">{data.title}</div>
            ),
          })),
        ]}
      />
    </div>
  );
}
