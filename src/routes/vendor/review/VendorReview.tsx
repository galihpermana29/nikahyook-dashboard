import { AxiosError } from 'axios';
import { 
    Form, 
    Select, 
    Spin 
} from 'antd';
import { IAllReviewData } from '@/shared/models/reviewServiceInterfaces';
import { useForm } from 'antd/es/form/Form';
import DashboardTable from '@/shared/view/presentations/dashboard-table/DashboardTable';
import ErrorBoundary from '@/shared/view/container/error-boundary/ErrorBoundary';
import PageFilter from '@/shared/view/presentations/page-filter/PageFilter';
import PageTitle from '@/shared/view/presentations/page-title/PageTitle';
import useGenerateColumnReview from './usecase/useGenerateColumn';
import useGenerateProductOptions from './usecase/useGenerateProductOptions';
import useGetReviewProduct from './repositories/useGetAllReviewProduct';
import useQueryReviews from './repositories/useGetAllReviews';

const VendorReviewContainer = () => {
  const [form] = useForm();

  const {
    result,
    error,
    isLoading: loadingGetAll,
    setQueryReviews,
    queryReviews,
    refetch,
    handleFilter,
    clearFilter,
  } = useQueryReviews(form);

  const { columns } = useGenerateColumnReview();

  const { 
    reviewProducts, 
    isLoading: loadingOptions 
} = useGetReviewProduct();

  const { productOptions } = useGenerateProductOptions(reviewProducts);

  return (
    <ErrorBoundary error={error as AxiosError} refetch={refetch}>
      <PageTitle title="Vendor Review" />
      <DashboardTable<IAllReviewData>
        filterComponents={
          <PageFilter
            form={form}
            query={queryReviews}
            onApplyFilter={handleFilter}
            onClearFilter={clearFilter}
            filterComponents={
              <>
                <Form.Item
                  name={'product_id'}
                  label="Product"
                  initialValue={queryReviews.product_id || 'default'}
                  className="my-[10px] max-w-[200px]"
                >
                  <Select
                    className="h-[35px] truncate"
                    loading={loadingOptions}
                    options={productOptions}
                    notFoundContent={
                      loadingOptions ? <Spin size="small" /> : null
                    }
                  />
                </Form.Item>
              </>
            }
            onSearch={setQueryReviews}
          />
        }
        columns={columns}
        data={result ? result.data : undefined}
        loading={loadingGetAll}
        onPaginationChanges={null}
      />
    </ErrorBoundary>
  );
};

export default VendorReviewContainer;
