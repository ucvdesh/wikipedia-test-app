// src/navigation/AuthNavigator.tsx
import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { LoginScreen } from '../screens/auth';

export type AuthStackParamList = {
	Login: undefined;
	Register: undefined;
};

const AuthStack = createNativeStackNavigator<AuthStackParamList>();

export default function AuthNavigator() {
	return (
		<AuthStack.Navigator initialRouteName="Login">
			<AuthStack.Screen
				name="Login"
				component={LoginScreen}
				options={{
					header: () => null,
				}}
			/>
		</AuthStack.Navigator>
	);
}
