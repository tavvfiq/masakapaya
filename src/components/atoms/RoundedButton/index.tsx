import React from 'react';
import { View, TouchableOpacity, ViewStyle, StyleProp } from 'react-native';

interface Props {
  radius: number;
  children?: React.ReactChild;
  onPress?: () => void;
  style?: StyleProp<ViewStyle>;
  containerStyle?: StyleProp<ViewStyle>;
  disabled?: boolean;
}

const RoundedButton = ({
  radius,
  children,
  onPress,
  style,
  containerStyle,
  disabled,
}: Props) => {
  const containerSize = radius + 20;
  return (
    <TouchableOpacity
      disabled={disabled}
      style={[
        {
          height: containerSize,
          width: containerSize,
          borderRadius: containerSize / 2,
        },
        containerStyle,
      ]}
      onPress={onPress}>
      <View
        style={[
          { height: radius, width: radius, borderRadius: radius / 2 },
          style,
        ]}>
        {children}
      </View>
    </TouchableOpacity>
  );
};

export default RoundedButton;
