import { useMemo } from "react";

export function useYouTubeVideoId(videoUrl: string): string | undefined {
  return useMemo(() => {
    if (videoUrl.includes("youtu.be")) {
      return videoUrl.split("youtu.be/")[1];
    } else if (videoUrl.includes("youtube.com")) {
      if (videoUrl.includes("/shorts/")) {
        return videoUrl.split("/shorts/")[1]?.split("?")[0];
      } else if (videoUrl.includes("v=")) {
        return videoUrl.split("v=")[1]?.split("&")[0];
      }
    }
    return undefined;
  }, [videoUrl]);
}
