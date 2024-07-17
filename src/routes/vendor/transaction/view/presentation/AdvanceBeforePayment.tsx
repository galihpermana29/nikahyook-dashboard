import formatToIDR from '@/shared/usecase/formatToIDR';
import { Button, Form, Image, InputNumber } from 'antd';
import checkIcon from '@/assets/icon/check-icon-white.svg';
import TextArea from 'antd/es/input/TextArea';
import {
  IOrderDetail,
  IUpdateOrderStatusPayload,
  IUpdateOrderStatusResponseRoot,
} from '@/shared/models/transactionServiceInterfaces';
import { UseMutateFunction } from 'react-query';
import { AxiosError } from 'axios';
import { NavigateFunction } from 'react-router-dom';
import transformCreateBilling from '@/shared/usecase/transformCreateBilling';

interface IAdvanceBeforePayment {
  id: number;
  calculatedTotal: number;
  order_details: IOrderDetail[];
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
}

function AdvanceBeforePayment({
  id,
  calculatedTotal,
  order_details,
  mutate,
  navigate,
}: IAdvanceBeforePayment) {
  return (
    <section className="flex justify-center">
      <Form
        onFinish={(values) => {
          const trasformedOrderDetails = transformCreateBilling(values);

          const payload: IUpdateOrderStatusPayload = {
            status: 'waiting for payment',
            order_details: trasformedOrderDetails,
          };

          mutate({
            id: id,
            payload: payload,
            onSuccess: () => navigate(`/vendor-transaction/${id}`),
          });
        }}
        layout="vertical"
        className="bg-white rounded-lg w-3/5 shadow p-5 space-y-5">
        <div className="flex justify-between items-center gap-3">
          <div>
            <h2>Grand Total</h2>
            <p className="font-semibold text-body-1">
              {formatToIDR(calculatedTotal)}
            </p>
          </div>
          <Button
            htmlType="submit"
            type="primary"
            className="flex items-center gap-2">
            <img src={checkIcon} alt="Icon" />
            <span>Create Billing</span>
          </Button>
        </div>

        {order_details.map(
          (
            {
              product_title,
              id,
              description,
              price,
              quantity,
              quantity_label,
              image,
            },
            index
          ) => (
            <div key={id} className="flex gap-5 p-5 rounded-lg border">
              <div className="basis-1/4 h-fit aspect-square rounded-lg overflow-hidden bg-ny-gray-100 shrink-0">
                <Image
                  src={image}
                  alt="product image"
                  width={'100%'}
                  className="aspect-square object-cover"
                />
              </div>

              <div className="grow space-y-2">
                <div>
                  <h3 className="font-semibold">{product_title}</h3>
                  <p className="text-ny-gray-400">
                    {quantity} {quantity_label}
                  </p>
                </div>
                <Form.Item
                  initialValue={id}
                  name={'id' + index}
                  className="hidden"
                />
                <Form.Item
                  label="Price"
                  name={'price' + index}
                  initialValue={price}
                  rules={[{ required: true, message: 'Price is required!' }]}>
                  <InputNumber
                    formatter={(value) =>
                      `${value}`.replace(/\B(?=(\d{3})+(?!\d))/g, ',')
                    }
                    parser={(value) =>
                      value?.replace(/\$\s?|(,*)/g, '') as unknown as number
                    }
                    className="w-full"
                  />
                </Form.Item>
                <Form.Item
                  label="Description"
                  name={'description' + index}
                  initialValue={description}>
                  <TextArea
                    autoSize={{ minRows: 3, maxRows: 5 }}
                    placeholder="Fill the description"
                  />
                </Form.Item>
              </div>
            </div>
          )
        )}
      </Form>
    </section>
  );
}

export default AdvanceBeforePayment;
