import { useEffect, useState } from "react";
import { SpotifyNowProps, NowPlayingType as SpotifyObject } from "./types";
import ls from "localstorage-slim";
import { getAccessToken } from "./api";
import { NowPlayingCard } from "./NowPlayingCard";

ls.config.encrypt = true;

const SpotifyPlaying = ({
  client_id,
  client_secret,
  variant,
}: SpotifyNowProps) => {
  const refresh_token = ls.get("refresh_token");
  console.log("client_id", client_id, client_secret, variant, refresh_token);
  const access_token = ls.get("access_token");

  const [lastPlayed, setLastPlayed] = useState<SpotifyObject | null>(null);

  const getSongInfo = () => {
    return fetch("https://api.spotify.com/v1/me/player/currently-playing", {
      headers: {
        Authorization: `Bearer ${access_token}`,
      },
    })
      .then((response) => {
        if (response.status === 204) {
          return fetch("https://api.spotify.com/v1/me/player/recently-played", {
            headers: {
              Authorization: `Bearer ${access_token}`,
            },
          }).then((response) => {
            const data = response.json() as unknown as SpotifyObject;
            setLastPlayed(data);
            return response.json();
          });
        } else {
          return response.json().then((data) => {
            setLastPlayed(data);
            return data;
          });
        }
      })
      .catch((error) => {
        console.error(error);
        setLastPlayed(null);
      });
  };

  const handleLastPlayed = (data: SpotifyObject | null) => {
    setLastPlayed(data);
  };

  const updateSongInfo = () => {
    getAccessToken({ client_id, client_secret, handleLastPlayed }).then(() => {
      setTimeout(updateSongInfo, 10000);
      return getSongInfo();
    });
  };

  useEffect(() => {
    updateSongInfo();
  }, []);

  return <NowPlayingCard lastPlayed={lastPlayed} variant="default" />;
};

export default SpotifyPlaying;
