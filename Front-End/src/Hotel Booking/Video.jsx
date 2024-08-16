import React from "react";
export default function Video({ videoSrc }) {
  return (
    <div>
      <video
        className="video-container"
        src={`/${videoSrc}`}
        autoPlay
        loop
        muted
      />
    </div>
  );
}
