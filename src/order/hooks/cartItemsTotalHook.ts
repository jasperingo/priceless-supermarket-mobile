import useCart from './cartHook';

const useCartItemsTotal = () => {
  const { cart } = useCart();
  return (
    cart?.orderItems?.reduce(
      (p, c) => p + (c.product?.price ?? 0) * (c.quantity ?? 0),
      0,
    ) ?? 0
  );
};

export default useCartItemsTotal;
