import { useAppContext } from '../../context';

const useCategories = () => {
  const { categories } = useAppContext();
  return categories;
};

export default useCategories;
