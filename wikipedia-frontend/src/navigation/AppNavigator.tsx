// src/navigation/AppNavigator.tsx
import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { HomeScreen } from '../screens/app';

export type AppStackParamList = {
	Home: undefined;
	Profile: undefined;
};

const AppStack = createNativeStackNavigator<AppStackParamList>();

export default function AppNavigator() {
	return (
		<AppStack.Navigator initialRouteName="Home">
			<AppStack.Screen
				name="Home"
				component={HomeScreen}
				options={{
					header: () => null,
				}}
			/>
		</AppStack.Navigator>
	);
}
