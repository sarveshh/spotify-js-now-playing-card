import { NowPlayingCardProps } from "../../types";
import DefaultVariant from "./Default/Default";

export const NowPlayingCard = ({
  variant,
  lyrics,
  lastPlayed,
  showPreviewBar = true,
  showLyrics = false,
  theme,
}: NowPlayingCardProps) => {
  if (!lastPlayed) return null;
  let component = null;

  switch (variant) {
    case "default":
      component = (
        <DefaultVariant
          lastPlayed={lastPlayed}
          showPreviewBar={showPreviewBar}
          lyrics={lyrics}
          showLyrics={showLyrics}
          theme={theme}
        />
      );
      break;

    default:
      component = (
        <DefaultVariant
          lastPlayed={lastPlayed}
          showPreviewBar={showPreviewBar}
          lyrics={lyrics}
          showLyrics={showLyrics}
          theme={theme}
        />
      );
      break;
  }

  return component;
};
