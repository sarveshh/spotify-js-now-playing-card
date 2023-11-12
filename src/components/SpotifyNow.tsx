import { useEffect, useState } from "react";
import { SpotifyNowProps, NowPlayingType as SpotifyObject } from "./types";
import ls from "localstorage-slim";
import { getAccessToken, getSongInfo } from "./api";
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
    updateSongInfo();
  }, []);

  return (
    <NowPlayingCard
      lastPlayed={lastPlayed}
      variant={variant}
      showPreviewBar={showPreviewBar}
    />
  );
};

export default SpotifyPlaying;
