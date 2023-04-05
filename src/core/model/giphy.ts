// Due to daily limit of 1000 requests, I have to use two different api keys

type GiphyApiKey = 'trending' | 'search' | 'detail';

export type GiphyApi = {
  [key in GiphyApiKey]: GiphyApiObject;
};

export type GiphyApiObject = {
  url: string;
  api_key: string;
  params?: Partial<GiphyParams>;
}

export interface GiphyParams {
  limit: number;
  rating: string;
  lang: string;
  offset: number;
  q: string;
  id: string;
}

export const GIPHY_API: GiphyApi = {
  trending: {
    url: 'https://api.giphy.com/v1/gifs/trending',
    api_key: 'DYXmHM7ndFjr1k6gOzfcR1puH2W29kP4',
  },
  search: {
    url: 'https://api.giphy.com/v1/gifs/search',
    api_key: 'IDd20KEx3GYlWVU4eZDlBhkyYv5gLo6B',
  },
  detail: {
    url: 'https://api.giphy.com/v1/gifs',
    api_key: 'IDd20KEx3GYlWVU4eZDlBhkyYv5gLo6B',
  }
}