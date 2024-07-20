export interface IAllReviewData {
  user_id: string;
  user_name: string;
  product_id: string;
  product_image: string;
  product_name: string;
  rating: number;
  description: string;
}

export interface IAllReviewResponseRoot {
  data: IAllReviewData[];
  status: string;
}
