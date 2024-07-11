export default (inputObject: object) => {
  const orderDetails = [];

  for (let i = 0; i < Object.keys(inputObject).length / 2; i++) {
    const idKey = `id${i}`;
    const priceKey = `price${i}`;
    const descriptionKey = `description${i}`;

    const id = inputObject[idKey];
    const price = inputObject[priceKey];
    const description = inputObject[descriptionKey];

    const orderDetail = {
      id: id || 0,
      price: price || 0,
      description: description || '',
    };

    orderDetails.push(orderDetail as never);
  }

  return orderDetails;
};
