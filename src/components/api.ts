import ls from "localstorage-slim";
import { AccessTokenApiProps, NowPlayingType, SongInfoApiProps } from "./types";
import axios from "axios";

ls.config.encrypt = true;
let access_token = ls.get("access_token");

export const getAccessToken = async ({
  client_id,
  client_secret,
  refresh_token,
  handleLastPlayed,
}: AccessTokenApiProps) => {
  try {
    const response = await axios.post(
      `https://accounts.spotify.com/api/token`,
      `grant_type=refresh_token&refresh_token=${refresh_token}`,
      {
        headers: {
          "Content-Type": "application/x-www-form-urlencoded",
          Authorization: "Basic " + btoa(`${client_id}:${client_secret}`),
        },
      }
    );

    const data = response.data;
    access_token = data.access_token;
    ls.set("access_token", data.access_token);

    // Refresh token 60 seconds before it expires
    setTimeout(
      () =>
        getAccessToken({
          client_id,
          client_secret,
          refresh_token,
          handleLastPlayed,
        }),
      (data.expires_in - 60) * 1000
    );

    return data.access_token;
  } catch (error) {
    console.error(error);
    handleLastPlayed(null);
  }
};

export const getSongInfo = async ({ handleLastPlayed }: SongInfoApiProps) => {
  try {
    const response = await axios.get(
      "https://api.spotify.com/v1/me/player/currently-playing",
      {
        headers: {
          Authorization: `Bearer ${access_token}`,
        },
      }
    );

    if (response.status === 204) {
      const recentPlayedResponse = await axios.get(
        "https://api.spotify.com/v1/me/player/recently-played",
        {
          headers: {
            Authorization: `Bearer ${access_token}`,
          },
        }
      );

      const data = recentPlayedResponse.data as NowPlayingType;
      handleLastPlayed(data);
      return recentPlayedResponse.data;
    } else {
      handleLastPlayed(response.data);
      return response.data;
    }
  } catch (error) {
    console.error(error);
    handleLastPlayed(null);
  }
};

export const handleGetSongLyrics = async ({ url }: { url: string }) => {
  try {
    const response = await axios.get(
      `https://spotify-lyric-api-984e7b4face0.herokuapp.com/?url=${url}`
    );
    return response.data;
  } catch (error) {
    console.error(error);
  }
};
