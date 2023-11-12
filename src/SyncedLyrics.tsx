import React, { useState, useEffect } from "react";
import { LyricsResponse } from "./components/types";

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

  if (!lyricsData) return null;

  return (
    <div className="synced-lyrics">
      {lyricsData.lines
        .slice(currentLine - 2, currentLine + 3)
        .map((line, i) => {
          return (
            <p
              key={i}
              className={`font-serif transition-all duration-500  text-md leading-6 truncate ${
                i === 2 ? "text-white" : "text-slate-500 dark:text-slate-400"
              }`}
            >
              {line.words}
            </p>
          );
        })}
    </div>
  );
};

export default SyncedLyrics;
