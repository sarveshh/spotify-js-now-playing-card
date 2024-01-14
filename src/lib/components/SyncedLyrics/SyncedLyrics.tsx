import { useEffect, useState } from "react";
import { LyricsResponse } from "../../types";
import "./SyncedLyrics.css";

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
          className={`synced-lyrics transition-all ${
            i === 2 ? "text-white" : "text-slate "
          }`}
        >
          {line.words}
        </div>
      );
    });

  return <div key={lyricsData?.lines.length}>{lines}</div>;
};

export default SyncedLyrics;
