import ls from "localstorage-slim";
import { AccessTokenApiProps, NowPlayingType, SongInfoApiProps } from "./types";

ls.config.encrypt = true;
const access_token = ls.get("access_token");

export const getAccessToken = ({
  client_id,
  client_secret,
  refresh_token,
  handleLastPlayed,
}: AccessTokenApiProps) => {
  return fetch(`https://accounts.spotify.com/api/token`, {
    method: "POST",
    headers: {
      "Content-Type": "application/x-www-form-urlencoded",
      Authorization: "Basic " + btoa(`${client_id}:${client_secret}`),
    },
    body: "grant_type=refresh_token&refresh_token=" + refresh_token,
  })
    .then((response) => response.json())
    .then((data) => {
      ls.set("access_token", data.access_token);
      setTimeout(getAccessToken, (data.expires_in - 60) * 1000); // Refresh token 60 seconds before it expires
      return data.access_token;
    })
    .catch((error) => {
      console.error(error);
      handleLastPlayed(null);
    });
};

export const getSongInfo = ({ handleLastPlayed }: SongInfoApiProps) => {
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
          const data = response.json() as unknown as NowPlayingType;
          handleLastPlayed(data);
          return response.json();
        });
      } else {
        return response.json().then((data) => {
          handleLastPlayed(data);
          return data;
        });
      }
    })
    .catch((error) => {
      console.error(error);
      handleLastPlayed(null);
    });
};
