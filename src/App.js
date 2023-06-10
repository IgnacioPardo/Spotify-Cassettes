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

import { fetchTopTracks, fetchTopArtists, fetchUserData } from "./spotify.js";
import defaultSongs from "./defaultSongs.js";

//import ColorThief from 'colorthief';
import ColorThief from '../node_modules/colorthief/dist/color-thief.mjs';

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

function bestColorByLuma(colors) {
  // Find the best color by luma
  var bestColor = colors[0];
  var bestLuma = 0;

  colors.forEach((color) => {
    var luma = 0.2126 * color[0] + 0.7152 * color[1] + 0.0722 * color[2];

    if (luma > bestLuma) {
      bestLuma = luma;
      bestColor = color;
    }
  });

  return bestColor;
}

function sortColorsByLuma(colors) {
  // Sort colors by luma
  var sortedColors = [];

  colors.forEach((color) => {
    var luma = 0.2126 * color[0] + 0.7152 * color[1] + 0.0722 * color[2];

    sortedColors.push([color, luma]);
  });

  sortedColors.sort((a, b) => {
    return b[1] - a[1];
  });
  
  return sortedColors.map((color) => {
    return color[0];
  });
}

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

function App() {
  const [currentItemId, setCurrentItemId] = useState(null);
  const [currentSong, setCurrentSong] = useState("");
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

  const [loadedCoverArts, setLoadedCoverArts] = useState([]);

  useEffect(() => {
    // Fetch user data
    var searchParams = new URLSearchParams(window.location.search);

    if (searchParams.has("access_token")) {
      var accessToken = searchParams.get("access_token");

      setIsSignedIn(true);

      console.log(accessToken);
      try {
        fetchUserData(accessToken, setUserData);

        fetchTopArtists(accessToken, setUserTopArtists);

        fetchTopTracks(accessToken, setUserTopTracks);
      } catch (err) {
        console.error(err);
      }
    } else {
      console.log("No access token");
    }
  }, []);

  useEffect(() => {
    console.log({
      topArtists: userTopArtists,
      topTracks: userTopTracks,
      userData: userData,
    });
  }, [userTopArtists, userTopTracks, userData]);

  useEffect(() => {
    console.log({ loadedCoverArts });
    if (userTopTracks && loadedCoverArts.length == songs.length) {

      var coloredSongs = [];

      loadedCoverArts.forEach((item) => {
        var colorThief = new ColorThief();
        // var dominantColor = colorThief.getColor(item[1]);
        var pallette = colorThief.getPalette(item[1], 3);
        //console.log({ sortedColorsByLuma: sortColorsByLuma(pallete) });
        var dominantColor = sortColorsByLuma(pallette)[0];
        var rgb = `rgb(${dominantColor[0]}, ${dominantColor[1]}, ${dominantColor[2]})`;
        
        console.log({rgb});
        console.log({item});

        var song = songs.find((song) => {
          return song.id == item[0];
        });

        song.bg_color = rgb;
        song.pallette = pallette;
        console.log({song});
        coloredSongs.push(song);
      });

      console.log({coloredSongs});

      setSongs(coloredSongs);
    }

  }, [loadedCoverArts, userTopTracks]);
  
  // set songs
  useEffect(() => {
    if (userTopTracks) {
      let newSongs = [];

      let filteredTracks = userTopTracks.items.filter((item) => {
        return item.preview_url != null;
      });

      filteredTracks.slice(0, 10).forEach((item, index) => {
        var artwork_url = item.album.images[0].url;
        if (artwork_url != null) {
          // retrieve artwork from spotify api
          // find most prominent color
          var img = new Image();
          img.crossOrigin = "Anonymous";
          img.src = artwork_url;
          
          img.onload = () => {
            setLoadedCoverArts((prevLoadedCoverArts) => [
              ...prevLoadedCoverArts,
              [index, img],
            ]);
          }

        }
        newSongs.push({
          name: item.name,
          album: item.album.name,
          artist: item.artists[0].name,
          bg_color: colors[index % colors.length],
          url: item.preview_url,
          id: index,
          genres: item.artists[0].genres,
          popularity: item.popularity,
          spotify_url: item.external_urls.spotify,
          image: item.album.images[0].url,
        });
      });
      //setTopSongs(newSongs);
      setSongs(newSongs);
      console.log({ newSongs });
    }
  }, [userTopTracks]);

  const handleScroll = (event) => {
    // Handle scroll event

    setScrollShift(scrollShift + event.deltaY * 0.1);
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
      setControlAction("play_pause");
      setControlAction("play_pause");
      var playingCassette = document.querySelector(".cassette.playing");
      console.log(playingCassette);
      if (playingCassette) {
        playingCassette.click();
      }
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
  }, [controlAction]);

  useEffect(() => {
    if (currentItemId !== null) {
      setCurrentSong(songs[currentItemId].url);

      let audio = document.querySelector("#musicPlayer");
      audio.addEventListener("timeupdate", () => {
        setCurrentSongTime(audio.currentTime);
        setCurrentSongDuration(audio.duration);
      });

      setScrollShift(-currentItemId - 5);

      console.log(songs[currentItemId]);
    } else {
      setCurrentSong("");
    }
    playSound("switch");
  }, [currentItemId, songs]);

  useEffect(() => {
    if (currentSong === "") {
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
        {!isSignedIn ? (
          <a className="login_btn" href="/login">
            <img
              src={spotifyLogo}
              alt="Spotify Logo"
              className="spotify_logo"
            />
            <span>Login with Spotify</span>
          </a>
        ) : (
          <a className="login_btn" href="/app">
            <img
              src={spotifyLogo}
              alt="Spotify Logo"
              className="spotify_logo"
            />
            <span>Logout</span>
          </a>
        )}
      </div>
      <div className="info" id="info_panel">
        <h1>Spotify Cassettes</h1>
        <br></br>
        <div
          className="song_info"
          style={{
            opacity: currentSong ? "1" : "0",
            transition: "opacity 0.5s ease-in-out",
          }}
        >
          <div className="song_info_display">
            <div className="song_info_image">
              <img src={songs[currentItemId]?.image} alt="Album Artwork" />
            </div>
            <div className="song_info_texts">
              <h2>{songs[currentItemId]?.name}</h2>
              <h3>
                {songs[currentItemId]?.album} {currentItemId ? "-" : ""}{" "}
                {songs[currentItemId]?.artist}
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
        setCurrentItemId={setCurrentItemId}
        currentItemId={currentItemId}
        style={{
          transform:
            currentItemId !== null ? "translateY(400px)" : "translateY(300px)",
          transition: "transform 0.5s ease-in-out",
        }}
        shift={scrollShift}
        isFullscreen={isFullscreen}
        setFullscreen={setFullscreen}
      />

      <audio
        id="musicPlayer"
        src={currentSong}
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
