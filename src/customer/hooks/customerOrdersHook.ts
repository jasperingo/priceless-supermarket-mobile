import { useAppContext } from '../../context';

const useCustomerOrders = () => {
  const { customerOrders } = useAppContext();
  return customerOrders;
};

export default useCustomerOrders;
