import React, { useEffect } from 'react';
import { View, Text, StyleSheet, Image } from 'react-native';
import {
  PanGestureHandler,
  TapGestureHandler,
  TapGestureHandlerGestureEvent,
} from 'react-native-gesture-handler';
import { Colors, Mixins, Typography } from '@styles/index';
import { RecipeType } from '@interface/index';
import Animated, {
  interpolate,
  runOnJS,
  useAnimatedGestureHandler,
  useAnimatedStyle,
  useSharedValue,
  withTiming,
} from 'react-native-reanimated';
import Stamp from '@components/atoms/Stamp';
import MiniDetail from '@components/atoms/MiniDetail';
import { useNavigation } from '@react-navigation/native';

interface Props {
  content: RecipeType;
  top: number;
  maxStack: number;
  onNoped?: (key: string) => void;
  onLiked?: (key: string) => void;
  onPress?: () => void;
}

export const CARD_HEIGHT = Mixins.heightPercentageToDP('68%');
export const CARD_WIDTH = Mixins.widthPercentageToDP('90%');

const styles = StyleSheet.create({
  outerContainer: { position: 'absolute' },
  container: {
    height: CARD_HEIGHT,
    width: CARD_WIDTH,
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'flex-start',
    backgroundColor: Colors.WHITE,
    borderWidth: 1,
    borderColor: Colors.BORDER_COLOR,
    borderRadius: 10,
  },
  thumbnail: {
    borderTopLeftRadius: 10,
    borderTopRightRadius: 10,
    width: '100%',
    height: '85%',
    resizeMode: 'cover',
  },
  textContainer: {
    flex: 1,
    flexDirection: 'column',
    justifyContent: 'center',
    ...Mixins.padding(5, 10, 5, 10),
  },
  titleText: {
    fontFamily: Typography.FONT_FAMILY_MEDIUM,
    fontSize: Typography.FONT_SIZE_20,
    color: Colors.TEXT_COLOR_PRIMARY,
  },
  stampNope: {
    position: 'absolute',
    top: 50,
    right: 20,
    transform: [{ rotateZ: '30deg' }],
  },
  stampLike: {
    position: 'absolute',
    top: 50,
    left: 20,
    transform: [{ rotateZ: '-30deg' }],
  },
});

const Card = ({ content, top, maxStack, onLiked, onNoped }: Props) => {
  const rotation = useSharedValue(0);
  const translateX = useSharedValue(0);
  const translateY = useSharedValue(0);
  const opacityBody = useSharedValue(0);
  const opacityLike = useSharedValue(0);
  const opacityNope = useSharedValue(0);
  const navigation = useNavigation();

  useEffect(() => {
    opacityBody.value = 1;
  }, []);

  const goToDetail = () => {
    navigation.navigate('RecipeDetail', { content });
  };

  useEffect(() => {
    if (content.dismissed) {
      if (content.dismissed > 0) {
        opacityLike.value = withTiming(1, { duration: 100 });
        rotation.value = withTiming((CARD_WIDTH / 2) * 0.2);
        translateX.value = withTiming(2 * CARD_WIDTH, { duration: 500 }, () => {
          onLiked && runOnJS(onLiked)(content.url);
        });
        translateY.value = withTiming((CARD_WIDTH / 2) * 0.5);
      } else if (content.dismissed < 0) {
        opacityNope.value = withTiming(1, { duration: 100 });
        rotation.value = withTiming((-CARD_WIDTH / 2) * 0.2);
        translateX.value = withTiming(
          -2 * CARD_WIDTH,
          { duration: 500 },
          () => {
            onNoped && runOnJS(onNoped)(content.url);
          },
        );
        translateY.value = withTiming((CARD_WIDTH / 2) * 0.5);
      }
    }
  }, [content.dismissed]);
  const gestureEvent = useAnimatedGestureHandler({
    onActive: ({ translationX }) => {
      opacityLike.value = interpolate(
        translationX,
        [0, CARD_WIDTH / 2],
        [0, 1],
        Animated.Extrapolate.CLAMP,
      );
      opacityNope.value = -interpolate(
        translationX,
        [0, -CARD_WIDTH / 2],
        [0, -1],
        Animated.Extrapolate.CLAMP,
      );
      rotation.value = translationX * 0.2;
      translateX.value = translationX;
      translateY.value = Math.abs(translationX) * 0.5;
    },
    onEnd: () => {
      if (Math.abs(translateX.value) > CARD_WIDTH / 2) {
        if (translateX.value > 0) {
          translateX.value = withTiming(2 * CARD_WIDTH, {}, () => {
            onLiked && runOnJS(onLiked)(content.url);
          });
        } else {
          translateX.value = withTiming(-2 * CARD_WIDTH, {}, () => {
            onNoped && runOnJS(onNoped)(content.url);
          });
        }
      } else {
        opacityLike.value = withTiming(0);
        opacityNope.value = withTiming(0);
        translateX.value = withTiming(0);
        translateY.value = withTiming(0);
        rotation.value = withTiming(0);
      }
    },
  });
  const tapEvent = useAnimatedGestureHandler<TapGestureHandlerGestureEvent>({
    onEnd: () => {
      runOnJS(goToDetail)();
    },
  });
  const animatedStyle = useAnimatedStyle(() => {
    const scale = withTiming(1 - (maxStack - top) * 0.01);
    return {
      opacity: withTiming(opacityBody.value),
      transform: [
        { translateY: translateY.value },
        { translateX: translateX.value },
        { rotateZ: `${rotation.value}deg` },
        { scale },
      ],
    };
  });
  const animateStampLike = useAnimatedStyle(() => {
    return {
      opacity: opacityLike.value,
    };
  });
  const animateStampNope = useAnimatedStyle(() => {
    return {
      opacity: opacityNope.value,
    };
  });
  const topPosition = Math.abs(maxStack - top) * 8;
  const zIndex = top + 1;
  return (
    <TapGestureHandler onGestureEvent={tapEvent}>
      <Animated.View style={styles.outerContainer}>
        <PanGestureHandler onGestureEvent={gestureEvent}>
          <Animated.View
            style={[
              styles.container,
              animatedStyle,
              { top: topPosition, zIndex },
            ]}>
            <View style={styles.container}>
              <Image
                source={{ uri: content.pic }}
                style={styles.thumbnail}
                resizeMode="cover"
              />
              <View style={styles.textContainer}>
                <Text numberOfLines={2} style={styles.titleText}>
                  {content.title}
                </Text>
                <MiniDetail
                  times={content.attr.time}
                  servings={content.attr.portion}
                  cost={content.attr.cost}
                />
              </View>
            </View>
            <Animated.View style={[styles.stampLike, animateStampLike]}>
              <Stamp label="LIKE" color={Colors.SUCCESS} />
            </Animated.View>
            <Animated.View style={[styles.stampNope, animateStampNope]}>
              <Stamp label="NOPE" color={Colors.DOABLE} />
            </Animated.View>
          </Animated.View>
        </PanGestureHandler>
      </Animated.View>
    </TapGestureHandler>
  );
};

export default Card;
