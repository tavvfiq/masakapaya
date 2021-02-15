import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { Colors, Mixins, Typography } from '@styles/index';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';

interface Props {
  times: string;
  servings: string;
  dificulty: string;
}

const styles = StyleSheet.create({
  additionalText: {
    fontFamily: Typography.FONT_FAMILY_REGULAR,
    fontSize: Typography.FONT_SIZE_14,
    marginLeft: Mixins.scaleSize(10),
    color: Colors.TEXT_COLOR_SECONDARY,
  },
  additionalBox: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'flex-start',
    alignItems: 'center',
    borderRadius: 5,
    ...Mixins.padding(5, 5, 5, 5),
  },
  additionalContainer: {
    flexDirection: 'row',
    display: 'flex',
    justifyContent: 'space-evenly',
    alignItems: 'center',
    alignSelf: 'center',
  },
});

const MiniDetail = ({ times, servings, dificulty }: Props) => {
  return (
    <View style={styles.additionalContainer}>
      <View style={styles.additionalBox}>
        <Icon name="clock-check-outline" size={16} color={Colors.GRAY_MEDIUM} />
        <Text style={styles.additionalText}>{times}</Text>
      </View>
      <View style={styles.additionalBox}>
        <Icon name="food" size={16} color={Colors.GRAY_MEDIUM} />
        <Text style={styles.additionalText}>{servings}</Text>
      </View>
      <View style={styles.additionalBox}>
        <Icon name="hand-okay" size={16} color={Colors.GRAY_MEDIUM} />
        <Text style={styles.additionalText}>{dificulty}</Text>
      </View>
    </View>
  );
};

export default MiniDetail;
