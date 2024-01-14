export type SpotifyNowProps = {
  client_id: string;
  client_secret: string;
  refresh_token: string;
  variant?: string;
  refreshInterval?: number;
  showPreviewBar?: boolean;
  showLyrics?: boolean;
  theme?: string;
};

export type DebounceFunction<T extends unknown[]> = (...args: T) => void;

export type PreviewPlayerProps = {
  lastPlayed: NowPlayingType | null;
  variant?: string;
  showPreviewBar?: boolean;
};

export type DefaultPlayerProps = PreviewPlayerProps & {
  lyrics?: LyricsResponse | null;
  showLyrics?: boolean;
  theme?: string;
};

export type NowPlayingCardProps = {
  variant?: string;
  lyrics?: LyricsResponse | null;
  lastPlayed?: NowPlayingType | null;
  showPreviewBar?: boolean;
  showLyrics?: boolean;
  theme?: string;
};

export type AccessTokenApiProps = {
  client_id: string;
  client_secret: string;
  refresh_token: string;
  handleLastPlayed: (data: NowPlayingType | null) => void;
};

export type SongInfoApiProps = {
  // client_id: string;
  // client_secret: string;
  handleLastPlayed: (data: NowPlayingType | null) => void;
};

export type LyricsLine = {
  startTimeMs: string;
  words: string;
  syllables: unknown[];
  endTimeMs: string;
};

export type LyricsResponse = {
  error: boolean;
  syncType: string;
  lines: LyricsLine[];
};

export type NowPlayingType = {
  timestamp: number;
  context: {
    external_urls: {
      spotify: string;
    };
    href: string;
    type: string;
    uri: string;
  };
  progress_ms: number;
  item: {
    album: {
      album_type: string;
      artists: Array<{
        external_urls: {
          spotify: string;
        };
        href: string;
        id: string;
        name: string;
        type: string;
        uri: string;
      }>;
      available_markets: string[];
      external_urls: {
        spotify: string;
      };
      href: string;
      id: string;
      images: Array<{
        height: number;
        url: string;
        width: number;
      }>;
      name: string;
      release_date: string;
      release_date_precision: string;
      total_tracks: number;
      type: string;
      uri: string;
    };
    artists: Array<{
      external_urls: {
        spotify: string;
      };
      href: string;
      id: string;
      name: string;
      type: string;
      uri: string;
    }>;
    available_markets: string[];
    disc_number: number;
    duration_ms: number;
    explicit: boolean;
    external_ids: {
      isrc: string;
    };
    external_urls: {
      spotify: string;
    };
    href: string;
    id: string;
    is_local: boolean;
    name: string;
    popularity: number;
    preview_url: string;
    track_number: number;
    type: string;
    uri: string;
  };
  currently_playing_type: string;
  actions: {
    disallows: {
      resuming: boolean;
    };
  };
  is_playing: boolean;
};
