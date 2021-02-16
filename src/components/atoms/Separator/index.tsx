import React from 'react';
import { View, StyleSheet, ViewStyle, StyleProp } from 'react-native';
import { Colors, Mixins } from '@styles/index';

interface Props {
  length: number | string;
  vertical?: boolean;
  color?: string;
  style?: StyleProp<ViewStyle>;
}

const styles = StyleSheet.create({
  separator: {
    backgroundColor: Colors.BORDER_COLOR,
    ...Mixins.margin(10, 0, 5, 0),
  },
});

const Separator = ({ length, vertical, color, style }: Props) => {
  const height = vertical ? length : 1;
  const width = vertical ? 1 : length;
  return (
    <View
      style={[
        styles.separator,
        style,
        { backgroundColor: color, width, height },
      ]}
    />
  );
};

export default Separator;
