import useCart from './cartHook';

const useCartItemsCount = () => {
  const { cart } = useCart();
  return cart !== null ? cart.orderItems?.length ?? 0 : 0;
};

export default useCartItemsCount;
