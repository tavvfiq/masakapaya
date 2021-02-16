import React from 'react';
import {
  View,
  Text,
  ScrollView,
  StyleSheet,
  Image,
  ActivityIndicator,
  NativeSyntheticEvent,
  NativeScrollEvent,
} from 'react-native';
import { RouteProp, useNavigation, useRoute } from '@react-navigation/native';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import { Colors, Mixins, Typography } from '@styles/index';
import MiniDetail from '@components/atoms/MiniDetail';
import { ParamList } from '@navigation/RouteTypes';
import Header, { HEADER_HEIGHT } from '@components/atoms/Header';
import useRecipeDetail from '@hooks/useRecipeDetail';
import Animated, {
  interpolate,
  useAnimatedStyle,
  useSharedValue,
} from 'react-native-reanimated';
import RoundedButton from '@components/atoms/RoundedButton';
import Separator from '@components/atoms/Separator';

const styles = StyleSheet.create({
  outerContainer: {
    backgroundColor: Colors.WHITE,
  },
  titleText: {
    fontFamily: Typography.FONT_FAMILY_MEDIUM,
    fontSize: Typography.FONT_SIZE_20,
    color: Colors.TEXT_COLOR_PRIMARY,
  },
  contentContainer: {
    display: 'flex',
    justifyContent: 'flex-start',
    alignItems: 'center',
    flexDirection: 'column',
    height: '100%',
    backgroundColor: Colors.WHITE,
    ...Mixins.padding(10, 10, 5, 10),
  },
  authorContainer: {
    flexDirection: 'column',
    justifyContent: 'center',
  },
  author: {
    fontFamily: Typography.FONT_FAMILY_MEDIUM,
    fontSize: Typography.FONT_SIZE_16,
    color: Colors.TEXT_COLOR_PRIMARY,
    textAlign: 'center',
  },
  publishedDate: {
    fontFamily: Typography.FONT_FAMILY_REGULAR,
    fontSize: Typography.FONT_SIZE_16,
    color: Colors.TEXT_COLOR_SECONDARY,
    textAlign: 'center',
  },
  thumbnail: {
    height: Mixins.heightPercentageToDP('60%'),
    width: '100%',
    resizeMode: 'cover',
    borderRadius: 10,
    borderWidth: 1,
    borderColor: Colors.BORDER_COLOR,
  },
  subTitle: {
    fontFamily: Typography.FONT_FAMILY_MEDIUM,
    fontSize: Typography.FONT_SIZE_18,
    color: Colors.TEXT_COLOR_PRIMARY,
    alignSelf: 'center',
    ...Mixins.margin(4, 0, 4, 0),
  },
  desc: {
    fontFamily: Typography.FONT_FAMILY_REGULAR,
    textAlign: 'justify',
  },
  footer: {
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: Colors.WHITE,
    height: Mixins.heightPercentageToDP('25%'),
  },
  errorMessage: {
    fontFamily: Typography.FONT_FAMILY_MEDIUM,
  },
  ingredientsList: {
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    width: '100%',
    marginBottom: 5,
  },
  itemContainer: {
    borderRadius: 10,
    borderWidth: 1,
    borderColor: Colors.BORDER_COLOR,
    marginBottom: 5,
    backgroundColor: Colors.WHITE,
    ...Mixins.padding(5, 5, 5, 5),
  },
  item: {
    fontFamily: Typography.FONT_FAMILY_REGULAR,
    alignSelf: 'flex-start',
    textAlign: 'left',
  },
  refreshButton: {
    justifyContent: 'center',
    alignItems: 'center',
  },
});

const RecipeDetail = () => {
  const navigation = useNavigation();
  const route = useRoute<RouteProp<ParamList, 'RecipeDetail'>>();
  const { content } = route.params;
  const scrollY = useSharedValue(0);
  const translateY = useSharedValue(0);

  const [loading, error, recipeDetail, reload] = useRecipeDetail(content.url);

  const goBack = () => {
    navigation.goBack();
  };

  const onScrollEvent = ({
    nativeEvent,
  }: NativeSyntheticEvent<NativeScrollEvent>) => {
    const { velocity, contentOffset } = nativeEvent;
    scrollY.value = contentOffset.y - HEADER_HEIGHT;
    if (velocity) {
      if (velocity.y < 0) {
        translateY.value = interpolate(
          scrollY.value,
          [-HEADER_HEIGHT, scrollY.value],
          [0, scrollY.value],
          Animated.Extrapolate.CLAMP,
        );
      } else if (velocity.y > 0) {
        translateY.value = interpolate(
          scrollY.value,
          [-HEADER_HEIGHT, HEADER_HEIGHT],
          [0, scrollY.value],
          Animated.Extrapolate.CLAMP,
        );
      }
    }
  };

  const animateHeader = useAnimatedStyle(() => {
    return {
      zIndex: 10,
      width: '100%',
      // transform: [{ translateY: translateY.value }],
    };
  });

  return (
    <>
      <ScrollView
        stickyHeaderIndices={[0]}
        onScroll={onScrollEvent}
        scrollEventThrottle={16}
        contentContainerStyle={styles.outerContainer}
        showsVerticalScrollIndicator={false}>
        <Animated.View style={animateHeader}>
          <Header
            title="Detail"
            leftIcon={
              <Icon name="arrow-left" color={Colors.SECONDARY} size={32} />
            }
            leftIconOnpress={goBack}
          />
        </Animated.View>
        <View style={styles.contentContainer}>
          <Image style={styles.thumbnail} source={{ uri: content.pic }} />
          <Text style={styles.titleText}>{content.title}</Text>
          <MiniDetail
            times={content.attr.time}
            servings={content.attr.portion}
            cost={content.attr.cost}
          />
          {recipeDetail ? (
            <>
              <Separator length="80%" color={Colors.BORDER_COLOR} />
              <Text style={styles.desc}>{recipeDetail?.desc}</Text>
              <Separator length="40%" color={Colors.BORDER_COLOR} />
              <Text style={styles.subTitle}>🥗 Bahan-bahan</Text>
              <View style={styles.ingredientsList}>
                {recipeDetail.ingredients.map((item, index) => {
                  return (
                    <View key={index} style={styles.itemContainer}>
                      <Text style={styles.item}>✳️ {item}</Text>
                    </View>
                  );
                })}
              </View>
              <Text style={styles.subTitle}>👨‍🍳 Cara membuat</Text>
              <View style={styles.ingredientsList}>
                {recipeDetail.steps.map((item, index) => {
                  return (
                    <View key={index} style={styles.itemContainer}>
                      <Text style={styles.item}>
                        🍳 {index + 1}. {item}
                      </Text>
                    </View>
                  );
                })}
              </View>
            </>
          ) : (
            <View style={styles.footer}>
              {loading && !error ? (
                <ActivityIndicator size="small" color={Colors.GRAY_MEDIUM} />
              ) : (
                <>
                  <Text style={styles.errorMessage}>Server error</Text>
                  <RoundedButton
                    onPress={reload}
                    radius={32}
                    containerStyle={styles.refreshButton}>
                    <Icon name="refresh" size={32} color={Colors.SECONDARY} />
                  </RoundedButton>
                </>
              )}
            </View>
          )}
        </View>
      </ScrollView>
    </>
  );
};

export default RecipeDetail;
