import React, { useState } from 'react';
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
  runOnJS,
  useAnimatedStyle,
  useSharedValue,
  withTiming,
} from 'react-native-reanimated';
import { FlatList } from 'react-native-gesture-handler';
import { clearSavedRecipe } from '@store/recipe/actions';
import { RecipeType } from '@interface/index';

const { width } = Dimensions.get('window');

const styles = StyleSheet.create({
  tabContainer: {
    position: 'absolute',
    display: 'flex',
    bottom: 0,
    flexDirection: 'row',
    justifyContent: 'space-evenly',
    alignItems: 'center',
    borderTopWidth: 1,
    borderColor: Colors.BORDER_COLOR,
    backgroundColor: Colors.WHITE,
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
    backgroundColor: Colors.BORDER_COLOR,
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
    paddingBottom: Mixins.heightPercentageToDP('11%'),
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
});

const SavedRecipe = () => {
  const [title, setTitle] = useState('Noped');
  const { liked, noped } = useSelector((state: RootState) => state.recipe);
  const navigation = useNavigation();
  const dispatch = useDispatch();
  const goBack = () => {
    navigation.goBack();
  };
  const translateX = useSharedValue(0);

  const selectLiked = () => {
    translateX.value = withTiming(-width, {}, () => {
      if (title !== 'Liked') runOnJS(setTitle)('Liked');
    });
  };

  const selectNoped = () => {
    translateX.value = withTiming(0, {}, () => {
      if (title !== 'Noped') runOnJS(setTitle)('Noped');
    });
  };

  const renderNoped: ListRenderItem<RecipeType> = ({ item }) => (
    <List onSwipe={onSwipe} content={item} key={item.url} />
  );

  const renderLiked: ListRenderItem<RecipeType> = ({ item }) => (
    <List onSwipe={onSwipe} content={item} key={item.url} />
  );

  const onSwipe = (key: string) => {
    dispatch(clearSavedRecipe(key, title));
  };

  const animatedStyle = useAnimatedStyle(() => {
    return {
      transform: [{ translateX: translateX.value }],
    };
  });
  return (
    <Layout>
      <Header
        title={title}
        leftIcon={<Icon name="chevron-left" color={Colors.BLACK} size={36} />}
        leftIconOnpress={goBack}
      />
      <Animated.View style={[styles.svWrapper, animatedStyle]}>
        {noped.length !== 0 ? (
          <FlatList
            bounces
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
            bounces
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
        <TouchableOpacity onPress={selectNoped} style={styles.tab}>
          <Icon name="close-thick" size={24} color={Colors.DOABLE} />
        </TouchableOpacity>
        <View style={styles.verticalSepator} />
        <TouchableOpacity onPress={selectLiked} style={styles.tab}>
          <Icon name="heart" size={24} color={Colors.SUCCESS} />
        </TouchableOpacity>
      </View>
    </Layout>
  );
};

export default SavedRecipe;
