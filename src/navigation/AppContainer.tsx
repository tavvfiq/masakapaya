import * as React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import AppStack from "./AppStack";

const Stack = createStackNavigator();

export interface AppProps {}

export interface AppState {}

export default class AppContainer extends React.Component<AppProps, AppState> {
	constructor(props: AppProps) {
		super(props);
		this.state = {};
	}

	public render() {
		return (
			<NavigationContainer>
				<Stack.Navigator headerMode="none">
					<Stack.Screen name="AppStack" component={AppStack} />
				</Stack.Navigator>
			</NavigationContainer>
		);
	}
}
