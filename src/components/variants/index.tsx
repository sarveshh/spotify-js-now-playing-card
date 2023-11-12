import { NowPlayingCardProps } from "../types";
import DefaultVariant from "./Default";
import Minimal from "./Minimal";

export const NowPlayingCard = ({
  variant,
  lastPlayed,
  showPreviewBar = true,
}: NowPlayingCardProps) => {
  if (!lastPlayed) return null;
  let component = null;

  switch (variant) {
    case "default":
      component = (
        <DefaultVariant
          lastPlayed={lastPlayed}
          showPreviewBar={showPreviewBar}
        />
      );
      break;
    case "minimal":
      component = (
        <Minimal lastPlayed={lastPlayed} showPreviewBar={showPreviewBar} />
      );
      break;
    default:
      component = (
        <DefaultVariant
          lastPlayed={lastPlayed}
          showPreviewBar={showPreviewBar}
        />
      );
      break;
  }

  return component;
};
