// src/components/ArticleCard.tsx
import React from 'react';
import {
	View,
	Text,
	Image,
	FlatList,
	TouchableOpacity,
	Linking,
	StyleSheet,
} from 'react-native';

const noImageAvailable = require('../assets/images/no-image-available.png');

interface ArticlePage {
	wikibase_item: string;
	thumbnail?: {
		source: string;
		width: number;
		height: number;
	};
	titles: {
		normalized: string;
	};
	content_urls?: {
		mobile: {
			page: string;
		};
	};
}

interface Article {
	text: string;
	pages: ArticlePage[];
}

interface ArticleCardProps {
	article: Article;
}

export const ArticleCards: React.FC<ArticleCardProps> = ({ article }) => {
	return (
		<View style={styles.card}>
			<Text style={styles.articleText}>{article.text}</Text>
			<FlatList
				data={article.pages}
				renderItem={({ item }) => (
					<View style={styles.pageContainer}>
						<Image
							source={
								item.thumbnail?.source
									? { uri: item.thumbnail.source }
									: noImageAvailable
							}
							style={styles.image}
						/>
						<TouchableOpacity
							onPress={() =>
								Linking.openURL(item?.content_urls?.mobile.page || '')
							}>
							<Text style={styles.pageTitle}>{item.titles.normalized}</Text>
						</TouchableOpacity>
					</View>
				)}
				keyExtractor={item => item.wikibase_item}
			/>
		</View>
	);
};

const styles = StyleSheet.create({
	card: {
		backgroundColor: '#fff',
		borderRadius: 10,
		padding: 15,
		marginBottom: 15,
		shadowColor: '#000',
		shadowOffset: { width: 0, height: 2 },
		shadowOpacity: 0.1,
		shadowRadius: 4,
		elevation: 3,
	},
	articleText: {
		fontSize: 18,
		fontWeight: '600',
		color: '#333',
		marginBottom: 10,
	},
	pageContainer: {
		backgroundColor: '#fafafa',
		borderWidth: 1,
		borderColor: '#ddd',
		borderRadius: 8,
		overflow: 'hidden',
		marginBottom: 10,
	},
	image: {
		width: '100%',
		height: 200,
		resizeMode: 'cover',
	},
	pageTitle: {
		fontSize: 16,
		fontWeight: 'bold',
		color: '#007bff',
		paddingHorizontal: 10,
		paddingVertical: 8,
	},
});
