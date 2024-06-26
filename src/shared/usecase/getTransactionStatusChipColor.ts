import { TTransasactionStatus } from '../models/transactionServiceInterfaces';

export default (label: TTransasactionStatus) => {
  switch (label) {
    case 'payment-done':
      return 'green';
    case 'order-rejected':
      return 'red';
    default:
      return 'yellow';
  }
};
