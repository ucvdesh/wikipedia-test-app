export interface WikipediaFeaturedContent {
  onthisday?: OnThisDayItem[];
}

export interface OnThisDayItem {
  text: string;
  pages: OnThisDayPage[];
}

export interface OnThisDayPage {
  wikibase_item: string;
  titles: {
    normalized: string;
  };
  thumbnail?: {
    source: string;
    width: number;
    height: number;
  };
  content_urls?: {
    mobile?: {
      page: string;
      revisions: string;
      edit: string;
      talk: string;
    };
    desktop?: {
      page: string;
      revisions: string;
      edit: string;
      talk: string;
    };
  };
  extract: string;
}
