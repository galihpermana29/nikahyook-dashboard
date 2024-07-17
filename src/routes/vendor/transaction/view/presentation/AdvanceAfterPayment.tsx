import checkIcon from '@/assets/icon/check-icon-white.svg';
import rejectIcon from '@/assets/icon/close-red.svg';
import uploadIcon from '@/assets/icon/document-upload.svg';
import {
  IUpdateOrderStatusPayload,
  IUpdateOrderStatusResponseRoot,
  TTransasactionStatus,
} from '@/shared/models/transactionServiceInterfaces';
import DraggerUpload from '@/shared/view/presentations/dragger-upload/DraggerUpload';
import { Button, Form, Image, Modal } from 'antd';
import { useForm } from 'antd/es/form/Form';
import { AxiosError } from 'axios';
import { useState } from 'react';
import { UseMutateFunction } from 'react-query';
import { NavigateFunction } from 'react-router-dom';

interface IAdvanceAfterPayment {
  id: number;
  payments_file_uri: string[];
  status: TTransasactionStatus;
  mutate: UseMutateFunction<
    IUpdateOrderStatusResponseRoot,
    AxiosError<unknown, any>,
    {
      payload: IUpdateOrderStatusPayload;
      id: number;
      onSuccess?: () => void;
    },
    unknown
  >;
  navigate: NavigateFunction;
  onUploadReceipt: (values: any) => void;
}

function AdvanceAfterPayment({
  id,
  payments_file_uri,
  status,
  mutate,
  navigate,
  onUploadReceipt,
}: IAdvanceAfterPayment) {
  const enableAdvanceStatuses: TTransasactionStatus[] = [
    'payment done',
    'order failed',
  ];

  const [form] = useForm();

  const [showModal, setShowModal] = useState(false);

  return (
    <section className="space-y-5">
      <div className="flex justify-between items-center gap-5">
        <h3 className="text-body-1 font-semibold">Payment Receipt</h3>
        <Button
          onClick={() => setShowModal(true)}
          type="primary"
          htmlType="button"
          className="flex items-center gap-2">
          <img src={uploadIcon} alt="icon" />
          <span>Add Receipt</span>
        </Button>
      </div>

      <Modal
        title="Add Payment Receipt"
        open={showModal}
        onCancel={() => setShowModal(false)}
        footer={
          <div className="flex gap-2">
            <Button
              onClick={() => {
                setShowModal(false);
                form.resetFields();
              }}
              className="basis-1/2 bg-ny-primary-100 text-ny-primary-500">
              Cancel
            </Button>
            <Button
              type="primary"
              htmlType="submit"
              onClick={() => form.submit()}
              className="basis-1/2">
              Save
            </Button>
          </div>
        }>
        <Form
          form={form}
          onFinish={onUploadReceipt}
          className="w-full flex justify-center items-center">
          <Form.Item name="receipt">
            <DraggerUpload formItemName="receipt" form={form} />
          </Form.Item>
        </Form>
      </Modal>

      <div className="grid grid-cols-3 gap-5">
        {payments_file_uri.map((uri, index) => (
          <div
            key={index}
            className="border border-ny-primary-500 rounded-lg overflow-hidden">
            <Image
              src={uri}
              alt="Payment Receipt"
              width={'100%'}
              className="aspect-[4/5] object-cover"
            />
            <div className="p-3 pt-1">
              <h4 className="font-bold text-heading-6">
                Payment Receipt #{index + 1}
              </h4>
            </div>
          </div>
        ))}
      </div>

      {!enableAdvanceStatuses.includes(status) && (
        <div className="flex justify-end gap-2">
          <Button
            onClick={() =>
              mutate({
                id: id,
                payload: {
                  status: 'waiting for payment',
                  payment_file_uri: [],
                },
                onSuccess: () => {
                  navigate(`/vendor-transaction/${id}`);
                },
              })
            }
            className="flex items-center gap-2 border border-ny-error-600 text-ny-error-600 bg-ny-error-100 hover:!bg-ny-error-200">
            <img src={rejectIcon} alt="icon" />
            <span>Reject</span>
          </Button>
          <Button
            onClick={() =>
              mutate({
                id: id,
                payload: { status: 'payment done' },
                onSuccess: () => {
                  navigate(`/vendor-transaction/${id}`);
                },
              })
            }
            type="primary"
            className="flex items-center gap-2">
            <img src={checkIcon} alt="icon" />
            <span>Approve</span>
          </Button>
        </div>
      )}
    </section>
  );
}

export default AdvanceAfterPayment;
