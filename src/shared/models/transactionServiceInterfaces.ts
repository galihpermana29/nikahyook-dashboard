export type TTransasactionStatus =
  | 'waiting-for-approval'
  | 'waiting-for-payment'
  | 'payment-in-review'
  | 'payment-done'
  | 'order-rejected';
