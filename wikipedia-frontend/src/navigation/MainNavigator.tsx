import React from 'react';
import AuthNavigator from './AuthNavigator';
import AppNavigator from './AppNavigator';
import { ActivityIndicator, View } from 'react-native';
import { useAuth } from '../contexts/AuthContext';

export const MainNavigator = () => {
	const { isLoading, isAuthenticated } = useAuth();

	if (isLoading) {
		return (
			<View
				style={{
					flex: 1,
					alignItems: 'center',
					justifyContent: 'center',
					backgroundColor: 'white',
				}}>
				<ActivityIndicator size="large" />
			</View>
		);
	}

	return isAuthenticated ? <AppNavigator /> : <AuthNavigator />;
};
