import { useEffect, useState } from "react";
import {
  LyricsResponse,
  SpotifyNowProps,
  NowPlayingType as SpotifyObject,
} from "./types";
import ls from "localstorage-slim";
import { getAccessToken, getSongInfo, handleGetSongLyrics } from "./api";
import { NowPlayingCard } from "./variants";

ls.config.encrypt = true;

const SpotifyPlaying = ({
  client_id,
  client_secret,
  refresh_token,
  variant,
  refreshInterval = 10000,
  showPreviewBar = true,
}: SpotifyNowProps) => {
  const [lastPlayed, setLastPlayed] = useState<SpotifyObject | null>(null);
  const [lyrics, setLyrics] = useState<LyricsResponse | null>(null);

  const handleLastPlayed = (data: SpotifyObject | null) => {
    setLastPlayed(data);
  };

  const updateSongInfo = () => {
    getAccessToken({
      client_id,
      client_secret,
      refresh_token,
      handleLastPlayed,
    }).then(() => {
      setTimeout(updateSongInfo, refreshInterval);
      return getSongInfo({ handleLastPlayed });
    });
  };
  useEffect(() => {
    if (
      lastPlayed?.item?.external_urls?.spotify &&
      variant === "default" &&
      !lyrics
    ) {
      handleGetSongLyrics({ url: lastPlayed.item.external_urls.spotify })
        .then((res) => {
          setLyrics(res);
        })
        .catch((err) => {
          console.error(err);
        });
    } else {
      setLyrics(null);
    }
  }, [lastPlayed?.item?.external_urls?.spotify, variant]);

  useEffect(() => {
    updateSongInfo();
  }, []);

  return (
    <NowPlayingCard
      lastPlayed={lastPlayed}
      lyrics={lyrics}
      variant={variant}
      showPreviewBar={showPreviewBar}
    />
  );
};

export default SpotifyPlaying;
