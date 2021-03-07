import React from 'react';
import { Dimensions, Image, StyleSheet, Text, View } from 'react-native';
import { RecipeType } from '@interface/index';
import { Colors, Mixins, Typography } from '@styles/index';
import {
  PanGestureHandler,
  TapGestureHandler,
  TapGestureHandlerGestureEvent,
} from 'react-native-gesture-handler';
import Animated, {
  interpolate,
  runOnJS,
  useAnimatedGestureHandler,
  useAnimatedStyle,
  useSharedValue,
  withTiming,
} from 'react-native-reanimated';
import { useNavigation } from '@react-navigation/native';
import { snapPoint } from 'react-native-redash';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';

const { width } = Dimensions.get('window');

interface Props {
  content: RecipeType;
  onSwipe?: (key: string) => void;
}

export const LIST_HEIGHT = Mixins.scaleSize(125);
export const LIST_WIDTH = Mixins.widthPercentageToDP('90%');

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    borderWidth: 1,
    borderRadius: 10,
    width: '100%',
    borderColor: Colors.BORDER_COLOR,
    backgroundColor: Colors.WHITE,
    height: Mixins.scaleSize(110),
    marginBottom: 40,
    ...Mixins.padding(5, 5, 5, 5),
  },
  thumbContainer: {
    zIndex: 10,
    top: -10,
    left: 0,
    position: 'absolute',
    backgroundColor: Colors.WHITE,
    borderRadius: 10,
    overflow: 'hidden',
    height: Mixins.scaleSize(125),
    width: Mixins.scaleSize(125),
    ...Mixins.boxShadow({ color: Colors.BLACK, radius: 5 }),
  },
  thumbnail: {
    resizeMode: 'cover',
    ...StyleSheet.absoluteFillObject,
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
  clearContainer: {
    position: 'absolute',
    top: 0,
    left: 0,
    width: '100%',
    height: Mixins.scaleSize(110),
    alignItems: 'center',
    justifyContent: 'center',
    display: 'flex',
    flexDirection: 'row',
    borderRadius: 10,
    borderColor: Colors.BORDER_COLOR,
    backgroundColor: Colors.WHITE,
    borderWidth: 1,
  },
  clearIcon: {
    fontSize: Typography.FONT_SIZE_30,
  },
});

const List = ({ content, onSwipe }: Props) => {
  const navigation = useNavigation();
  const translateX = useSharedValue(0);
  const goToDetail = () => {
    navigation.navigate('RecipeDetail', { content });
  };

  const opacity = useSharedValue(1);

  const onTapEvent = useAnimatedGestureHandler<TapGestureHandlerGestureEvent>({
    onEnd: () => {
      runOnJS(goToDetail)();
    },
  });

  const onGestureEvent = useAnimatedGestureHandler({
    onActive: ({ translationX }) => {
      translateX.value = interpolate(
        translationX,
        [-width, 0, width],
        [-50, 0, 250],
        Animated.Extrapolate.CLAMP,
      );
    },
    onEnd: ({ velocityX }) => {
      const snap = snapPoint(translateX.value, velocityX, [0, width]);
      translateX.value = withTiming(snap, {}, () => {
        if (onSwipe && snap === width) {
          opacity.value = withTiming(0, {}, () => {
            runOnJS(onSwipe)(content.url);
          });
        }
      });
    },
  });

  const swipeable = useAnimatedStyle(() => {
    return {
      transform: [{ translateX: translateX.value }],
    };
  });
  const fade = useAnimatedStyle(() => {
    return {
      opacity: opacity.value,
    };
  });

  return (
    <>
      <Animated.View style={[styles.clearContainer, fade]}>
        <Icon name="broom" size={40} color={Colors.ALERT} />
      </Animated.View>
      <Animated.View style={[styles.container, swipeable]}>
        <PanGestureHandler onGestureEvent={onGestureEvent}>
          <Animated.View style={styles.thumbContainer}>
            <Image style={styles.thumbnail} source={{ uri: content.pic }} />
          </Animated.View>
        </PanGestureHandler>
        <View style={styles.placeholder} />
        <TapGestureHandler onGestureEvent={onTapEvent}>
          <Animated.View style={styles.leftContent}>
            <Text numberOfLines={2} style={styles.textContent}>
              {content.title}
            </Text>
            <Text style={styles.detail}>
              {'⏲️'} {content.attr.time} {' 🍽'} {content.attr.portion}
            </Text>
            <Text style={styles.detail}>
              {'💵'} {content.attr.cost}
            </Text>
          </Animated.View>
        </TapGestureHandler>
      </Animated.View>
    </>
  );
};

export default List;
