import React from "react";
import { PlayerIcon } from "./PlayerIcon.js";

export const PlayerControls = ({ setControlAction }) => {
  return (
    <>
      <div className="player_controls">
        <button
          className="player_btn"
          id="btn_rewind"
          onClick={() => {
            setControlAction("rewind");
          }}
        >
          <PlayerIcon name="rewind" />
        </button>

        <button
          className="player_btn"
          id="btn_play_pause"
          onClick={() => {
            setControlAction("play_pause");
          }}
        >
          <PlayerIcon name="play_pause" />
        </button>

        <button
          className="player_btn"
          id="btn_stop"
          onClick={() => {
            setControlAction("stop");
          }}
        >
          <PlayerIcon name="stop" />
        </button>

        <button
          className="player_btn"
          id="btn_forward"
          onClick={() => {
            setControlAction("forward");
          }}
        >
          <PlayerIcon name="forward" />
        </button>
      </div>
    </>
  );
};
