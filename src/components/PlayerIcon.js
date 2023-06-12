import React from "react";
import playPauseIcon from "./icons/play_pauseIcon.svg";
import stopIcon from "./icons/stopIcon.svg";
import rewindIcon from "./icons/rewindIcon.svg";
import forwardIcon from "./icons/forwardIcon.svg";


export const PlayerIcon = ({ name }) => {
  // Player icons
  let icons = {
    play_pause: playPauseIcon,
    stop: stopIcon,
    rewind: rewindIcon,
    forward: forwardIcon,
  };

  return (
    <div className="player_icon" id={name}>
      <img src={icons[name]} alt={name} />
    </div>
  );
};
