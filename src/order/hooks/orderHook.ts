import { useAppContext } from '../../context';

const useOrder = () => {
  const { order } = useAppContext();
  return order;
};

export default useOrder;
