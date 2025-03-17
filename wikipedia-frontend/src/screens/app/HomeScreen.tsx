import React, { useCallback, useEffect, useState } from 'react';
import {
	View,
	Text,
	FlatList,
	StyleSheet,
	ActivityIndicator,
} from 'react-native';
import { DateSelector, LanguageSelector, ArticleCards } from '../../components';
import { fetchArticles } from '../../api';

const today = new Date();
const initialDate = {
	year: today.getFullYear().toString(),
	month: String(today.getMonth() + 1).padStart(2, '0'),
	day: String(today.getDate()).padStart(2, '0'),
};

export const HomeScreen = () => {
	const [articles, setArticles] = useState<any[]>([]);
	const [loading, setLoading] = useState(true);
	const [error, setError] = useState<string | null>(null);
	const [selectedDate, setSelectedDate] = useState(initialDate);
	const [selectedLanguage, setSelectedLanguage] = useState('en');

	const fetchData = useCallback(async () => {
		try {
			setLoading(true);
			const data = await fetchArticles(selectedDate, selectedLanguage);
			setArticles(data);
		} catch (err) {
			setError((err as Error).message);
		} finally {
			setLoading(false);
		}
	}, [selectedDate, selectedLanguage]);

	useEffect(() => {
		fetchData();
	}, [fetchData]);

	const handleDateChange = (event: any) => {
		const newDate = new Date(event?.nativeEvent?.timestamp);
		const day = newDate.getDate().toString().padStart(2, '0');
		const month = (newDate.getMonth() + 1).toString().padStart(2, '0');
		const year = newDate.getFullYear().toString();
		setSelectedDate({ day, month, year });
	};

	return (
		<View style={styles.container}>
			<View
				style={{
					flexDirection: 'row',
					justifyContent: 'space-between',
					gap: 10,
				}}>
				<DateSelector selectedDate={selectedDate} onChange={handleDateChange} />
				<LanguageSelector
					selectedLanguage={selectedLanguage}
					onChange={setSelectedLanguage}
				/>
			</View>
			<Text style={styles.info}>
				Featured content for {selectedDate.day}/{selectedDate.month}/
				{selectedDate.year}
			</Text>
			{loading ? (
				<View
					style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
					<ActivityIndicator size="large" />
				</View>
			) : (
				<FlatList
					data={articles}
					renderItem={({ item }) => <ArticleCards article={item} />}
					onRefresh={fetchData}
					refreshing={loading}
					keyExtractor={item => item.text}
				/>
			)}
			{error && (
				<View style={styles.center}>
					<Text>{error}</Text>
				</View>
			)}
		</View>
	);
};

const styles = StyleSheet.create({
	container: {
		flex: 1,
		padding: 10,
	},
	center: {
		flex: 1,
		alignItems: 'center',
		justifyContent: 'center',
	},
	info: {
		fontSize: 16,
		marginVertical: 10,
	},
});
