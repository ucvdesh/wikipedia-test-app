import { supportedLanguajes } from '../constants/utils';
import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { Dropdown } from 'react-native-element-dropdown';

interface LanguageSelectorProps {
	selectedLanguage: string;
	onChange: (value: string) => void;
}

export const LanguageSelector: React.FC<LanguageSelectorProps> = ({
	selectedLanguage,
	onChange,
}) => {
	return (
		<View style={styles.container}>
			<Text>Language:</Text>
			<Dropdown
				style={styles.dropdown}
				placeholderStyle={styles.placeholderStyle}
				selectedTextStyle={styles.selectedTextStyle}
				inputSearchStyle={styles.inputSearchStyle}
				iconStyle={styles.iconStyle}
				data={supportedLanguajes}
				search
				maxHeight={300}
				labelField="label"
				valueField="value"
				searchPlaceholder="Search..."
				value={selectedLanguage}
				onChange={item => onChange(item.value)}
			/>
		</View>
	);
};

const styles = StyleSheet.create({
	container: {
		zIndex: 10,
		flex: 1,
	},
	dropdown: {
		marginTop: 5,
		height: 50,
		borderColor: 'gray',
		borderWidth: 0.5,
		borderRadius: 8,
		paddingHorizontal: 8,
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
