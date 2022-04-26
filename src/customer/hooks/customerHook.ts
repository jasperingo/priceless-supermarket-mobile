import { useAppContext } from '../../context';

const useCustomer = () => {
  const { customer } = useAppContext();
  return customer;
};

export default useCustomer;
