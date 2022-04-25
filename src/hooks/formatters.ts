export const useMoneyFormat = () => (amount: number) =>
  `NGN ${amount?.toFixed(2)}`;
