import ls from "localstorage-slim";
import { AccessTokenApiProps } from "./types";

const refresh_token = ls.get("refresh_token");

export const getAccessToken = ({
  client_id,
  client_secret,
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
