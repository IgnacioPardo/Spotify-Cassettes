import "./App.css";
import React, { useState, useEffect } from "react";
import CassetteGallery from "./components/CassetteGallery.js";

import playPauseIcon from "./components/icons/play_pauseIcon.svg";
import stopIcon from "./components/icons/stopIcon.svg";
import rewindIcon from "./components/icons/rewindIcon.svg";
import forwardIcon from "./components/icons/forwardIcon.svg";

import clickSound from "./components/sounds/click.mp3";
import switchSound from "./components/sounds/switch.mp3";
import rewindSound from "./components/sounds/rewind.mp3";
import forwardSound from "./components/sounds/fforward.mp3";

import spotifyLogo from "./components/icons/spotify.svg";

import {
  fetchTopTracks,
  fetchTopArtists,
  fetchUserData,
  fetchTracksAudioFeatures,
} from "./spotify.js";
// import { fetchTopTracksRateLimited, fetchTopArtistsRateLimited, fetchUserDataRateLimited, fetchTracksAudioFeaturesRateLimited } from "./spotify.js";

import defaultSongs from "./defaultSongs.js";

// import ColorThief from 'colorthief';
import { sortColorsByLuma } from "./utils.js";

// const fetchTopTracks = fetchTopTracksRateLimited,
//   fetchTopArtists = fetchTopArtistsRateLimited,
//   fetchUserData = fetchUserDataRateLimited,
//   fetchTracksAudioFeatures = fetchTracksAudioFeaturesRateLimited;

const PlayerIcon = ({ name }) => {
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

const TimeRangeSelector = ({ setRange, timeRange }) => {
  return (
    <>
      <div className="time_range_selector switch-field">
        <input
          type="radio"
          id="short_term"
          name="time_range"
          value="short_term"
          checked={timeRange === "short_term"}
          onChange={() => setRange("short_term")}
        />
        <label htmlFor="short_term">4 Weeks</label>
        <input
          type="radio"
          id="medium_term"
          name="time_range"
          value="medium_term"
          checked={timeRange === "medium_term"}
          onChange={() => setRange("medium_term")}
        />
        <label htmlFor="medium_term">6 Months</label>
        <input
          type="radio"
          id="long_term"
          name="time_range"
          value="long_term"
          checked={timeRange === "long_term"}
          onChange={() => setRange("long_term")}
        />
        <label htmlFor="long_term">All Time</label>
      </div>
    </>
  );
};

const PlayerControls = ({ setControlAction }) => {
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

let colors = ["#4cb8f5", "#a6e630", "#f5e82f", "#E75776", "#414073", "#4C3B4D"];

function formatTime(time) {
  // Format time to mm:ss

  let minutes = Math.floor(time / 60);
  let seconds = Math.floor(time % 60);

  if (minutes < 10) {
    minutes = "0" + minutes;
  }
  if (seconds < 10) {
    seconds = "0" + seconds;
  }

  return `${minutes}:${seconds}`;
}

function handleAccessTokenError(err) {
  // If access token is invalid, redirect to refresh_token endpoint with current refresh token
  console.log("err", err);
  if (err.status === 401) {
    //var searchParams = new URLSearchParams(window.location.search);
    //let refresh_token = searchParams.get("refresh_token");
    //console.log("refresh_token", refresh_token);
    //window.location.redirect(`/refresh_token?refresh_token=${refresh_token}`);
    // window.location.href = "/app?expired=true&refresh_token=${refresh_token}";

    alert("Your session has expired. Please log in again.");
    window.location.href = "/login";
  }
}

function App() {
  const [currentItemId, setCurrentItemId] = useState(null);
  const [currentSong, setCurrentSong] = useState(null);
  const [currentSongTime, setCurrentSongTime] = useState(0);
  const [currentSongDuration, setCurrentSongDuration] = useState(0);

  const [controlAction, setControlAction] = useState("play_pause");
  const [scrollShift, setScrollShift] = useState(-8);

  const [isFullscreen, setFullscreen] = useState(false);

  const [userData, setUserData] = useState(null);
  const [userTopArtists, setUserTopArtists] = useState(null);
  const [userTopTracks, setUserTopTracks] = useState(null);
  const [isSignedIn, setIsSignedIn] = useState(false);

  const [songs, setSongs] = useState(defaultSongs);

  const [timeRange, setTimeRange] = useState("short_term");

  var searchParams = new URLSearchParams(window.location.search);

  useEffect(() => {
    // Fetch user data
    if (searchParams.has("access_token")) {
      var accessToken = searchParams.get("access_token");
      console.log(accessToken);

      fetchUserData(accessToken, setUserData, handleAccessTokenError, () => {});
      fetchTopArtists(
        accessToken,
        setUserTopArtists,
        handleAccessTokenError,
        timeRange
      );
      fetchTopTracks(
        accessToken,
        setUserTopTracks,
        handleAccessTokenError,
        timeRange
      );
    } else {
      console.log("No access token");
    }
  }, []);

  useEffect(() => {
    setControlAction("stop");
    if (searchParams.has("access_token")) {
      var accessToken = searchParams.get("access_token");
      fetchTopTracks(
        accessToken,
        setUserTopTracks,
        handleAccessTokenError,
        timeRange
      );
    }
  }, [timeRange]);

  useEffect(() => {
    if (userTopTracks && userTopArtists && userData) {
      setIsSignedIn(true);
      console.log({
        topArtists: userTopArtists,
        topTracks: userTopTracks,
        userData: userData,
      });
    }
  }, [userTopArtists, userTopTracks, userData]);

  // set songs
  useEffect(() => {
    if (userTopTracks) {
      var searchParams = new URLSearchParams(window.location.search);
      let newSongs = [];

      let filteredTracks = userTopTracks.items.filter((item) => {
        return item.preview_url != null;
      });

      filteredTracks.slice(0, 10).forEach((item, index) => {
        newSongs.push({
          name: item.name,
          album: item.album.name,
          artwork: item.album.images[0].url,
          artist: item.artists[0].name,
          bg_color: colors[index % colors.length],
          url: item.preview_url,
          id: index,
          spotify_id: item.id,
          popularity: item.popularity,
          spotify_url: item.external_urls.spotify,
          image: item.album.images[0].url,
        });
      });
      setSongs(newSongs);
    }
  }, [userTopTracks]);

  const handleScroll = (event) => {
    // Handle scroll event
    setScrollShift(Math.min(0, Math.max(-16, scrollShift + event.deltaY * 0.1)));
      //scrollShift + event.deltaY * 0.1);
    console.log(scrollShift);
  };

  function playSound(sound) {
    let sounds = {
      click: clickSound,
      switch: switchSound,
      rewind: rewindSound,
      forward: forwardSound,
    };

    let audio = new Audio(sounds[sound]);
    let playPromise = audio.play();

    if (playPromise !== undefined) {
      playPromise.then((_) => {}).catch((error) => {});
    }
  }

  useEffect(() => {
    let audio = document.querySelector("#musicPlayer");
    let playPromise;
    if (controlAction === "play_pause") {
      setControlAction("");
      if (audio.paused) {
        playPromise = audio.play();
      } else {
        playPromise = audio.pause();
      }
      playSound("click");
    } else if (controlAction === "stop") {
      setControlAction("");
      var playingCassette = document.querySelector(".cassette.playing");
      // console.log(playingCassette);
      if (playingCassette) {
        playingCassette.click();
      }
      audio.pause();
      audio.currentTime = 0;
      setCurrentSongTime(0);
      setCurrentSongDuration(0);
      setCurrentSong(null);
    } else if (controlAction === "rewind") {
      var pausePromise = audio.pause();

      playSound("rewind");

      // Decrement current time by 1 second every 100ms

      let interval = setInterval(() => {
        audio.currentTime -= 1;
        setCurrentSongTime(audio.currentTime);
      }, 100);

      setTimeout(() => {
        clearInterval(interval);
        setCurrentSongTime(audio.currentTime);

        if (pausePromise !== undefined) {
          pausePromise
            .then((_) => {
              if (audio.paused) {
                playPromise = audio.play();
              }
            })
            .catch((error) => {
              console.log(error);
            });
        }

        setControlAction("play_pause");
      }, 1000);
    } else if (controlAction === "forward") {
      let pausePromise = audio.pause();

      playSound("forward");

      // Increment current time by 1 second every 100ms
      let interval = setInterval(() => {
        audio.currentTime += 1;
        setCurrentSongTime(audio.currentTime);
      }, 100);

      setTimeout(() => {
        clearInterval(interval);
        setCurrentSongTime(audio.currentTime);

        setControlAction("play_pause");

        if (pausePromise !== undefined) {
          pausePromise
            .then((_) => {
              if (audio.paused) {
                playPromise = audio.play();
              }
            })
            .catch((error) => {
              console.log(error);
            });
        }
      }, 1000);
    }

    if (playPromise !== undefined) {
      playPromise.then((_) => {}).catch((error) => {});
    }
  }, [controlAction, currentSong]);

  useEffect(() => {
    console.log("current item id changed");
    if (currentItemId !== null) {
      var song = songs.find((song) => {
        return song.id === currentItemId;
      });
      setCurrentSong(song);
      console.log("current song: ", song);

      let audio = document.querySelector("#musicPlayer");
      audio.addEventListener("timeupdate", () => {
        setCurrentSongTime(audio.currentTime);
        setCurrentSongDuration(audio.duration);
      });
      setScrollShift(-currentItemId - 5);
    } else {
      console.log("current item id is null");
      setControlAction("stop");
      // setCurrentSong(null);
    }
    playSound("switch");
  }, [currentItemId, songs]);

  useEffect(() => {
    if (currentSong === null) {
      setCurrentSongTime(0);
      setCurrentSongDuration(0);
    }
  }, [currentSong]);

  useEffect(() => {
    // Catch NaN values
    if (isNaN(currentSongTime)) {
      setCurrentSongTime(0);
    }
    if (isNaN(currentSongDuration)) {
      setCurrentSongDuration(0);
    }
  }, [currentSongDuration, currentSongTime]);

  return (
    <div id="App" onWheel={handleScroll}>
      <div className="menu">
        {isSignedIn ? (
          <>
            <TimeRangeSelector setRange={setTimeRange} timeRange={timeRange} />
            <div className="user_info">
              <img
                src={userData?.images[0].url}
                alt="{userData.display_name}'s Profile Picture"
                className="user_profile_pic"
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
        ) : (
          <>
            <a className="login_btn spotify_btn" href="/login">
              <img
                src={spotifyLogo}
                alt="Spotify Logo"
                className="spotify_logo"
              />
              <span>Login with Spotify</span>
            </a>
          </>
        )}
      </div>
      <div className="info" id="info_panel">
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
      </div>

      <CassetteGallery
        songs={songs}
        setSongs={setSongs}
        setCurrentItemId={setCurrentItemId}
        currentItemId={currentItemId}
        style={{
          transform:
            currentItemId !== null ? "translateY(440px)" : "translateY(340px)",
          transition: "transform 0.5s ease-in-out",
        }}
        shift={scrollShift}
        isFullscreen={isFullscreen}
        setFullscreen={setFullscreen}
      />

      <audio
        id="musicPlayer"
        src={currentSong?.url}
        controls
        autoPlay
        style={{ display: "none" }}
        onEnded={() => {
          setControlAction("stop");
        }}
        preload="auto"
      />
    </div>
  );
}

export default App;
