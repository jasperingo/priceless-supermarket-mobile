import { useAppContext } from '../../context';

const useCart = () => {
  const { cart } = useAppContext();
  return cart;
};

export default useCart;
