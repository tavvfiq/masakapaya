import React from 'react';
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { Colors, Mixins, Typography } from '@styles/index';
import Icon from 'react-native-vector-icons/Ionicons';

interface Props {
  title: string;
}

const styles = StyleSheet.create({
  container: {
    display: 'flex',
    flexDirection: 'row',
    height: Mixins.heightPercentageToDP('8%'),
    backgroundColor: Colors.WHITE,
    justifyContent: 'space-between',
    alignItems: 'center',
    borderBottomWidth: 1,
    borderBottomColor: Colors.GRAY_LIGHT,
    ...Mixins.padding(0, 10, 0, 10),
  },
  title: {
    fontFamily: Typography.FONT_LOGO,
    fontSize: Mixins.scaleFont(30),
    color: Colors.TEXT_COLOR_PRIMARY,
    textAlign: 'center',
    flex: 1,
  },
});

const Header = ({ title }: Props) => {
  return (
    <View style={styles.container}>
      <TouchableOpacity>
        <Icon name="cog-outline" size={30} color={Colors.SECONDARY} />
      </TouchableOpacity>
      <Text style={styles.title}>{title}</Text>
      <TouchableOpacity>
        <Icon name="list-outline" size={30} color={Colors.SECONDARY} />
      </TouchableOpacity>
    </View>
  );
};

export default Header;
