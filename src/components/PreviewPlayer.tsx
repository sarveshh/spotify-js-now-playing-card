import { useCallback, useEffect, useState } from "react";
import { debounce } from "./utils";
import { PreviewPlayerProps } from "./types";

const PreviewPlayer = ({ lastPlayed, variant }: PreviewPlayerProps) => {
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

  const debouncedChangeRate = useCallback(
    debounce(() => changeRate(), 300),
    [changeRate]
  );

  useEffect(() => {
    playing ? audio.play() : audio.pause();
  }, [playing, audio]);

  useEffect(() => {
    if (lastPlayed?.item?.preview_url) {
      audio.src = lastPlayed.item.preview_url;
    }
  }, [lastPlayed?.item?.preview_url, audio]);

  useEffect(() => {
    const cleanup = () => {
      audio.pause();
      audio.src = "";
    };

    return cleanup;
  }, [audio]);

  if (!lastPlayed?.item?.preview_url) return null;

  return (
    <div className="bg-slate-50 text-slate-500 transition-all  dark:bg-slate-600 duration-500 dark:text-slate-200 rounded-b-xl flex items-center">
      <div className="flex-auto flex items-center justify-evenly">
        {variant !== "minimal" && (
          <button
            type="button"
            aria-label="Add to favorites"
            className="cursor-pointer"
            onClick={() => window.open(lastPlayed.item.external_urls.spotify)}
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
        )}
        <button type="button" aria-label="Rewind 10 seconds" onClick={rewind}>
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
        className="bg-white text-slate-900  dark:bg-slate-100 transition-all duration-500 dark:text-slate-700 flex-none -my-2 mx-auto w-20 h-20 rounded-full ring-1 ring-slate-900/5 shadow-md flex items-center justify-center"
        aria-label="Pause"
        onClick={toggle}
      >
        {playing ? (
          <svg width="30" height="32" fill="currentColor">
            <rect x="6" y="4" width="4" height="24" rx="2"></rect>
            <rect x="20" y="4" width="4" height="24" rx="2"></rect>
          </svg>
        ) : (
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="32"
            height="32"
            viewBox="0 0 24 24"
          >
            <path fill="currentColor" d="M8 19V5l11 7l-11 7Z" />
          </svg>
        )}
      </button>
      <div className="flex-auto flex items-center justify-evenly">
        <button type="button" aria-label="Skip 10 seconds" onClick={skip}>
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
        {variant !== "minimal" && (
          <button
            type="button"
            id="playbackRate"
            className="rounded-lg text-xs leading-6 font-semibold px-2 ring-2 ring-inset ring-slate-500 text-slate-500   dark:text-slate-100 transition-all duration-500 dark:ring-0  dark:bg-slate-500"
            onClick={debouncedChangeRate}
          >
            <span id="playbackRate">{audio.playbackRate}x</span>
          </button>
        )}
      </div>
    </div>
  );
};

export default PreviewPlayer;
