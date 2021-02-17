import React from 'react';
import { createNativeStackNavigator } from 'react-native-screens/native-stack';
import Home from '@screens/Home';
import RecipeDetail from '@screens/RecipeDetail';
import { ParamList } from './RouteTypes';
import Settings from '@screens/Settings';
import SavedRecipe from '@screens/SavedRecipe';

const Stack = createNativeStackNavigator<ParamList>();

const AppStack = () => {
  return (
    <Stack.Navigator
      initialRouteName="Home"
      screenOptions={{
        headerShown: false,
      }}>
      <Stack.Screen name="Home" component={Home} />
      <Stack.Screen
        name="RecipeDetail"
        component={RecipeDetail}
        options={{ stackAnimation: 'slide_from_right' }}
      />
      <Stack.Screen
        name="Settings"
        component={Settings}
        options={{ stackAnimation: 'slide_from_left' }}
      />
      <Stack.Screen
        name="SavedRecipe"
        component={SavedRecipe}
        options={{ stackAnimation: 'slide_from_right' }}
      />
    </Stack.Navigator>
  );
};

export default AppStack;
