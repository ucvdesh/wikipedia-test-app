import { useState, useEffect } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';

const READ_ARTICLES_KEY = 'read_articles';

export function useReadArticle() {
	const [readArticles, setReadArticles] = useState<string[]>([]);

	useEffect(() => {
		const loadReadArticles = async () => {
			try {
				const stored = await AsyncStorage.getItem(READ_ARTICLES_KEY);
				if (stored) {
					setReadArticles(JSON.parse(stored));
				}
			} catch (error) {
				console.error('Error loading read articles', error);
			}
		};
		loadReadArticles();
	}, []);

	const saveReadArticles = async (newReadArticles: string[]) => {
		try {
			await AsyncStorage.setItem(
				READ_ARTICLES_KEY,
				JSON.stringify(newReadArticles),
			);
			setReadArticles(newReadArticles);
		} catch (error) {
			console.error('Error saving read articles', error);
		}
	};

	const isArticleRead = (articleId: string) => readArticles.includes(articleId);

	const markArticleAsRead = (articleId: string) => {
		if (!isArticleRead(articleId)) {
			const newReadArticles = [...readArticles, articleId];
			saveReadArticles(newReadArticles);
		}
	};

	const markArticleAsUnread = (articleId: string) => {
		if (isArticleRead(articleId)) {
			const newReadArticles = readArticles.filter(id => id !== articleId);
			saveReadArticles(newReadArticles);
		}
	};

	const toggleArticleReadStatus = (articleId: string) => {
		if (isArticleRead(articleId)) {
			markArticleAsUnread(articleId);
		} else {
			markArticleAsRead(articleId);
		}
	};

	return {
		readArticles,
		isArticleRead,
		toggleArticleReadStatus,
	};
}
