import React, { useState } from 'react';
import {
  View,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  Dimensions,
} from 'react-native';
import Header from '@components/atoms/Header';
import Layout from '@components/atoms/Layout';
import { useNavigation } from '@react-navigation/native';
import { Colors, Mixins } from '@styles/index';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import { useSelector } from 'react-redux';
import { RootState } from '@store/index';
import List from '@components/atoms/List';
import Animated, {
  runOnJS,
  useAnimatedStyle,
  useSharedValue,
  withTiming,
} from 'react-native-reanimated';

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
  },
});

const SavedRecipe = () => {
  const [title, setTitle] = useState('Noped');
  const { liked, noped } = useSelector((state: RootState) => state.recipe);
  const navigation = useNavigation();
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

  const animatedStyle = useAnimatedStyle(() => {
    return {
      transform: [{ translateX: translateX.value }],
    };
  });
  return (
    <Layout>
      <Header
        title={title}
        leftIcon={<Icon name="arrow-left" color={Colors.SECONDARY} size={32} />}
        leftIconOnpress={goBack}
      />
      <Animated.View style={[styles.svWrapper, animatedStyle]}>
        <ScrollView
          contentContainerStyle={styles.sv}
          showsVerticalScrollIndicator={false}>
          <View style={styles.container}>
            {noped.map((item) => {
              return <List content={item} key={item.id} />;
            })}
          </View>
        </ScrollView>
        <ScrollView
          contentContainerStyle={styles.sv}
          showsVerticalScrollIndicator={false}>
          <View style={styles.container}>
            {liked.map((item) => {
              return <List content={item} key={item.id} />;
            })}
          </View>
        </ScrollView>
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
