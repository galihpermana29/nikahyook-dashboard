import { DashboardReviewAPI } from '@/shared/repositories/reviewService';
import { message } from 'antd';
import { useQuery } from 'react-query';

const useGetReviewProduct = () => {
  const fetchReviews = async () => {
    const { data } = await DashboardReviewAPI.getAllReviews();
    return data;
  };

  const { data: reviews, isLoading } = useQuery({
    queryFn: fetchReviews,
    queryKey: ['vendor-review-products'],
    onError: () => message.error('error fetching products, please try again'),
  });

  const reviewProducts = reviews
    ? Array.from(new Set(reviews.map((review) => review.product_id))).map(
        (productId) => {
          const product = reviews.find(
            (review) => review.product_id === productId
          );
          return {
            product_id: productId,
            product_name: product?.product_name || 'Unknown Product',
          };
        }
      )
    : [];

  return { reviewProducts, isLoading };
};

export default useGetReviewProduct;
