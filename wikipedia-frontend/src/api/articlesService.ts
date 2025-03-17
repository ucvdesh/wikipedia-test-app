export const fetchArticles = async (
	selectedDate: {
		day: string;
		month: string;
		year: string;
	},
	language: string,
) => {
	const url = `http://localhost:3000/feed?year=${selectedDate.year}&month=${selectedDate.month}&day=${selectedDate.day}&language=${language}`;
	const response = await fetch(url);
	const data = await response.json();
	return data.onthisday;
};
