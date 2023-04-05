export interface GifItem {
  type: string;
  id: string;
  url: string;
  slug: string;
  bitly_gif_url: string;
  bitly_url: string;
  embed_url: string;
  username: string;
  source: string;
  title: string;
  rating: string;
  content_url: string;
  source_tld: string;
  source_post_url: string;
  is_sticker: boolean;
  import_datetime: string;
  trending_datetime: string;
  images: {
    original: {
      height: string;
      width: string;
      size: string;
      url: string;
      mp4_size: string;
      mp4: string;
      webp_size: string;
      webp: string;
      frames: string;
      hash: string;
    };
    fixed_width: {
      height: string;
      size: string;
      url: string;
      width: string;
      webp: string;
    }
  }
}
