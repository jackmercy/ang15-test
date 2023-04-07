// Due to daily limit of 1000 requests, I have to use two different api keys

type GiphyApiKey = 'trending' | 'search' | 'ids' | 'upload';

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
  ids: string;
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
  upload: {
    url: 'https://upload.giphy.com/v1/gifs',
    api_key: 'zpD8FN2HK5hkktavai4ScfvZSndS0M8M'
  },
  ids: {
    url: 'https://api.giphy.com/v1/gifs',
    api_key: 'Mkd3qyMA6hxcylnDdWCHLZzmbnpzsvah',
  },
}