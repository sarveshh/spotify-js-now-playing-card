import useThemeDetector from "../../../../hooks/useDarkThemeDetector";
import { DefaultPlayerProps } from "../../../types";
import { timeStringFromMs } from "../../../utils";
import PreviewPlayer from "../../PreviewPlayer/PreviewPlayer";
import SyncedLyrics from "../../SyncedLyrics/SyncedLyrics";
import "../commons.css";
import "./Default.css";

const DefaultVariant = ({
  lastPlayed,
  showPreviewBar,
  lyrics,
  showLyrics,
  theme,
}: DefaultPlayerProps) => {
  const isDarkTheme = useThemeDetector();
  if (!lastPlayed) return null;
  return (
    <div
      className={`container ${isDarkTheme || theme === "dark" ? "dark" : ""}`}
    >
      <div className="player-card space6">
        <div className="songinfo space4">
          <img
            src={lastPlayed.item?.album.images[0].url}
            loading="lazy"
            decoding="async"
            alt=""
            width="88"
            height="88"
            onClick={() => window.open(lastPlayed.item?.external_urls.spotify)}
          />
          <div className="songNameInfo space1">
            <p className="albumName transition-all">
              {lastPlayed.item?.album.name}
            </p>
            <h2 className="transition-all">
              {lastPlayed.item?.artists.map((artist, index) => {
                return (
                  <span
                    key={index}
                    onClick={() => window.open(artist.external_urls.spotify)}
                  >
                    {artist.name}{" "}
                    {index !== lastPlayed.item?.artists.length - 1 && ", "}
                  </span>
                );
              })}
            </h2>
            <p
              className="songName transition-all "
              onClick={() =>
                window.open(lastPlayed.item?.external_urls.spotify)
              }
            >
              {lastPlayed.item?.name}
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
        <div className="space2">
          <div className="progress">
            <div className="withBg transition-all">
              <div
                className="progress-bar transition-all"
                style={{
                  width: `${
                    (lastPlayed.progress_ms / lastPlayed.item?.duration_ms) *
                    100
                  }%`,
                }}
              ></div>
              <div
                className="progress-ring transition-all"
                style={{
                  left: `${
                    (lastPlayed.progress_ms / lastPlayed.item?.duration_ms) *
                    100
                  }%`,
                }}
              >
                <div className="inner"></div>
              </div>
            </div>
          </div>
          <div className="progress-texts">
            <div className="current">
              {timeStringFromMs(lastPlayed.progress_ms)}
            </div>
            <div className="duration">
              {timeStringFromMs(lastPlayed.item?.duration_ms)}
            </div>
          </div>
        </div>
      </div>
      {lastPlayed?.item?.preview_url && showPreviewBar && (
        <PreviewPlayer lastPlayed={lastPlayed} />
      )}
    </div>
  );
};

export default DefaultVariant;
