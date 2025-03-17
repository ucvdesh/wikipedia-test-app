import { useState, useEffect } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';

const BOOKMARKS_KEY = 'bookmarked_articles';

export function useBookmarks() {
	const [bookmarks, setBookmarks] = useState<string[]>([]);

	useEffect(() => {
		const loadBookmarks = async () => {
			try {
				const stored = await AsyncStorage.getItem(BOOKMARKS_KEY);
				if (stored) {
					setBookmarks(JSON.parse(stored));
				}
			} catch (error) {
				console.error('Error loading bookmarks', error);
			}
		};
		loadBookmarks();
	}, []);

	const saveBookmarks = async (newBookmarks: string[]) => {
		try {
			await AsyncStorage.setItem(BOOKMARKS_KEY, JSON.stringify(newBookmarks));
			setBookmarks(newBookmarks);
		} catch (error) {
			console.error('Error saving bookmarks', error);
		}
	};

	const isBookmarked = (articleId: string) => bookmarks.includes(articleId);

	const addBookmark = (articleId: string) => {
		const newBookmarks = [...bookmarks, articleId];
		saveBookmarks(newBookmarks);
	};

	const removeBookmark = (articleId: string) => {
		const newBookmarks = bookmarks.filter(id => id !== articleId);
		saveBookmarks(newBookmarks);
	};

	const toggleBookmark = (articleId: string) => {
		if (isBookmarked(articleId)) {
			removeBookmark(articleId);
		} else {
			addBookmark(articleId);
		}
	};

	return {
		bookmarks,
		isBookmarked,
		addBookmark,
		removeBookmark,
		toggleBookmark,
	};
}
