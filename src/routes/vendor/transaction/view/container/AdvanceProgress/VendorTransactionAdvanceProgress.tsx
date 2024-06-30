import PageTitle from '@/shared/view/presentations/page-title/PageTitle';
import { Button, Form, InputNumber } from 'antd';
import TextArea from 'antd/es/input/TextArea';
import checkIcon from '@/assets/icon/check-icon-white.svg';

//* will be deleted on integration
const dummyProductList = [
  {
    id: 1,
    name: 'Luxury Ballroom',
    description: undefined,
    qty: 1,
    price: 50000,
  },
  {
    id: 2,
    name: 'Party Bus',
    description: undefined,
    qty: 1,
    price: 50000,
  },
];

function VendorTransactionAdvanceProgressContainer() {
  return (
    <>
      {/* <ErrorBoundary error={}> */}
      <PageTitle title="Advance Progress" />
      <section className="flex justify-center">
        <Form
          layout="vertical"
          className="bg-white rounded-lg w-3/5 shadow p-5 space-y-5">
          <div className="flex justify-between items-center gap-3">
            <div>
              <h2>Grand Total</h2>
              <p className="font-semibold text-body-1">IDR 65,000,000</p>
            </div>
            <Button
              htmlType="submit"
              type="primary"
              className="flex items-center gap-2">
              <img src={checkIcon} alt="Icon" />
              <span>Create Billing</span>
            </Button>
          </div>

          {dummyProductList.map((product) => (
            <div key={product.id} className="flex gap-5 p-5 rounded-lg border">
              <div className="basis-1/4 h-fit aspect-square rounded-lg bg-ny-gray-100 shrink-0"></div>

              <div className="grow space-y-2">
                <div>
                  <h3 className="font-semibold">{product.name}</h3>
                  <p className="text-ny-gray-400">{product.qty} Day</p>
                </div>
                <Form.Item
                  label="Price"
                  name={'price'}
                  initialValue={product.price}
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
                <Form.Item label="Description" name={'description'}>
                  <TextArea
                    autoSize={{ minRows: 3, maxRows: 5 }}
                    placeholder="Fill the description"
                  />
                </Form.Item>
              </div>
            </div>
          ))}
        </Form>
      </section>
      {/* </ErrorBoundary> */}
    </>
  );
}

export default VendorTransactionAdvanceProgressContainer;
