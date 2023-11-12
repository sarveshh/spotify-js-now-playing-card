import { DebounceFunction } from "./types";

export const timeStringFromMs = (ms: number) => {
  const seconds = Math.floor(ms / 1000);
  const minutes = Math.floor(seconds / 60);
  const secondsLeft = seconds % 60;
  return `${minutes}:${secondsLeft}`;
};

export const debounce = <T extends unknown[]>(
  func: DebounceFunction<T>,
  delay: number
) => {
  let timeoutId: ReturnType<typeof setTimeout>;
  return function (this: unknown, ...args: T) {
    clearTimeout(timeoutId);
    timeoutId = setTimeout(() => func.apply(this, args), delay);
  };
};
