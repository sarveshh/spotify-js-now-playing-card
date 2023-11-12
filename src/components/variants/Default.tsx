import { timeStringFromMs } from "../utils";
import { DefaultPlayerProps } from "../types";
import PreviewPlayer from "../PreviewPlayer";
import SyncedLyrics from "../../SyncedLyrics";

const DefaultVariant = ({
  lastPlayed,
  showPreviewBar,
  lyrics,
}: DefaultPlayerProps) => {
  if (!lastPlayed) return null;
  return (
    <div className=" z-10 rounded-xl shadow-xl">
      <div className="bg-white border-slate-100 transition-all duration-500 dark:bg-slate-800 transition-all duration-500 dark:border-slate-500 border-b rounded-t-xl p-4 pb-6 sm:p-10 sm:pb-8 lg:p-6 xl:p-10 xl:pb-8 space-y-6 sm:space-y-8 lg:space-y-6 xl:space-y-8">
        <div className="flex items-center space-x-4">
          <img
            src={lastPlayed.item.album.images[0].url}
            loading="lazy"
            decoding="async"
            alt=""
            className="flex-none rounded-lg bg-slate-100 cursor-pointer"
            width="88"
            height="88"
            onClick={() => window.open(lastPlayed.item.external_urls.spotify)}
          />
          <div className="min-w-0 flex-auto space-y-1 font-semibold">
            <p className="text-cyan-500 transition-all duration-500 dark:text-cyan-400 text-sm leading-6">
              {lastPlayed.item.album.name}
            </p>
            <h2 className="text-slate-500 transition-all duration-500 dark:text-slate-400 text-sm leading-6 truncate">
              {lastPlayed.item.artists.map((artist, index) => {
                return (
                  <span
                    className="cursor-pointer"
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
              className="cursor-pointer text-slate-900 transition-all duration-500 dark:text-slate-50 text-lg"
              onClick={() => window.open(lastPlayed.item.external_urls.spotify)}
            >
              {lastPlayed.item.name}
            </p>
          </div>

          <SyncedLyrics
            key={lyrics?.lines.length}
            lyricsData={lyrics}
            currentMs={lastPlayed.progress_ms}
          />
        </div>
        <div className="space-y-2">
          <div className="relative">
            <div className=" bg-slate-100 transition-all duration-500 dark:bg-slate-700 rounded-full overflow-hidden">
              <div
                className="bg-cyan-500 transition-all duration-500 dark:bg-cyan-400 h-2"
                style={{
                  width: `${
                    (lastPlayed.progress_ms / lastPlayed.item.duration_ms) * 100
                  }%`,
                }}
              ></div>
            </div>
            <div
              className="ring-cyan-500 transition-all duration-500 dark:ring-cyan-400 ring-2 absolute top-1/2 w-4 h-4 -mt-2 -ml-2 flex items-center justify-center bg-white rounded-full shadow"
              style={{
                left: `${
                  (lastPlayed.progress_ms / lastPlayed.item.duration_ms) * 100
                }%`,
              }}
            >
              <div className="w-1.5 h-1.5 bg-cyan-500 transition-all duration-500 dark:bg-cyan-400 rounded-full ring-1 ring-inset ring-slate-900/5"></div>
            </div>
          </div>
          <div className="flex justify-between text-sm leading-6 font-medium tabular-nums">
            <div className="text-cyan-500 transition-all duration-500 dark:text-slate-100">
              {/* COnvert to minute and seconds */}
              {timeStringFromMs(lastPlayed.progress_ms)}
            </div>
            <div className="text-slate-500 transition-all duration-500 dark:text-slate-400">
              {timeStringFromMs(lastPlayed.item.duration_ms)}
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
