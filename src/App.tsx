import SpotifyPlaying from "./components/SpotifyNow";

const client_id = import.meta.env.VITE_SPOTIFY_CLIENT_ID;
const client_secret = import.meta.env.VITE_SPOTIFY_CLIENT_SECRET;
const refresh_token = import.meta.env.VITE_SPOTIFY_REFRESH_TOKEN;

const App = () => {
  return (
    <SpotifyPlaying
      client_id={client_id}
      client_secret={client_secret}
      refresh_token={refresh_token}
      refreshInterval={10000}
      variant="default"
      showPreviewBar={true}
    />
  );
};

export default App;
