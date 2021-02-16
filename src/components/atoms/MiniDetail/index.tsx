import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { Colors, Mixins, Typography } from '@styles/index';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';

interface Props {
  times: string;
  servings: string;
  cost: string;
}

const styles = StyleSheet.create({
  additionalText: {
    fontFamily: Typography.FONT_FAMILY_REGULAR,
    fontSize: Typography.FONT_SIZE_14,
    marginLeft: Mixins.scaleSize(5),
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

const MiniDetail = ({ times, servings, cost }: Props) => {
  return (
    <View style={styles.additionalContainer}>
      <View style={styles.additionalBox}>
        <Icon name="timer-outline" size={16} color={Colors.GRAY_MEDIUM} />
        <Text style={styles.additionalText}>{times}</Text>
      </View>
      <View style={styles.additionalBox}>
        <Icon name="food" size={16} color={Colors.GRAY_MEDIUM} />
        <Text style={styles.additionalText}>{servings}</Text>
      </View>
      <View style={styles.additionalBox}>
        <Icon name="cash-multiple" size={16} color={Colors.GRAY_MEDIUM} />
        <Text style={styles.additionalText}>{cost}</Text>
      </View>
    </View>
  );
};

export default MiniDetail;
