import React from 'react';
import { MainNavigator } from './navigation/MainNavigator';
import { AuthProvider } from './contexts/AuthContext';
import { NavigationContainer } from '@react-navigation/native';
import { SafeAreaView } from 'react-native';

export default function App() {
	return (
		// Puedes envolver tu aplicación en un proveedor de autenticación si es necesario

		<SafeAreaView style={{ flex: 1 }}>
			<AuthProvider>
				<NavigationContainer>
					<MainNavigator />
				</NavigationContainer>
			</AuthProvider>
		</SafeAreaView>
	);
}
