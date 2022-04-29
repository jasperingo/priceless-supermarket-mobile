import { useAppContext } from '../../context';

const useProductsSearch = () => {
  const { productsSearch } = useAppContext();
  return productsSearch;
};

export default useProductsSearch;
