import { useEffect, useState } from "react";
import {
  LyricsResponse,
  SpotifyNowProps,
  NowPlayingType as SpotifyObject,
} from "../types";
import ls from "localstorage-slim";
import { getAccessToken, getSongInfo, handleGetSongLyrics } from "../api";
import { NowPlayingCard } from "./variants";

ls.config.encrypt = true;

const SpotifyPlaying = ({
  client_id,
  client_secret,
  refresh_token,
  variant,
  refreshInterval = 10000,
  showPreviewBar = true,
  showLyrics = true,
}: SpotifyNowProps) => {
  const [lastPlayed, setLastPlayed] = useState<SpotifyObject | null>(null);
  const [lyrics, setLyrics] = useState<LyricsResponse | null>(null);

  const handleLastPlayed = (data: SpotifyObject | null) => {
    setLastPlayed((prev) => {
      if (prev?.item?.id !== data?.item?.id) {
        setLyrics(null);
      }
      return data;
    });
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
    if (!lastPlayed?.item?.external_urls?.spotify || lyrics !== null) {
      return;
    }

    if (lyrics === null && showLyrics) {
      handleGetSongLyrics({ url: lastPlayed.item.external_urls.spotify })
        .then((data) => {
          setLyrics(data);
        })
        .catch((err) => {
          console.error(err);
          setLyrics(null);
        });
    } else {
      setLyrics(null);
    }
  }, [lastPlayed, lyrics, showLyrics]);

  useEffect(() => {
    updateSongInfo();
  }, []);

  return (
    <NowPlayingCard
      lastPlayed={lastPlayed}
      lyrics={lyrics}
      variant={variant}
      showLyrics={showLyrics}
      showPreviewBar={showPreviewBar}
    />
  );
};

export default SpotifyPlaying;
