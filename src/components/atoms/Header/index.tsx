import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { Colors, Mixins, Typography } from '@styles/index';

interface Props {
  title: string;
}

const styles = StyleSheet.create({
  container: {
    display: 'flex',
    flexDirection: 'row',
    height: Mixins.scaleSize(60),
    backgroundColor: Colors.WHITE,
    alignItems: 'center',
    borderBottomWidth: 1,
    borderBottomColor: Colors.GRAY_LIGHT,
    ...Mixins.padding(0, 10, 0, 10),
  },
  title: {
    fontFamily: Typography.FONT_FAMILY_BOLD,
    fontSize: Mixins.scaleFont(20),
    textAlign: 'center',
    flex: 1,
  },
});

const Header = ({ title }: Props) => {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>{title}</Text>
    </View>
  );
};

export default Header;
