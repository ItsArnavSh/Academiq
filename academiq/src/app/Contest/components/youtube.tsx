"use client";
import YouTube from "react-youtube";

export default function YouTubeEmbed({ videoId }) {
  return (
    <YouTube
      videoId={videoId}
      opts={{
        width: "100%",
        height: "315",
      }}
    />
  );
}
