import React, { useRef } from 'react';
import {
  View,
  StyleSheet,
  TouchableOpacity,
  Dimensions,
  Text,
  ListRenderItem,
} from 'react-native';
import Header from '@components/atoms/Header';
import Layout from '@components/atoms/Layout';
import { useNavigation } from '@react-navigation/native';
import { Colors, Mixins, Typography } from '@styles/index';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '@store/index';
import List, { LIST_HEIGHT } from '@components/atoms/List';
import Animated, {
  useAnimatedStyle,
  useSharedValue,
  withTiming,
} from 'react-native-reanimated';
import { FlatList } from 'react-native-gesture-handler';
import { clearSavedRecipe } from '@store/recipe/actions';
import { RecipeType } from '@interface/index';
import useResponsiveDimensions from '@hooks/useResponsiveDimensions';

const { width } = Dimensions.get('window');

const styles = StyleSheet.create({
  tabContainer: {
    position: 'absolute',
    display: 'flex',
    bottom: 0,
    flexDirection: 'row',
    justifyContent: 'space-evenly',
    alignItems: 'center',
    // borderTopWidth: 1,
    // borderColor: Colors.BORDER_COLOR,
    overflow: 'visible',
    // backgroundColor: Colors.WHITE,
  },
  tab: {
    justifyContent: 'center',
    alignSelf: 'center',
    alignItems: 'center',
    height: Mixins.heightPercentageToDP('7%'),
    flex: 1,
  },
  verticalSepator: {
    width: 1,
    height: Mixins.heightPercentageToDP('7%'),
    // backgroundColor: Colors.BORDER_COLOR,
  },
  container: {
    justifyContent: 'center',
    alignItems: 'center',
    ...Mixins.padding(20, 10, 10, 10),
  },
  svWrapper: {
    display: 'flex',
    flexDirection: 'row',
    width: Mixins.widthPercentageToDP('200%'),
    minHeight: Mixins.heightPercentageToDP('100%'),
  },
  sv: {
    width: Mixins.widthPercentageToDP('100%'),
    justifyContent: 'center',
    alignItems: 'center',
    ...Mixins.padding(20, 10, 10, 10),
  },
  emptyMessage: {
    fontFamily: Typography.FONT_FAMILY_MEDIUM,
    fontSize: Typography.FONT_SIZE_16,
  },
  tabSelector: {
    // zIndex: 10,
    position: 'absolute',
    bottom: 0,
    left: 0,
    height: Mixins.heightPercentageToDP('7%'),
    width: Mixins.widthPercentageToDP('50%'),
    backgroundColor: Colors.WHITE,
    borderLeftWidth: 1,
    borderRightWidth: 1,
    borderRightColor: Colors.BORDER_COLOR,
    borderLeftColor: Colors.BORDER_COLOR,
  },
  back: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    height: Mixins.heightPercentageToDP('7%'),
    width: Mixins.widthPercentageToDP('100%'),
    backgroundColor: Colors.GRAY,
    borderTopWidth: 1,
    borderColor: Colors.BORDER_COLOR,
  },
});

const AnimatedIcon = Animated.createAnimatedComponent(Icon);

const SavedRecipe: React.FunctionComponent = () => {
  const { liked, noped } = useSelector((state: RootState) => state.recipe);
  const navigation = useNavigation();
  const dispatch = useDispatch();
  const goBack = () => {
    navigation.goBack();
  };
  const [heightPercentageToDP] = useResponsiveDimensions();

  const translateX = useSharedValue(0);

  const selected = useRef('Noped');

  const selectLiked = () => {
    translateX.value = withTiming(-width);
    if (selected.current !== 'Liked') selected.current = 'Liked';
  };

  const selectNoped = () => {
    translateX.value = withTiming(0);
    if (selected.current !== 'Noped') selected.current = 'Noped';
  };

  const renderNoped: ListRenderItem<RecipeType> = ({ item }) => (
    <List onSwipe={onSwipe} content={item} key={item.url} />
  );

  const renderLiked: ListRenderItem<RecipeType> = ({ item }) => (
    <List onSwipe={onSwipe} content={item} key={item.url} />
  );

  const onSwipe = (key: string) => {
    dispatch(clearSavedRecipe(key, selected.current));
  };

  const animatedStyle = useAnimatedStyle(() => {
    return {
      transform: [{ translateX: translateX.value }],
    };
  });

  const tab = useAnimatedStyle(() => {
    return {
      transform: [{ translateX: -translateX.value / 2 }],
    };
  });
  return (
    <Layout>
      <Header
        title="Resep"
        leftIcon={<Icon name="chevron-left" color={Colors.BLACK} size={36} />}
        leftIconOnpress={goBack}
      />
      <Animated.View
        style={[
          styles.svWrapper,
          animatedStyle,
          { paddingBottom: heightPercentageToDP('11%') },
        ]}>
        {noped.length !== 0 ? (
          <FlatList
            maxToRenderPerBatch={5}
            bounces={true}
            data={noped}
            getItemLayout={(_, index) => ({
              length: LIST_HEIGHT,
              offset: LIST_HEIGHT + index,
              index,
            })}
            keyExtractor={(item) => item.url}
            renderItem={renderNoped}
            contentContainerStyle={styles.sv}
            showsVerticalScrollIndicator={false}
          />
        ) : (
          <View style={styles.sv}>
            <Text style={styles.emptyMessage}>
              Belum pernah swipe kiri ya?! 🤔
            </Text>
          </View>
        )}
        {liked.length !== 0 ? (
          <FlatList
            maxToRenderPerBatch={5}
            bounces={true}
            data={liked}
            getItemLayout={(_, index) => ({
              length: LIST_HEIGHT,
              offset: LIST_HEIGHT + index,
              index,
            })}
            keyExtractor={(item) => item.url}
            renderItem={renderLiked}
            contentContainerStyle={styles.sv}
            showsVerticalScrollIndicator={false}
          />
        ) : (
          <View style={styles.sv}>
            <Text style={styles.emptyMessage}>
              Belum pernah swipe kanan ya?! 🤔
            </Text>
          </View>
        )}
      </Animated.View>
      <View style={styles.tabContainer}>
        <View style={styles.back} />
        <Animated.View style={[tab, styles.tabSelector]} />
        <TouchableOpacity onPress={selectNoped} style={styles.tab}>
          <AnimatedIcon
            name="close-thick"
            size={24}
            style={{ color: Colors.DOABLE }}
          />
        </TouchableOpacity>
        <View style={styles.verticalSepator} />
        <TouchableOpacity onPress={selectLiked} style={styles.tab}>
          <AnimatedIcon name="heart" size={24} color={Colors.SUCCESS} />
        </TouchableOpacity>
      </View>
    </Layout>
  );
};

export default SavedRecipe;
