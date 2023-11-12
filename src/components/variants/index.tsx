import { NowPlayingCardProps } from "../types";
import DefaultVariant from "./Default";

export const NowPlayingCard = ({
  variant,
  lastPlayed,
}: NowPlayingCardProps) => {
  if (!lastPlayed) return null;
  let component = null;

  switch (variant) {
    case "default":
      component = <DefaultVariant lastPlayed={lastPlayed} />;
      break;
    default:
      component = <DefaultVariant lastPlayed={lastPlayed} />;
      break;
  }

  return component;
};
