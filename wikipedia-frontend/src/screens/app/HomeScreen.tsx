import {
	View,
	Text,
	FlatList,
	Image,
	StyleSheet,
	Pressable,
	TouchableOpacity,
	Linking,
	ActivityIndicator,
} from 'react-native';
import React, { useEffect, useState } from 'react';
import { Dropdown } from 'react-native-element-dropdown';

import DateTimePicker, {
	DateTimePickerEvent,
} from '@react-native-community/datetimepicker';

const noImageAvailable = require('../../assets/images/no-image-available.png');

const today = new Date();
const year = today.getFullYear();
const month = String(today.getMonth() + 1).padStart(2, '0');
const day = String(today.getDate()).padStart(2, '0');

const data = [
	{ label: 'English', value: 'en' },
	{ label: 'Spanish', value: 'es' },
	{ label: 'French', value: 'fr' },
	{ label: 'German', value: 'de' },
	{ label: 'Italian', value: 'it' },
	{ label: 'Portuguese', value: 'pt' },
	{ label: 'Chinese', value: 'zh' },
	{ label: 'Arabic', value: 'ar' },
	{ label: 'Bosnian', value: 'bs' },
	{ label: 'Swedish', value: 'sv' },
	{ label: 'Turkish', value: 'tr' },
	{ label: 'Ukrainian', value: 'uk' },
];

export const HomeScreen = () => {
	const [articles, setArticles] = useState<any[]>([]);
	const [loading, setLoading] = useState(true);
	const [error, setError] = useState<string | null>(null);
	const [selectedDate, setSelectedDate] = useState({ day, month, year });
	const [isCollapsed, setIsCollapsed] = useState(true);
	const [selectedLanguage, setSelectedLanguage] = useState('en');

	useEffect(() => {
		const fetchArticles = async () => {
			try {
				setLoading(true);
				const url = `http://localhost:3000/feed?year=${selectedDate.year}&month=${selectedDate.month}&day=${selectedDate.day}`;
				const response = await fetch(url, {
					headers: {
						Authorization:
							'Bearer eyJ0eXAiOiJKV1QiLCJhbGciOiJSUzI1NiJ9.eyJhdWQiOiI0NmY4ZmI1OGE2ZjQyN2M4YzFkYzExM2VjNWUzMGNjYiIsImp0aSI6ImJhYTQyYjE2MmU5MzEzMDdiYTk5NGNjZjM1ZjllOWViYjhkM2Q4OTc0OTM0ZmMwODUxZGVhYzdjZWIxOWM5YzgxOGYwZjY0NjliZjgxMGZhIiwiaWF0IjoxNzQyMDg4MjYwLjg5NzUyOSwibmJmIjoxNzQyMDg4MjYwLjg5NzUzMSwiZXhwIjozMzI5ODk5NzA2MC44OTU2MjIsInN1YiI6Ijc3ODkyOTA0IiwiaXNzIjoiaHR0cHM6Ly9tZXRhLndpa2ltZWRpYS5vcmciLCJyYXRlbGltaXQiOnsicmVxdWVzdHNfcGVyX3VuaXQiOjUwMDAsInVuaXQiOiJIT1VSIn0sInNjb3BlcyI6WyJiYXNpYyJdfQ.EhCr1GwQDNIhyiL7Un_JqUbWgi12pok2M1KlRHY0_gM5PvLGNek-QW9YgO1tM8giQzSfweiSccnu0sVXMtEEwgkXpu04Rknkl75TU0fDibscWeOVEISQbur-g58ZyyiXxhtD7l4ke-Zg1vnJ-a1OIiH5P9HhHfRyJPc_hjdp6-d7xEYxzxr0nxHJxGtKVLrcAGL0oFCTp9fW20DlJgZEuaifNa5XDEKhVTvA824FM8Leufkg37CMMl-AvjaC5l8t3wi7tpNh0JcwprbYktrgYbklbctWvBEYF4iaoWpktDbQjGTEbC0ERujgGhxeP5LD0gtnx4bt2wZJMe0fPqg8DZHaDo321ZCpNYxMaXbVFek_MWAuvhhYXd-NpJM68wuSGjtUF61M0x6XUtvNjkR0JDIMRXF0f5vz0it8vOG4j6UUZj6UghGa6GCVohxdcNgYmoFurJ2crTb6urJ9AHE1qFlZ14Zelyj8-XsL-t_8fLb9nE0RrGvnQXhKSDVqEsgJxQ2AUda8ni9FY9_rFXpao8bd5tL4g10ldfMct-ORBUU-gVcWqJszBpKgsDW7QLdmJ7K2xA68Snn1drgHQCxkoNjv1PrTTQAYuvwTPohoASV4dpYgSqalB5WMPjK4q3M-zAQZmQPAFK2iDunm3TrjsQFRyVlL2w0ulp-nMAwL3TU',
						'Api-User-Agent': 'Wikipedia Featured Content',
					},
				});
				const data = await response.json();
				setArticles(data.onthisday);
			} catch (error) {
				setError((error as Error).message);
			} finally {
				setLoading(false);
			}
		};

		void fetchArticles();
	}, [selectedDate, selectedLanguage]);

	const handleOnChange = (event: DateTimePickerEvent) => {
		const newDate = new Date(event?.nativeEvent?.timestamp);
		const day = newDate.getDate().toString().padStart(2, '0');
		const month = (newDate.getMonth() + 1).toString().padStart(2, '0');
		const year = newDate.getFullYear();
		setSelectedDate({ day, month, year });
	};

	if (loading) {
		return (
			<View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
				<ActivityIndicator size="large" />
			</View>
		);
	}
	if (error) {
		return (
			<View>
				<Text>{error}</Text>
			</View>
		);
	}

	return (
		<View style={{ flex: 1, padding: 10, position: 'relative' }}>
			<DateTimePicker
				value={
					new Date(
						+selectedDate.year,
						+selectedDate.month - 1,
						+selectedDate.day,
					)
				}
				mode={'date'}
				is24Hour={true}
				onChange={handleOnChange}
			/>
			<View style={{ zIndex: 10, marginVertical: 10 }}>
				<Dropdown
					style={[styles.dropdown]}
					placeholderStyle={styles.placeholderStyle}
					selectedTextStyle={styles.selectedTextStyle}
					inputSearchStyle={styles.inputSearchStyle}
					iconStyle={styles.iconStyle}
					data={data}
					search
					maxHeight={300}
					labelField="label"
					valueField="value"
					searchPlaceholder="Search..."
					value={selectedLanguage}
					onChange={item => {
						setSelectedLanguage(item.value);
					}}
				/>
			</View>
			<Text>
				Featured content for {selectedDate.day}/{selectedDate.month}/
				{selectedDate.year}
			</Text>
			<FlatList
				data={articles}
				renderItem={({ item }) => (
					<Pressable onPress={() => setIsCollapsed(!isCollapsed)}>
						<Text>{item.text}</Text>
						<FlatList
							data={item.pages}
							renderItem={({ item }) => (
								<View
									style={{
										borderColor: 'black',
										borderWidth: 1,
										padding: 10,
										marginVertical: 5,
									}}>
									<Image
										source={
											item.thumbnail?.source
												? { uri: item.thumbnail?.source }
												: noImageAvailable
										}
										style={{
											width: item.thumbnail?.width || 200,
											height: item.thumbnail?.height || 200,
										}}
									/>
									<TouchableOpacity
										onPress={() =>
											Linking.openURL(item?.content_urls?.mobile.page)
										}>
										<Text
											style={{
												fontSize: 16,
												fontWeight: 'bold',
												marginTop: 5,
											}}>
											{item.titles.normalized}
										</Text>
									</TouchableOpacity>
								</View>
							)}
							keyExtractor={item => item.wikibase_item}
						/>
					</Pressable>
				)}
				keyExtractor={item => item.text}
			/>
		</View>
	);
};

const styles = StyleSheet.create({
	container: {
		backgroundColor: 'white',
		padding: 16,
	},
	dropdown: {
		height: 50,
		borderColor: 'gray',
		borderWidth: 0.5,
		borderRadius: 8,
		paddingHorizontal: 8,
	},
	icon: {
		marginRight: 5,
	},
	label: {
		position: 'absolute',
		backgroundColor: 'white',
		left: 22,
		top: 8,
		zIndex: 999,
		paddingHorizontal: 8,
		fontSize: 14,
	},
	placeholderStyle: {
		fontSize: 16,
	},
	selectedTextStyle: {
		fontSize: 16,
	},
	iconStyle: {
		width: 20,
		height: 20,
	},
	inputSearchStyle: {
		height: 40,
		fontSize: 16,
	},
});
