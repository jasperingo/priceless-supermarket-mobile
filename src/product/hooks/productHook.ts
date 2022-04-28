import { useAppContext } from '../../context';

const useProduct = () => {
  const { product } = useAppContext();
  return product;
};

export default useProduct;
