export default (amount: number) => {
  return new Intl.NumberFormat('id-ID', {
    style: 'currency',
    currency: 'IDR',
  })
    .format(amount)
    .replace('Rp', 'IDR');
};
