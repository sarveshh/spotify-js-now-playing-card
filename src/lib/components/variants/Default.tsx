import { timeStringFromMs } from "../../utils";
import { DefaultPlayerProps } from "../../types";
import PreviewPlayer from "../PreviewPlayer";
import SyncedLyrics from "../SyncedLyrics";
import "./default.css";

const DefaultVariant = ({
  lastPlayed,
  showPreviewBar,
  lyrics,
  showLyrics,
}: DefaultPlayerProps) => {
  if (!lastPlayed) return null;
  return (
    <div className="default-container">
      <div className="song-info">
        <div className="song-name">
          <img
            src={lastPlayed.item.album.images[0].url}
            loading="lazy"
            decoding="async"
            alt=""
            id="song-image"
            width="88"
            height="88"
            onClick={() => window.open(lastPlayed.item.external_urls.spotify)}
          />
          <div id="names">
            <p id="album">{lastPlayed.item.album.name}</p>
            <h2 id="artists">
              {lastPlayed.item.artists.map((artist, index) => {
                return (
                  <span
                    style={{ cursor: "pointer" }}
                    key={index}
                    onClick={() => window.open(artist.external_urls.spotify)}
                  >
                    {artist.name}{" "}
                    {index !== lastPlayed.item.artists.length - 1 && ", "}
                  </span>
                );
              })}
            </h2>
            <p
              id="song"
              onClick={() => window.open(lastPlayed.item.external_urls.spotify)}
            >
              {lastPlayed.item.name}
            </p>
          </div>
          {showLyrics && lyrics && (
            <SyncedLyrics
              key={lyrics?.lines.length}
              lyricsData={lyrics}
              currentMs={lastPlayed.progress_ms}
            />
          )}
        </div>
        <div className="trackbar">
          <div
            id="line"
            style={{
              width: `${
                (lastPlayed.progress_ms / lastPlayed.item.duration_ms) * 100
              }%`,
            }}
          ></div>
          <div
            id="ring"
            style={{
              width: `${
                (lastPlayed.progress_ms / lastPlayed.item.duration_ms) * 100
              }%`,
            }}
          ></div>
        </div>
        <div className="trackbar-count">
          <div id="left">{timeStringFromMs(lastPlayed.progress_ms)}</div>
          <div id="right">{timeStringFromMs(lastPlayed.item.duration_ms)}</div>
        </div>
      </div>
      {lastPlayed?.item?.preview_url && showPreviewBar && (
        <PreviewPlayer lastPlayed={lastPlayed} />
      )}
    </div>
  );
};

export default DefaultVariant;
