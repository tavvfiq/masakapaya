import React from 'react';
import {
  createStackNavigator,
  TransitionPresets,
} from '@react-navigation/stack';
import Home from '@screens/Home';
import RecipeDetail from '@screens/RecipeDetail';
import { ParamList } from './RouteTypes';

const Stack = createStackNavigator<ParamList>();

const AppStack = () => {
  return (
    <Stack.Navigator
      initialRouteName="Home"
      screenOptions={{
        headerShown: false,
        cardOverlayEnabled: true,
      }}>
      <Stack.Screen name="Home" component={Home} />
      <Stack.Screen
        name="RecipeDetail"
        component={RecipeDetail}
        options={{ ...TransitionPresets.SlideFromRightIOS }}
      />
    </Stack.Navigator>
  );
};

export default AppStack;
