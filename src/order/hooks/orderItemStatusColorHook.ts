import { useAppColors } from '../../hooks/styles';
import { OrderItemStatus } from '../models/OrderItem';

const useOrderItemStatusColor = () => {
  const colors = useAppColors();

  return (status?: OrderItemStatus) => {
    switch (status) {
      case OrderItemStatus.DECLINED:
      case OrderItemStatus.CANCELLED:
        return { backgroundColor: colors.colorError };
      case OrderItemStatus.FULFILLED:
        return { backgroundColor: colors.colorPrimary };
      default:
        return { backgroundColor: colors.colorGray };
    }
  };
};

export default useOrderItemStatusColor;
