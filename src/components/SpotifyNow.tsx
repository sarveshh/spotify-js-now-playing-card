import { useEffect, useState } from "react";
import { SpotifyNowProps, NowPlayingType as SpotifyObject } from "./types";
import ls from "localstorage-slim";
import { getAccessToken, getSongInfo } from "./api";
import { NowPlayingCard } from "./NowPlayingCard";

ls.config.encrypt = true;

const SpotifyPlaying = ({
  client_id,
  client_secret,
  refresh_token,
  variant,
}: SpotifyNowProps) => {
  console.log("client_id", client_id, client_secret, variant, refresh_token);

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
      setTimeout(updateSongInfo, 10000);
      return getSongInfo({ handleLastPlayed });
    });
  };

  useEffect(() => {
    updateSongInfo();
  }, []);

  return <NowPlayingCard lastPlayed={lastPlayed} variant="default" />;
};

export default SpotifyPlaying;
