import React from "react";
import spotifyLogo from "./icons/spotify.svg";
import { TimeRangeSelector } from "./TimeRangeSelector.js";

export const MenuBar = ({ isSignedIn, setTimeRange, timeRange, userData, isLoading, displayUserData, showPlots, setShowPlots }) => {
  return (
  <div className="menu" style={{
    opacity: isLoading ? "0" : "1",
    transition: "opacity 0.5s ease-in-out",
  }}>
      <div
        style={{
          // transition: "opacity 0.5s ease-in-out",
          cursor: "pointer",
          width: "40px",
          height: "40px",
          borderRadius: "50%",
          backgroundColor: "black",
          fontFamily: "SF Pro",
          fontSize: "14px",
          fontWeight: "bold",
          color: "white",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
        }}
        onClick={() => {
          setShowPlots(!showPlots);
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
            alt="{userData.display_name}'s Profile Picture"
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
