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
import { useBookmarks, useReadArticle } from '../hooks';
import { ShareLinkButton } from './ShareLinkButton';
import FontAwesome from '@expo/vector-icons/FontAwesome';
import FontAwesome5 from '@expo/vector-icons/FontAwesome5';

const noImageAvailable = require('../assets/images/no-image-available.png');

export interface ArticlePage {
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

export interface Article {
	text: string;
	pages: ArticlePage[];
}

interface ArticleCardProps {
	article: Article;
}

export const ArticleCards: React.FC<ArticleCardProps> = ({ article }) => {
	const { isBookmarked, toggleBookmark } = useBookmarks();
	const { isArticleRead, toggleArticleReadStatus } = useReadArticle();

	return (
		<View style={styles.card}>
			<View style={styles.header}>
				<Text style={styles.articleText}>{article.text}</Text>
			</View>
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
							style={{
								width: item.thumbnail?.width || 200,
								height: item.thumbnail?.height || 200,
							}}
						/>
						<View
							style={{
								flexDirection: 'row',
								justifyContent: 'space-between',
								alignItems: 'center',
								flex: 1,
								width: '100%',
								height: 40,
							}}>
							<View
								style={{ flexDirection: 'row', alignItems: 'center', gap: 10 }}>
								<TouchableOpacity
									onPress={async () => {
										const url = item.content_urls?.mobile.page;
										if (url) {
											await Linking.openURL(url);
											toggleArticleReadStatus(item.wikibase_item);
										}
									}}>
									<Text style={[styles.pageTitle]}>
										{item.titles.normalized}
									</Text>
								</TouchableOpacity>
								{isArticleRead(item.wikibase_item) && (
									<FontAwesome5 name="check-double" size={18} color="gray" />
								)}
							</View>
							<View
								style={{
									flexDirection: 'row',
									height: 40,
									alignItems: 'center',
									gap: 10,
								}}>
								<TouchableOpacity
									style={styles.bookmarkButton}
									onPress={() => toggleBookmark(item.wikibase_item)}>
									{isBookmarked(item.wikibase_item) ? (
										<FontAwesome name="bookmark" size={24} color="black" />
									) : (
										<FontAwesome name="bookmark-o" size={24} color="black" />
									)}
								</TouchableOpacity>
								<ShareLinkButton url={item.content_urls?.mobile.page || ''} />
							</View>
						</View>
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
		// Sombras para iOS
		shadowColor: '#000',
		shadowOffset: { width: 0, height: 2 },
		shadowOpacity: 0.1,
		shadowRadius: 4,
		// Elevación para Android
		elevation: 3,
	},
	header: {
		flexDirection: 'row',
		justifyContent: 'space-between',
		alignItems: 'center',
		marginBottom: 10,
	},
	articleText: {
		fontSize: 18,
		fontWeight: '600',
		color: '#333',
		flex: 1,
	},
	bookmarkButton: {
		marginLeft: 10,
		padding: 5,
	},
	bookmarkText: {
		fontSize: 22,
		color: '#f5a623', // Color dorado para el marcador
	},
	pageContainer: {
		backgroundColor: '#fafafa',
		borderWidth: 1,
		borderColor: '#ddd',
		borderRadius: 8,
		overflow: 'hidden',
		marginBottom: 10,
		paddingHorizontal: 10,
		alignItems: 'center',
	},
	pageTitle: {
		fontSize: 16,
		fontWeight: 'bold',
		color: '#007bff',
		paddingVertical: 8,
	},
	readText: {
		color: 'gray',
		textDecorationLine: 'line-through',
	},
});
