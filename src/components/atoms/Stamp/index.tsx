import React from 'react';
import { View, Text, StyleSheet, StyleProp, ViewStyle } from 'react-native';
import { Mixins } from '@styles/index';

interface Props {
  label: string;
  color: string;
  style?: StyleProp<ViewStyle>;
}

const styles = StyleSheet.create({
  container: {
    justifyContent: 'center',
    alignItems: 'center',
    width: Mixins.scaleSize(150),
    height: Mixins.scaleSize(80),
    borderWidth: 5,
    borderRadius: 10,
  },
  label: {
    fontWeight: 'bold',
    textAlign: 'center',
    fontSize: Mixins.scaleFont(32),
  },
});

const Stamp = ({ label, color, style }: Props) => {
  return (
    <View style={[styles.container, { borderColor: color }, style]}>
      <Text style={[styles.label, { color }]}>{label}</Text>
    </View>
  );
};

export default Stamp;
