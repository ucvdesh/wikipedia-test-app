import { useAuth } from '../../contexts/AuthContext';
import React, { useState } from 'react';
import {
	View,
	Text,
	TextInput,
	TouchableOpacity,
	StyleSheet,
	Alert,
} from 'react-native';

export const LoginScreen = () => {
	const [username, setUsername] = useState('');
	const [password, setPassword] = useState('');
	const [loading, setLoading] = useState(false);

	const { login } = useAuth();

	const handleLogin = async () => {
		if (username.trim() === '' || password.trim() === '') {
			Alert.alert('Error', 'Please enter both username and password');
			return;
		}
		setLoading(true);
		await login(username, password);
		setLoading(false);
	};

	return (
		<View style={styles.container}>
			<Text style={styles.title}>Login</Text>
			<TextInput
				style={styles.input}
				placeholder="Username"
				placeholderTextColor="#999"
				value={username}
				onChangeText={setUsername}
				autoCapitalize="none"
			/>
			<TextInput
				style={styles.input}
				placeholder="Password"
				placeholderTextColor="#999"
				secureTextEntry
				value={password}
				onChangeText={setPassword}
			/>
			<TouchableOpacity
				disabled={loading}
				style={styles.button}
				onPress={handleLogin}>
				<Text style={styles.buttonText}>Log In</Text>
			</TouchableOpacity>
		</View>
	);
};

const styles = StyleSheet.create({
	container: {
		flex: 1,
		backgroundColor: '#f0f0f0',
		paddingHorizontal: 20,
		justifyContent: 'center',
		alignItems: 'center',
	},
	title: {
		fontSize: 32,
		fontWeight: 'bold',
		marginBottom: 40,
		color: '#333',
	},
	input: {
		width: '100%',
		height: 50,
		backgroundColor: '#fff',
		borderRadius: 8,
		paddingHorizontal: 16,
		fontSize: 16,
		marginBottom: 20,
		// Sombra para iOS
		shadowColor: '#000',
		shadowOffset: { width: 0, height: 2 },
		shadowOpacity: 0.1,
		shadowRadius: 4,
		// Elevación para Android
		elevation: 3,
	},
	button: {
		width: '100%',
		height: 50,
		backgroundColor: '#007bff',
		borderRadius: 8,
		justifyContent: 'center',
		alignItems: 'center',
		marginTop: 10,
	},
	buttonText: {
		color: '#fff',
		fontSize: 18,
		fontWeight: 'bold',
	},
});
