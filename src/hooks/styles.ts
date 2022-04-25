import { useColorScheme } from 'react-native';
import Colors from '../assets/colors/colors.json';
import Dimensions from '../assets/dimensions.json';

export type AppColors = typeof Colors;

export type AppDimensions = typeof Dimensions;

export const useAppColors = () => {
  const isDarkMode = useColorScheme() === 'dark';

  return isDarkMode ? Colors : Colors;
};

export const useAppDimensions = () => Dimensions;

export const useAppStyles = <T>(
  styles: (colors: AppColors, dimensions: AppDimensions) => T,
): T => {
  return styles(useAppColors(), useAppDimensions());
};
