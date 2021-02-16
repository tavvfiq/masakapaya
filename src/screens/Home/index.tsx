import React, { useEffect, useRef } from 'react';
import { ActivityIndicator, StyleSheet, Text, View } from 'react-native';
import Layout from '@components/atoms/Layout';
import { Colors, Mixins, Typography } from '@styles/index';
import Card, { CARD_HEIGHT } from '@components/molecules/Card';
import Header from '@components/atoms/Header';
import { RootState } from '@store/index';
import { useDispatch, useSelector } from 'react-redux';
import { dismissRecipe, fetchRecipe } from '@store/recipe/actions';
import RoundedButton from '@components/atoms/RoundedButton';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import HeaderIcon from 'react-native-vector-icons/Ionicons';
import { generateRandomPage } from '@utils/math';
import { useNavigation } from '@react-navigation/native';

const styles = StyleSheet.create({
  container: {
    position: 'relative',
    justifyContent: 'center',
    alignItems: 'center',
    height: CARD_HEIGHT,
    zIndex: 5,
    ...Mixins.margin(10, 0, 0, 0),
  },
  overlay: {
    position: 'absolute',
    zIndex: 6,
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 10,
    width: Mixins.scaleSize(150),
    height: Mixins.scaleSize(40),
  },
  errorMessage: {
    textAlign: 'center',
    fontFamily: Typography.FONT_FAMILY_MEDIUM,
    fontSize: Typography.FONT_SIZE_16,
    color: Colors.TEXT_COLOR_PRIMARY,
  },
  refreshButton: {
    justifyContent: 'center',
    alignItems: 'center',
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
  activityIndicator: {
    position: 'absolute',
    zIndex: 6,
  },
});

const MAX_STACK = 3;

const Home = () => {
  const { recipeTinder, error, loading } = useSelector(
    (state: RootState) => state.recipe,
  );
  const page = useRef(0);
  const dispatch = useDispatch();
  const navigation = useNavigation();

  useEffect(() => {
    if (recipeTinder.length <= 5 && !loading) {
      page.current = generateRandomPage();
      dispatch(fetchRecipe(page.current));
    }
  }, [recipeTinder.length]);

  const onLikedWithButton = () => {
    const key = recipeTinder[recipeTinder.length - 1].url;
    dispatch(dismissRecipe(key, undefined, 1));
  };

  const onNopedWithButton = () => {
    const key = recipeTinder[recipeTinder.length - 1].url;
    dispatch(dismissRecipe(key, undefined, -1));
  };

  const onLiked = (key: string) => {
    dispatch(dismissRecipe(key, true));
  };
  const onNoped = (key: string) => {
    dispatch(dismissRecipe(key, false));
  };

  const onRefresh = () => {
    dispatch(fetchRecipe(page.current));
  };

  const goToSettings = () => {
    navigation.navigate('Settings');
  };

  const goToSavedRecipe = () => {
    navigation.navigate('SavedRecipe');
  };

  const isConnectionError = error && !loading && recipeTinder.length === 0;
  const isFetching = recipeTinder.length === 0 && loading;
  const isRetrying = error && loading;
  const isNotEmpty = recipeTinder.length !== 0;
  return (
    <Layout>
      <Header
        isHome
        title="recipinder"
        leftIconOnpress={goToSettings}
        leftIcon={
          <HeaderIcon name="cog-outline" size={30} color={Colors.SECONDARY} />
        }
        rightIconOnPress={goToSavedRecipe}
        rightIcon={
          <HeaderIcon name="list-outline" size={30} color={Colors.SECONDARY} />
        }
      />
      <View style={styles.container}>
        {(isFetching || isRetrying) && (
          <ActivityIndicator
            style={styles.activityIndicator}
            size="large"
            color={Colors.GRAY_MEDIUM}
          />
        )}
        {isConnectionError && (
          <View style={styles.overlay}>
            <Text style={styles.errorMessage}>Server error</Text>
            <RoundedButton
              onPress={onRefresh}
              radius={32}
              containerStyle={styles.refreshButton}>
              <Icon name="refresh" size={32} color={Colors.SECONDARY} />
            </RoundedButton>
          </View>
        )}
        {isNotEmpty &&
          recipeTinder.map((recipe, index) => {
            return (
              <Card
                maxStack={MAX_STACK}
                top={Math.min(index, MAX_STACK)}
                key={recipe.url}
                content={recipe}
                onLiked={onLiked}
                onNoped={onNoped}
              />
            );
          })}
      </View>
      <View style={styles.buttonContainer}>
        <RoundedButton
          disabled={error}
          onPress={onNopedWithButton}
          style={styles.likeOrNopeButton}
          containerStyle={styles.likeOrNopeContainer}
          radius={Mixins.heightPercentageToDP('7%')}>
          <Icon name="close-thick" size={24} color={Colors.DOABLE} />
        </RoundedButton>
        <RoundedButton
          style={styles.likeOrNopeButton}
          containerStyle={styles.likeOrNopeContainer}
          radius={Mixins.heightPercentageToDP('10%')}>
          <Icon name="book-open-variant" size={40} color={Colors.WARNING} />
        </RoundedButton>
        <RoundedButton
          disabled={error}
          onPress={onLikedWithButton}
          style={styles.likeOrNopeButton}
          containerStyle={styles.likeOrNopeContainer}
          radius={Mixins.heightPercentageToDP('7%')}>
          <Icon name="heart" size={24} color={Colors.SUCCESS} />
        </RoundedButton>
      </View>
    </Layout>
  );
};

export default Home;
