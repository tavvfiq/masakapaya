import { useWindowDimensions } from 'react-native';

export default function (): [
  (widthPercentage: string) => number,
  (heightPercentage: string) => number,
] {
  const { height, width } = useWindowDimensions();

  const heightPercentageToDP = (percentage: string) => {
    const percent = parseInt(percentage.replace('%', ''), 10);
    return (percent / 100) * height;
  };

  const widthPercentageToDP = (percentage: string) => {
    const percent = parseInt(percentage.replace('%', ''), 10);
    return (percent / 100) * width;
  };
  return [heightPercentageToDP, widthPercentageToDP];
}
