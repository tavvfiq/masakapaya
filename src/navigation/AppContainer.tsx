import * as React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import RNBootSplash from 'react-native-bootsplash';
import AppStack from './AppStack';

const Stack = createStackNavigator();

export interface AppProps {}

export interface AppState {
  isSplash: boolean;
}

export default class AppContainer extends React.Component<AppProps, AppState> {
  unsubscribe: NodeJS.Timeout | undefined;
  constructor(props: AppProps) {
    super(props);
    this.state = {
      isSplash: true,
    };
  }

  componentDidMount() {
    this.unsubscribe = setTimeout(() => {
      this.setState({ isSplash: false });
    }, 2000);
  }

  public render() {
    const { isSplash } = this.state;
    if (!isSplash) {
      RNBootSplash.hide({ fade: true });
    } else {
      return null;
    }
    return (
      <NavigationContainer>
        <Stack.Navigator headerMode="none">
          <Stack.Screen name="AppStack" component={AppStack} />
        </Stack.Navigator>
      </NavigationContainer>
    );
  }
}
