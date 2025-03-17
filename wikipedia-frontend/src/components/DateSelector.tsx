import React from 'react';
import DateTimePicker, {
	DateTimePickerEvent,
} from '@react-native-community/datetimepicker';
import { StyleSheet, Text, View } from 'react-native';

interface DateSelectorProps {
	selectedDate: { day: string; month: string; year: string };
	onChange: (event: DateTimePickerEvent, date?: Date) => void;
}

export const DateSelector: React.FC<DateSelectorProps> = ({
	selectedDate,
	onChange,
}) => {
	const dateValue = new Date(
		+selectedDate.year,
		+selectedDate.month - 1,
		+selectedDate.day,
	);

	const handleChange = (event: DateTimePickerEvent, date?: Date) => {
		onChange(event, date);
	};

	return (
		<View style={{}}>
			<Text>Date:</Text>
			<View style={styles.container}>
				<DateTimePicker
					value={dateValue}
					mode="date"
					is24Hour={true}
					themeVariant="light"
					textColor="#000"
					accentColor="#000"
					maximumDate={new Date()}
					display="default"
					onChange={handleChange}
				/>
			</View>
		</View>
	);
};

const styles = StyleSheet.create({
	container: {
		zIndex: 10,
		marginBottom: 10,
		marginTop: 5,
		height: 50,
		borderColor: 'gray',
		borderWidth: 0.5,
		borderRadius: 8,
		paddingRight: 10,
		justifyContent: 'center',
	},
});
