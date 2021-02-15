import React from 'react';
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { Colors, Mixins, Typography } from '@styles/index';

interface Props {
  isHome?: boolean;
  title: string;
  leftIcon?: React.ReactElement;
  rightIcon?: React.ReactElement;
  leftIconOnpress?: () => void;
  rightIconOnPress?: () => void;
}

export const HEADER_HEIGHT = Mixins.heightPercentageToDP('8%');

const styles = StyleSheet.create({
  container: {
    display: 'flex',
    flexDirection: 'row',
    height: HEADER_HEIGHT,
    backgroundColor: Colors.WHITE,
    justifyContent: 'space-between',
    alignItems: 'center',
    borderBottomWidth: 1,
    borderBottomColor: Colors.GRAY_LIGHT,
    ...Mixins.padding(0, 10, 0, 10),
  },
  titleHome: {
    fontFamily: Typography.FONT_LOGO,
    fontSize: Mixins.scaleFont(30),
    color: Colors.TEXT_COLOR_PRIMARY,
    textAlign: 'center',
    flex: 1,
  },
  title: {
    fontFamily: Typography.FONT_FAMILY_MEDIUM,
    fontSize: Mixins.scaleFont(26),
    color: Colors.TEXT_COLOR_PRIMARY,
    textAlign: 'center',
    flex: 1,
  },
});

const Header = ({
  title,
  leftIcon,
  rightIcon,
  leftIconOnpress,
  rightIconOnPress,
  isHome,
}: Props) => {
  return (
    <View style={styles.container}>
      <TouchableOpacity onPress={leftIconOnpress}>{leftIcon}</TouchableOpacity>
      <Text style={isHome ? styles.titleHome : styles.title}>{title}</Text>
      <TouchableOpacity onPress={rightIconOnPress}>
        {rightIcon}
      </TouchableOpacity>
    </View>
  );
};

export default Header;
