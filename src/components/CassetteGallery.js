import React from "react";
import { Cassette } from "./Cassette.js";

const CassetteGallery = (props) => {
  return (
    <>
      <div
        className="cassette-gallery"
        id="cassette-gallery"
        style={props.style}
        onWheel={props.handleScroll}
      >
        {props.songs.map((song, index) => {
          return (
            <Cassette
              songs={props.songs}
              setSongs={props.setSongs}
              songId={index}
              key={index}
              setCurrentItemId={props.setCurrentItemId}
              currentItemId={props.currentItemId}
              shift={props.shift}
              isFullscreen={props.isFullscreen}
              setFullscreen={props.setFullscreen}
              timeRange={props.timeRange}
            />
          );
        })}
      </div>
    </>
  );
};

export default CassetteGallery;
