import { useAppContext } from '../../context';

const useProducts = () => {
  const { products } = useAppContext();
  return products;
};

export default useProducts;
