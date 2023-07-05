import "./App.css";
import React, { useState, useEffect } from "react";

import CassetteGallery from "./components/CassetteGallery.js";
import { CassetteAnatomy } from "./components/CassetteAnatomy.js";

import { MenuBar } from "./components/MenuBar.js";
import { SongInfoDisplay } from "./components/SongInfoDisplay.js";
import { LoadingOverlay } from "./components/LoadingOverlay.js";
import { DownloadDataButton } from "./components/DownloadDataButton.js";
import { GenerateSocialMediaPostButton } from "./components/GenerateSocialMediaPost.js";

import { fetchTopTracks, fetchTopArtists, fetchUserData } from "./spotify.js";

import { colors, playSound } from "./utils.js";
import { handleAccessTokenError } from "./handleAccessTokenError.js";

import defaultSongs from "./data/cassettes.json";

import { PlotModal } from "./PlotModal.js";

var last = JSON.parse(JSON.stringify(defaultSongs.at(-1)));
defaultSongs.push(last);
defaultSongs.at(-1).id = defaultSongs.length - 1;
// console.log(defaultSongs);

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

  const [isLoading, setIsLoading] = useState(false);

  const [showPlots, setShowPlots] = useState(false);
  const [plotKeyName, setPlotKeyName] = useState("danceability");

  const [showAnatomy, setShowAnatomy] = useState(true);
  const [showingSocial, setShowingSocial] = useState(false);

  var searchParams = new URLSearchParams(window.location.search);

  const handleScroll = (event) => {
    // Handle scroll event
    setScrollShift(
      Math.min(0, Math.max(-16, scrollShift + event.deltaY * 0.1))
    );
  };

  useEffect(() => {
    setTimeout(() => {
      setIsLoading(false);
      setShowAnatomy(false);
    }, 2000);
  }, [songs, timeRange]);

  useEffect(() => {
    // Fetch user data
    if (searchParams.has("access_token")) {
      var accessToken = searchParams.get("access_token");
      console.log(accessToken);
      setIsLoading(true);

      fetchUserData(accessToken, setUserData, handleAccessTokenError, () => { });
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
    setScrollShift(-8);
    setControlAction("stop");
    setIsLoading(true);
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
      let newSongs = [];
      let filteredTracks = userTopTracks.items.filter((item) => {
        return item.preview_url != null;
      });

      filteredTracks.slice(0, 11).forEach((item, index) => {
        newSongs.push({
          name: item.name,
          album: item.album.name,
          artwork: item.album.images[0].url,
          artist: item.artists.map((artist) => artist.name).join(", "),
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

  useEffect(() => {
    if (controlAction === "") {
      return;
    }

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
      setScrollShift(-8);
      
      var playingCassette = document.querySelector(".cassette.playing");
      if (playingCassette) {
       console.log(playingCassette);
       // Perform a click on the cassette to stop it
       console.log(playingCassette.querySelector(".clickable-cassette-shutdown"));        
       playingCassette.querySelector(".clickable-cassette-shutdown").click();
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
      playPromise.then((_) => { }).catch((error) => { });
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

  const displayUserData = () => {
    if (userData) {
      alert(`
        Name: ${userData.display_name}
        Email: ${userData.email}
        Country: ${userData.country}
        Followers: ${userData.followers.total}
        Spotify URL: ${userData.external_urls.spotify}
      `);
    }
  };

  return (
    <div
      id="App"
    //onWheel={handleScroll}
    >
      <MenuBar
        isSignedIn={isSignedIn}
        setTimeRange={setTimeRange}
        timeRange={timeRange}
        userData={userData}
        isLoading={isLoading}
        displayUserData={displayUserData}
        showPlots={showPlots}
        setShowPlots={setShowPlots}
        setControlAction={setControlAction}
      />

      <SongInfoDisplay
        userData={userData}
        currentSong={currentSong}
        currentSongTime={currentSongTime}
        currentSongDuration={currentSongDuration}
        controlAction={controlAction}
        setControlAction={setControlAction}
        setCurrentSongTime={setCurrentSongTime}
        setCurrentSongDuration={setCurrentSongDuration}
      />

      <PlotModal
        showPlots={showPlots}
        songs={songs}
        plotKeyName={plotKeyName}
        setPlotKeyName={setPlotKeyName}
        setControlAction={setControlAction}
     />

      <CassetteAnatomy
        song={currentSong}
        songs={songs}
        currentItemId={currentItemId ? currentItemId : 0}
        username={userData?.display_name}
        timeRange={timeRange}
        setIsLoading={setIsLoading}
        setShowAnatomy={setShowAnatomy}
        showAnatomy={showAnatomy}
      />

      <LoadingOverlay 
        isLoading={isLoading} 
        showAnatomy={showAnatomy}
      />

      <CassetteGallery
        songs={songs}
        setSongs={setSongs}
        setCurrentItemId={setCurrentItemId}
        currentItemId={currentItemId}
        style={{
          transform:
            currentItemId !== null ? "translateY(500px)" : "translateY(340px)",
          transition: "transform 0.5s ease-in-out",
          filter: isLoading ? "blur(50px) opacity(100%)" : "none",
        }}
        shift={scrollShift}
        isFullscreen={isFullscreen}
        setFullscreen={setFullscreen}
        timeRange={timeRange}
        isModalOpen={showPlots}
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

      {/* {isSignedIn ? <DownloadDataButton data={songs} /> : <></>} */}
      <GenerateSocialMediaPostButton
        song={currentSong}
        songs={songs}
        username={userData?.display_name}
        timeRange={timeRange}
        currentItemId={currentItemId ? currentItemId : 0}
        setIsLoading={setIsLoading}
        isLoading={isLoading}
        setShowAnatomy={setShowAnatomy}
        showingSocial={showingSocial}
        setShowingSocial={setShowingSocial}
      />

      <button className="open_anatomy round_btn" onClick={() => {
        setShowAnatomy(true);
        setIsLoading(true);
        setShowingSocial(false);
      }}
        style={{
          display: showAnatomy ? "none" : "flex",
          flexDirection: "column",
          justifyContent: "center",
          alignItems: "center",
          position: "absolute",
          bottom: "40px",
          right: "40px",
        }}
      >
        􀯏
      </button>
    </div>
  );
}

export default App;
