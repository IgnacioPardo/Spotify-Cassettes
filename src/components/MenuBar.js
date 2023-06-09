import React from "react";
import spotifyLogo from "./icons/spotify.svg";
import { TimeRangeSelector } from "./TimeRangeSelector.js";
import { stopCassette } from "./stopCassette.js";

export const MenuBar = ({ isSignedIn, setTimeRange, timeRange, userData, isLoading, displayUserData, showPlots, setShowPlots, setControlAction }) => {
  return (
  <div className="menu" style={{
    opacity: isLoading ? "0" : "1",
    transition: "opacity 0.5s ease-in-out",
  }}>
      
      <div
        className={showPlots ? "menu_btn active" : "menu_btn"}
        onClick={() => {
          // Stop playing cassette if it's playing, wait 1 second for it to stop, then show plots

          if (!showPlots)
            stopCassette(setControlAction);

          setTimeout(() => {
            setShowPlots(!showPlots);
          }, showPlots ? 0 : 500);
        }}
      >
        {!showPlots ? "􀜋" : "􀁡"}
      </div>

    {isSignedIn ? (
      <>
        <TimeRangeSelector setRange={setTimeRange} timeRange={timeRange} />
        <div className="user_info">
          <img
            src={userData?.images[0].url}
            alt={`${userData.display_name}'s Profile Picture`}
            className="user_profile_pic" 
            style={{ 
              opacity: isLoading ? "0" : "1",
              transition: "opacity 0.5s ease-in-out",
              cursor: "pointer",
            }}
            onClick={displayUserData}
          />
          <a className="logout_btn spotify_btn" href="/app">
            <img
              src={spotifyLogo}
              alt="Spotify Logo"
              className="spotify_logo" 
            />
            <span>Logout</span>
          </a>
        </div>
      </>
    ) : 
        !showPlots ? 
    (
      <>
        <a className="login_btn spotify_btn" href="/login">
          <img
            src={spotifyLogo}
            alt="Spotify Logo"
            className="spotify_logo" />
          <span>Login with Spotify</span>
        </a>
      </>
    ) : <></>
  }
  </div>);
};
