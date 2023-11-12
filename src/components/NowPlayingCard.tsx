import { useCallback, useEffect, useState } from "react";
import { NowPlayingCardProps } from "./types";

type DebounceFunction<T extends unknown[]> = (...args: T) => void;

export const NowPlayingCard = ({
  variant = "default",
  lastPlayed,
}: NowPlayingCardProps) => {
  const timeStringFromMs = (ms: number) => {
    const seconds = Math.floor(ms / 1000);
    const minutes = Math.floor(seconds / 60);
    const secondsLeft = seconds % 60;
    return `${minutes}:${secondsLeft}`;
  };

  const [audio] = useState(new Audio());
  const [playing, setPlaying] = useState(false);

  const toggle = useCallback(
    () => setPlaying((prevPlaying) => !prevPlaying),
    []
  );

  const rewind = useCallback(
    () => (audio.currentTime = audio.currentTime - 5),
    [audio]
  );

  const skip = useCallback(
    () => (audio.currentTime = audio.currentTime + 5),
    [audio]
  );

  const changeRate = () => {
    audio.playbackRate = audio.playbackRate + 0.25;
    if (audio.playbackRate > 2) {
      audio.playbackRate = 0.5;
    }
  };

  const debounce = <T extends unknown[]>(
    func: DebounceFunction<T>,
    delay: number
  ) => {
    let timeoutId: ReturnType<typeof setTimeout>;
    return function (this: unknown, ...args: T) {
      clearTimeout(timeoutId);
      timeoutId = setTimeout(() => func.apply(this, args), delay);
    };
  };

  const debouncedChangeRate = useCallback(
    debounce(() => changeRate(), 300),
    [changeRate]
  );

  useEffect(() => {
    playing ? audio.play() : audio.pause();
  }, [playing]);

  useEffect(() => {
    if (lastPlayed?.item?.preview_url) {
      audio.src = lastPlayed.item.preview_url;
    }
  }, [lastPlayed?.item?.preview_url]);

  useEffect(() => {
    const cleanup = () => {
      audio.pause();
      audio.src = "";
    };

    return cleanup;
  }, [audio]);

  return (
    <>
      {lastPlayed && (
        <>
          <div className="space-y-4 mt-10 text-xl font-semibold sm:text-2xl md:text-3xl xl:text-4xl underline-magical w-max">
            Now Playing {variant}
          </div>
          <div className="mt-6 sm:mt-10 relative z-10 rounded-xl shadow-xl">
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
                  onClick={() =>
                    window.open(lastPlayed.item.external_urls.spotify)
                  }
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
                          onClick={() =>
                            window.open(artist.external_urls.spotify)
                          }
                        >
                          {artist.name}{" "}
                          {index !== lastPlayed.item.artists.length - 1 && ", "}
                        </span>
                      );
                    })}
                  </h2>
                  <p
                    className="cursor-pointer text-slate-900 transition-all duration-500 dark:text-slate-50 text-lg"
                    onClick={() =>
                      window.open(lastPlayed.item.external_urls.spotify)
                    }
                  >
                    {lastPlayed.item.name}
                  </p>
                </div>
              </div>
              <div className="space-y-2">
                <div className="relative">
                  <div className="bg-slate-100 transition-all duration-500 dark:bg-slate-700 rounded-full overflow-hidden">
                    <div
                      className="bg-cyan-500 transition-all duration-500 dark:bg-cyan-400 h-2"
                      style={{
                        width: `${
                          (lastPlayed.progress_ms /
                            lastPlayed.item.duration_ms) *
                          100
                        }%`,
                      }}
                    ></div>
                  </div>
                  <div
                    className="ring-cyan-500 transition-all duration-500 dark:ring-cyan-400 ring-2 absolute top-1/2 w-4 h-4 -mt-2 -ml-2 flex items-center justify-center bg-white rounded-full shadow"
                    style={{
                      left: `${
                        (lastPlayed.progress_ms / lastPlayed.item.duration_ms) *
                        100
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
            {lastPlayed?.item?.preview_url && (
              <div className="bg-slate-50 text-slate-500 transition-all duration-500 dark:bg-slate-600 transition-all duration-500 dark:text-slate-200 rounded-b-xl flex items-center">
                <div className="flex-auto flex items-center justify-evenly">
                  <button
                    type="button"
                    aria-label="Add to favorites"
                    className="cursor-pointer"
                    onClick={() =>
                      window.open(lastPlayed.item.external_urls.spotify)
                    }
                  >
                    <svg width="24" height="24">
                      <path
                        d="M7 6.931C7 5.865 7.853 5 8.905 5h6.19C16.147 5 17 5.865 17 6.931V19l-5-4-5 4V6.931Z"
                        fill="currentColor"
                        stroke="currentColor"
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      ></path>
                    </svg>
                  </button>
                  <button
                    type="button"
                    aria-label="Rewind 10 seconds"
                    onClick={rewind}
                  >
                    <svg width="24" height="24" fill="none">
                      <path
                        d="M6.492 16.95c2.861 2.733 7.5 2.733 10.362 0 2.861-2.734 2.861-7.166 0-9.9-2.862-2.733-7.501-2.733-10.362 0A7.096 7.096 0 0 0 5.5 8.226"
                        stroke="currentColor"
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      ></path>
                      <path
                        d="M5 5v3.111c0 .491.398.889.889.889H9"
                        stroke="currentColor"
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      ></path>
                    </svg>
                  </button>
                </div>
                <button
                  type="button"
                  className="bg-white text-slate-900 transition-all duration-500 dark:bg-slate-100 transition-all duration-500 dark:text-slate-700 flex-none -my-2 mx-auto w-20 h-20 rounded-full ring-1 ring-slate-900/5 shadow-md flex items-center justify-center"
                  aria-label="Pause"
                  onClick={toggle}
                >
                  <svg width="30" height="32" fill="currentColor">
                    <rect x="6" y="4" width="4" height="24" rx="2"></rect>
                    <rect x="20" y="4" width="4" height="24" rx="2"></rect>
                  </svg>
                </button>
                <div className="flex-auto flex items-center justify-evenly">
                  <button
                    type="button"
                    aria-label="Skip 10 seconds"
                    onClick={skip}
                  >
                    <svg width="24" height="24" fill="none">
                      <path
                        d="M17.509 16.95c-2.862 2.733-7.501 2.733-10.363 0-2.861-2.734-2.861-7.166 0-9.9 2.862-2.733 7.501-2.733 10.363 0 .38.365.711.759.991 1.176"
                        stroke="currentColor"
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      ></path>
                      <path
                        d="M19 5v3.111c0 .491-.398.889-.889.889H15"
                        stroke="currentColor"
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      ></path>
                    </svg>
                  </button>
                  <button
                    type="button"
                    id="playbackRate"
                    className="rounded-lg text-xs leading-6 font-semibold px-2 ring-2 ring-inset ring-slate-500 text-slate-500 transition-all duration-500 dark:text-slate-100 transition-all duration-500 dark:ring-0 transition-all duration-500 dark:bg-slate-500"
                    onClick={debouncedChangeRate}
                  >
                    <span id="playbackRate">{audio.playbackRate}x</span>
                  </button>
                </div>
              </div>
            )}
          </div>
        </>
      )}
    </>
  );
};
