import React from 'react';
import { Image, StyleSheet, Text, View } from 'react-native';
import { RecipeType } from '@interface/index';
import { Colors, Mixins, Typography } from '@styles/index';
import {
  TapGestureHandler,
  TapGestureHandlerGestureEvent,
} from 'react-native-gesture-handler';
import Animated, {
  runOnJS,
  useAnimatedGestureHandler,
} from 'react-native-reanimated';
import { useNavigation } from '@react-navigation/native';

interface Props {
  content: RecipeType;
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    borderWidth: 1,
    borderRadius: 10,
    borderColor: Colors.BORDER_COLOR,
    height: Mixins.scaleSize(110),
    width: '100%',
    marginBottom: 40,
    ...Mixins.padding(5, 5, 5, 5),
  },
  thumbContainer: {
    top: -10,
    left: 0,
    position: 'absolute',
    backgroundColor: Colors.WHITE,
    borderRadius: 10,
    overflow: 'hidden',
    ...Mixins.boxShadow({ color: Colors.BLACK, radius: 5 }),
  },
  thumbnail: {
    height: Mixins.scaleSize(125),
    width: Mixins.scaleSize(125),
  },
  placeholder: {
    flex: 2,
    height: Mixins.scaleSize(85),
  },
  leftContent: {
    alignSelf: 'center',
    justifyContent: 'center',
    alignItems: 'flex-start',
    flex: 3,
    height: '100%',
    // width: '100%',
  },
  textContent: {
    fontFamily: Typography.FONT_FAMILY_MEDIUM,
    fontSize: Typography.FONT_SIZE_16,
  },
  detail: {
    fontFamily: Typography.FONT_FAMILY_REGULAR,
    fontSize: Typography.FONT_SIZE_14,
  },
});

const List = ({ content }: Props) => {
  const navigation = useNavigation();
  const goToDetail = () => {
    navigation.navigate('RecipeDetail', { content });
  };
  const onTapEvent = useAnimatedGestureHandler<TapGestureHandlerGestureEvent>({
    onEnd: () => {
      runOnJS(goToDetail)();
    },
  });
  return (
    <TapGestureHandler onGestureEvent={onTapEvent}>
      <Animated.View style={styles.container}>
        <View style={styles.thumbContainer}>
          <Image style={styles.thumbnail} source={{ uri: content.pic }} />
        </View>
        <View style={styles.placeholder} />
        <View style={styles.leftContent}>
          <Text numberOfLines={2} style={styles.textContent}>
            {content.title}
          </Text>
          <Text style={styles.detail}>
            {'⏲️'} {content.attr.time} {' 🍽'} {content.attr.portion}
          </Text>
          <Text style={styles.detail}>
            {'💵'} {content.attr.cost}
          </Text>
        </View>
      </Animated.View>
    </TapGestureHandler>
  );
};

export default List;
