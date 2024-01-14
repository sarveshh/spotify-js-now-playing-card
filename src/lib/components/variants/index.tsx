import { NowPlayingCardProps } from "../../types";
import DefaultVariant from "./Default/Default";

export const NowPlayingCard = ({
  variant,
  lyrics,
  lastPlayed,
  showPreviewBar = true,
  showLyrics = false,
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
        />
      );
      break;
  }

  return component;
};
