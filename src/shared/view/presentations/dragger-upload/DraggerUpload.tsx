import './style.scss'
import type { FormInstance, UploadProps } from 'antd';
import { Upload, message } from 'antd';
import { useEffect, useState } from 'react';
import docIcon from '@/assets/icon/document-upload.png';
import LoadingHandler from '../../container/loading/Loading';
import { DashboardUploadAPI } from '@/shared/repositories/uploadDocumentService';
import useErrorAxios from '@/shared/usecase/useErrorAxios';
import { AxiosError } from 'axios';

interface DraggerUploadI {
  profileImageURL?: string | string[];
  formItemName: string;
  form: FormInstance<any>;
  limit?: number;
}

const DraggerUpload = ({
  profileImageURL,
  form,
  formItemName,
  limit = 1,
}: DraggerUploadI) => {
  const [loadingUpload, setLoadingUpload] = useState(false);
  const { generateErrorMsg, showPopError } = useErrorAxios();
  const [fileList, setFileList] = useState<any[]>([]);

  const handleChange: UploadProps['onChange'] = ({
    fileList: newFileList,
    file,
  }) => {
    if (file.size! > 2000000) {
      return message.error('File size cannot be more than 2MB');
    }
    setFileList(newFileList);
  };

  const beforeUpload = async (file: File) => {
    try {
      const formData = new FormData();
      formData.append('image', file);
      setLoadingUpload(true);
      const { data } = await DashboardUploadAPI.uploadDocs(formData);
      setLoadingUpload(false);

      return data;
    } catch (error) {
      const msg = generateErrorMsg(error as AxiosError);
      showPopError(msg);
      setLoadingUpload(false);
    }
  };

  const uploadButton = (
    <button
      type="button"
      className="flex flex-col justify-center items-center px-[20px] gap-[10px] text-caption-2 text-ny-gray-300">
      <img src={docIcon} alt="icon" />
      <h1>Drop profile picture here or click here to browse file</h1>
    </button>
  );

  const updateFileList = (
    profileImageURL: string | string[],
    limit: number
  ) => {
    if (profileImageURL) {
      return limit === 1
        ? [
            {
              uid: '-1',
              name: 'image.png',
              status: 'done',
              url: profileImageURL,
            },
          ]
        : (profileImageURL as string[]).map((dx, idx) => ({
            uid: idx + 1001,
            name: `image ${idx}.png`,
            status: 'done',
            url: dx,
          }));
    }
    return [];
  };

  useEffect(() => {
    setFileList(updateFileList(profileImageURL!, limit));
  }, [profileImageURL, limit]);

  return (
    <div className='flex flex-col items-center'>
      <LoadingHandler isLoading={loadingUpload} classname="h-[169px]">
        <Upload
          accept="image/*"
          onRemove={async (file) => {
            const val = await form.getFieldsValue();
            if (limit === 1) {
              form.setFieldValue(formItemName, null);
            } else {
              form.setFieldValue(
                formItemName,
                val[formItemName].filter((dx) => dx !== file.url)
              );
            }
          }}
          className="dragger-upload !bg-white sm:flex sm:flex-col sm:items-center"
          beforeUpload={async (file) => {
            const data = await beforeUpload(file);
            if (data) {
              const val = await form.getFieldsValue();
              if (limit === 1) {
                form.setFieldValue(formItemName, data);
              } else {
                form.setFieldValue(
                  formItemName,
                  val[formItemName] ? [...val[formItemName], data] : [data]
                );
              }
            }
            return false;
          }}
          listType="picture-card"
          fileList={fileList}
          onChange={handleChange}>
          {fileList.length === limit ? null : uploadButton}
        </Upload>
      </LoadingHandler>
      <div className="text-caption-2 text-ny-gray-300 text-center mt-[10px] max-w-max">
        Supported: JPEG, JPG, PNG, Max size: 2 MB
      </div>
    </div>
  );
};

export default DraggerUpload;
