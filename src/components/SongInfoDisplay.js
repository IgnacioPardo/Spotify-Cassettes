import React from "react";
import { formatTime } from "../utils.js";
import { PlayerControls } from "./PlayerControls.js";

export const SongInfoDisplay = ({ userData, currentSong, currentItemId, currentSongTime, currentSongDuration, setCurrentSongTime, setControlAction }) => {
  return <div className="info" id="info_panel">
    {userData?.display_name ? (
      <h1 className="user_name">
        {userData.display_name}'s <b>Spotify Cassettes 📼</b>
      </h1>
    ) : (
      <h1 className="user_name">Spotify Cassettes 📼</h1>
    )}
    <br></br>
    <div
      className="song_info"
      style={{
        opacity: currentSong ? "1" : "0",
        transition: "opacity 0.5s ease-in-out",
      }}
    >
      <div className="song_info_display">
        {currentSong?.image ? (
          <div className="song_info_image">
            <img src={currentSong?.image} alt="Album Artwork" />
          </div>
        ) : (
          <></>
        )}
        <div className="song_info_texts">
          <h2>{currentSong?.name}</h2>
          <h3>
            {currentSong?.album} {currentItemId ? "-" : ""}{" "}
            {currentSong?.artist}
          </h3>
        </div>
      </div>
    </div>
    <br></br>
    <br></br>
    <div
      className="player_time"
      style={{
        opacity: currentSong ? "1" : "0",
        transition: "opacity 0.5s ease-in-out",
      }}
    >
      <div className="player_time_text">
        {formatTime(currentSongTime)} / {formatTime(currentSongDuration)}
      </div>

      <div
        className="player_time_bar"
        onClick={(e) => {
          let audio = document.querySelector("#musicPlayer");
          let rect = e.target.getBoundingClientRect();
          let x = e.clientX - rect.left;
          let width = rect.right - rect.left;
          let percent = x / width;
          audio.currentTime = percent * audio.duration;
          setCurrentSongTime(audio.currentTime);
        }}
      >
        <div
          className="player_time_bar_progress"
          style={{
            width: `${(currentSongTime / currentSongDuration) * 100}%`,
          }}
        ></div>
      </div>
      <br></br>
      <PlayerControls setControlAction={setControlAction} />
    </div>
  </div>;
};
