import React, { useEffect, useRef } from 'react';
import { ActivityIndicator, StyleSheet, Text, View } from 'react-native';
import Layout from '@components/atoms/Layout';
import { Colors, Mixins, Typography } from '@styles/index';
import Card, { CARD_HEIGHT } from '@components/atoms/Card';
import Header from '@components/atoms/Header';
import { RootState } from '@store/index';
import { useDispatch, useSelector } from 'react-redux';
import { dismissFood, fetchFood } from '@store/food/actions';
import RoundedButton from '@components/atoms/RoundedButton';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';

const styles = StyleSheet.create({
  container: {
    position: 'relative',
    justifyContent: 'center',
    alignItems: 'center',
    height: CARD_HEIGHT,
    zIndex: 10,
    ...Mixins.margin(10, 0, 0, 0),
  },
  errorMessage: {
    textAlign: 'center',
    fontFamily: Typography.FONT_FAMILY_REGULAR,
    fontSize: Typography.FONT_SIZE_20,
  },
  buttonContainer: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    ...Mixins.margin(30, 0, 0, 0),
  },
  likeOrNopeButton: {
    backgroundColor: Colors.WHITE,
    alignSelf: 'center',
    alignItems: 'center',
    justifyContent: 'center',
  },
  likeOrNopeContainer: {
    backgroundColor: Colors.GRAY,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 'auto',
  },
});

const MAX_STACK = 3;

const Home = () => {
  const { foodTinder, error } = useSelector((state: RootState) => state.food);
  const page = useRef(0);
  const dispatch = useDispatch();

  useEffect(() => {
    if (foodTinder.length <= 5) {
      page.current++;
      dispatch(fetchFood(page.current));
    }
  }, [foodTinder.length]);

  const onLikedWithButton = () => {
    const key = foodTinder[foodTinder.length - 1].key;
    dispatch(dismissFood(key, undefined, 1));
  };

  const onNopedWithButton = () => {
    const key = foodTinder[foodTinder.length - 1].key;
    dispatch(dismissFood(key, undefined, -1));
  };

  const onLiked = (key: string) => {
    dispatch(dismissFood(key, true));
  };
  const onNoped = (key: string) => {
    dispatch(dismissFood(key, false));
  };

  return (
    <Layout>
      <Header title="Masak Apa Ya" />
      <View style={styles.container}>
        {error ? (
          <Text>Koneksi error</Text>
        ) : foodTinder.length === 0 ? (
          <ActivityIndicator size="large" color={Colors.GRAY_MEDIUM} />
        ) : (
          foodTinder.map((food, index) => {
            return (
              <Card
                maxStack={MAX_STACK}
                top={Math.min(index, MAX_STACK)}
                key={food.key}
                content={food}
                onLiked={onLiked}
                onNoped={onNoped}
              />
            );
          })
        )}
      </View>
      <View style={styles.buttonContainer}>
        <RoundedButton
          disabled={error}
          onPress={onNopedWithButton}
          style={styles.likeOrNopeButton}
          containerStyle={styles.likeOrNopeContainer}
          radius={Mixins.scaleSize(50)}>
          <Icon name="close-thick" size={24} color={Colors.DOABLE} />
        </RoundedButton>
        <RoundedButton
          style={styles.likeOrNopeButton}
          containerStyle={styles.likeOrNopeContainer}
          radius={Mixins.scaleSize(80)}>
          <Icon name="book-open-variant" size={40} color={Colors.WARNING} />
        </RoundedButton>
        <RoundedButton
          disabled={error}
          onPress={onLikedWithButton}
          style={styles.likeOrNopeButton}
          containerStyle={styles.likeOrNopeContainer}
          radius={Mixins.scaleSize(50)}>
          <Icon name="heart" size={24} color={Colors.SUCCESS} />
        </RoundedButton>
      </View>
    </Layout>
  );
};

export default Home;
