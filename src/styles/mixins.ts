import { Dimensions, PixelRatio } from 'react-native';
import { BLACK } from './colors';

const WINDOW_WIDTH = Dimensions.get('window').width;
const WINDOW_HEIGHT = Dimensions.get('window').height;
const guidelineBaseWidth = 360; // Mockup BaseWidth

export const scaleSize = (size: number) =>
  (WINDOW_WIDTH / guidelineBaseWidth) * size;

export const scaleFont = (size: number) => size * PixelRatio.getFontScale();

export const heightPercentageToDP = (percentage: string) => {
  const percent = parseInt(percentage.replace('%', ''), 10);
  return (percent / 100) * WINDOW_HEIGHT;
};

export const widthPercentageToDP = (percentage: string) => {
  const percent = parseInt(percentage.replace('%', ''), 10);
  return (percent / 100) * WINDOW_WIDTH;
};

function dimensions(
  top: number,
  right = top,
  bottom = top,
  left = right,
  property: string,
) {
  let styles: { [key: string]: number } = {};

  styles[`${property}Top`] = top;
  styles[`${property}Right`] = right;
  styles[`${property}Bottom`] = bottom;
  styles[`${property}Left`] = left;

  return styles;
}

export function margin(
  top: number,
  right: number,
  bottom: number,
  left: number,
) {
  return dimensions(top, right, bottom, left, 'margin');
}

export function padding(
  top: number,
  right: number,
  bottom: number,
  left: number,
) {
  return dimensions(top, right, bottom, left, 'padding');
}

export function boxShadow({
  color = BLACK,
  offset = { height: 2, width: 2 },
  radius = 8,
  opacity = 0.2,
}) {
  return {
    shadowColor: color,
    shadowOffset: offset,
    shadowOpacity: opacity,
    shadowRadius: radius,
    elevation: radius,
  };
}
