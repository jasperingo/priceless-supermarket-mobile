export const useMoneyFormat = () => (amount: number) =>
  `NGN ${amount?.toFixed(2)}`;

export const useDateFormat = () => (date: Date) => date.toUTCString();
