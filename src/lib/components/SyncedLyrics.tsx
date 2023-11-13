import { useState, useEffect } from "react";
import { LyricsResponse } from "../types";

const SyncedLyrics = ({
  lyricsData,
  currentMs,
}: {
  lyricsData?: LyricsResponse | null;
  currentMs: number;
}) => {
  const [currentLine, setCurrentLine] = useState(0);

  useEffect(() => {
    if (!lyricsData) return;
    const currentLine = lyricsData.lines.findIndex(
      (line) => Number(line.startTimeMs) > currentMs
    );
    setCurrentLine(
      currentLine === -1 ? lyricsData.lines.length - 1 : currentLine
    );
  }, [currentMs, lyricsData]);

  const lines = lyricsData?.lines
    .slice(currentLine - 2, currentLine + 3)
    .map((line, i) => {
      return (
        <div
          key={`${line.startTimeMs}-${i}`}
          className={`font-serif transition-all duration-500  text-md leading-6 truncate ${
            i === 2 ? "text-white" : "text-slate-500 dark:text-slate-400"
          }`}
        >
          {line.words}
        </div>
      );
    });

  return (
    <div key={lyricsData?.lines.length} className="synced-lyrics">
      {lines}
    </div>
  );
};

export default SyncedLyrics;
