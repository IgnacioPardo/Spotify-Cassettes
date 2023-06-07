import './App.css';
import React, { useState, useEffect } from 'react';
import CassetteGallery from './components/CassetteGallery';

import playPauseIcon from './components/icons/play_pauseIcon.svg'
import stopIcon from './components/icons/stopIcon.svg'
import rewindIcon from './components/icons/rewindIcon.svg'
import forwardIcon from './components/icons/forwardIcon.svg'

import clickSound from './components/sounds/click.mp3'
import switchSound from './components/sounds/switch.mp3'
import rewindSound from './components/sounds/rewind.mp3'
import forwardSound from './components/sounds/fforward.mp3'

const PlayerIcon = ({name}) => {
  // Player icons
  let icons = {
    play_pause: playPauseIcon,
    stop: stopIcon,
    rewind: rewindIcon,
    forward: forwardIcon,
  }
  
  return (
    <div className="player_icon" id={name}>
      <img src={icons[name]} alt={name} />
    </div>
  )
}

const PlayerControls = ({setControlAction}) =>{
  return (<>
    <div className="player_controls">
      <button className="player_btn" id="btn_rewind" onClick={() => {
        setControlAction("rewind")
      }}>
        <PlayerIcon name="rewind" />
      </button>

      <button className="player_btn" id="btn_play_pause" onClick={() => {
        setControlAction("play_pause")
      }}>
        <PlayerIcon name="play_pause" />
      </button>

      <button className="player_btn" id="btn_stop" onClick={() => {
        setControlAction("stop")

      }}>
        <PlayerIcon name="stop" />
      </button>

      <button className="player_btn" id="btn_forward" onClick={() => {
        setControlAction("forward")
      }}>
        <PlayerIcon name="forward" />
      </button>
    </div>
  </>)
}

let songs = [
  {
    name: "Nos Siguen Pegando Abajo",
    album: "Clics modernos",
    artist: "Charly García",
    bg_color: "#4cb8f5",
    url: "/audios/Nos Siguen Pegando Abajo.mp3",
  },
  {
    name: "Promesas Sobre El Bidet",
    album: "Piano Bar",
    artist: "Charly García",
    bg_color: "#a6e630",
    url: "/audios/Promesas Sobre El Bidet.mp3",
  },
  {
    name: "Hablando a Tu Corazón",
    album: "Tango",
    artist: "Charly García",
    bg_color: "#f5e82f",
    url: "/audios/Hablando a Tu Corazon.mp3",
  },
  {
    name: "No Voy en Tren",
    album: "Parte de la religión",
    artist: "Charly García",
    bg_color: "#E75776",
    url: "/audios/No Voy en Tren.mp3",
  },
  {
    name: "La Grasa de las Capitales",
    album: "La Grasa de las Capitales",
    artist: "Serú Girán",
    bg_color: "#E75776",
    url: "/audios/La Grasa de las Capitales.mp3",
  }
]

// fill with 10 empty songs

for (let i = 0; i < 5; i++){
  songs.push({
    name: "",
    album: "",
    artist: "",
    bg_color: "#E75776",
    url: "",
  })
}

// fill with auto numerated ids 

for (let i = 0; i < songs.length; i++){
  songs[i].id = i
}

function formatTime(time){
  // Format time to mm:ss

  let minutes = Math.floor(time / 60)
  let seconds = Math.floor(time % 60)

  if (minutes < 10){
    minutes = "0" + minutes
  }
  if (seconds < 10){
    seconds = "0" + seconds
  }

  return `${minutes}:${seconds}`
}

function App() {

  const [currentItemId, setCurrentItemId] = useState(null)
  const [currentSong, setCurrentSong] = useState("")
  const [currentSongTime, setCurrentSongTime] = useState(0)
  const [currentSongDuration, setCurrentSongDuration] = useState(0)

  const [controlAction, setControlAction] = useState("play_pause")
  const [scrollShift, setScrollShift] = useState(-8)

  const [isFullscreen, setFullscreen] = useState(false)

  useEffect(() => {
    // Set fullscreen
    let app = document.body;
    if (isFullscreen){
      //app.requestFullscreen()
    }
    else{
      //document.exitFullscreen()
    }
  }, [isFullscreen])

  const handleScroll = event => {
    // Handle scroll event

    var song_count = songs.length;  
    setScrollShift(scrollShift + event.deltaY*0.1)
  };

  function playSound(sound) {
    let sounds = {
      click: clickSound,
      switch: switchSound,
      rewind: rewindSound,
      forward: forwardSound,
    }

    let audio = new Audio(sounds[sound])
    let playPromise = audio.play()

    if (playPromise !== undefined) {
      playPromise.then(_ => {
      }).catch(error => {});
    }
  }

  useEffect(() => {
    let audio = document.querySelector("#musicPlayer")
    let playPromise;
    if (controlAction === "play_pause"){
      setControlAction("")
      if (audio.paused){
        playPromise = audio.play()
      }
      else{
        playPromise = audio.pause()
      }
      playSound("click")

    }
    else if (controlAction === "stop"){
      setControlAction("play_pause")
      setControlAction("play_pause")
      var playingCassette = document.querySelector(".cassette.playing")
      console.log(playingCassette)
      if (playingCassette){
        playingCassette.click()
      }
    }
    else if (controlAction === "rewind"){
      var pausePromise = audio.pause()

      playSound("rewind")

      // Decrement current time by 1 second every 100ms
      
      let interval = setInterval(() => {
        audio.currentTime -= 1;
        setCurrentSongTime(audio.currentTime);
      }, 100);

      setTimeout(() => {
        clearInterval(interval);
        setCurrentSongTime(audio.currentTime);

        if (pausePromise !== undefined) {
          pausePromise.then(_ => {
            if (audio.paused) {
              playPromise = audio.play();
            }
          }).catch(error => {
            console.log(error)
          });
        }

        setControlAction("play_pause")
      }, 3000);

    }
    else if (controlAction === "forward"){
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

        if (pausePromise !== undefined){
          pausePromise.then(_ => {
            if (audio.paused){
              playPromise = audio.play();
            }
          }).catch(error => {
            console.log(error)
          });
        }

      }, 4000);
    }

    if (playPromise !== undefined){
      playPromise.then(_ => {
      }
      )
      .catch(error => {
      }
      );  
    }

  }, [controlAction])

  useEffect(() => {
    if (currentItemId !== null){
      setCurrentSong(songs[currentItemId].url)

      let audio = document.querySelector("#musicPlayer")
      audio.addEventListener("timeupdate", () => {
        setCurrentSongTime(audio.currentTime)
        setCurrentSongDuration(audio.duration)
      })

      setScrollShift(-currentItemId - 5)
    }
    else {
      setCurrentSong("")
    }
    playSound("switch")
  }, [currentItemId])

  useEffect(() => {
    if (currentSong === ""){
      setCurrentSongTime(0)
      setCurrentSongDuration(0)
    }
  }, [currentSong])

  useEffect(() => {
    // Catch NaN values
    if (isNaN(currentSongTime)){
      setCurrentSongTime(0)
    }
    if (isNaN(currentSongDuration)){
      setCurrentSongDuration(0)
    }

  }, [currentSongDuration, currentSongTime])

  return (
    <div id="App" onWheel={handleScroll}>

      <div className="info" id="info_panel">
        
        <h1>Spotify Cassettes</h1>
        <br></br>
        <div className="song_info"
          style={{
            opacity: currentSong ? "1" : "0",
            transition: "opacity 0.5s ease-in-out"
          }}
        >
          <h2>{songs[currentItemId]?.name}</h2>
          <h3>{songs[currentItemId]?.album} {currentItemId ? "-" : ""} {songs[currentItemId]?.artist}</h3>
        </div>
        <br></br><br></br>
        <div className="player_time" 
            style={{
              opacity: currentSong ? "1" : "0",
              transition: "opacity 0.5s ease-in-out"
            }}
        >
          <div className="player_time_text">
            {formatTime(currentSongTime)} / {formatTime(currentSongDuration)}
          </div>
          
          <div className="player_time_bar" 
          
            onClick={e => {
              let audio = document.querySelector("#musicPlayer")
              let rect = e.target.getBoundingClientRect()
              let x = e.clientX - rect.left
              let width = rect.right - rect.left
              let percent = x / width
              audio.currentTime = percent * audio.duration
              setCurrentSongTime(audio.currentTime)
            }}    
          >
            <div 
              className="player_time_bar_progress"
              style={{width: `${currentSongTime / currentSongDuration * 100}%`}}
            >
            </div>
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
          transform: currentItemId !== null ? "translateY(400px)" : "translateY(300px)",
          transition: "transform 0.5s ease-in-out"
        }}
        shift={scrollShift}
        isFullscreen={isFullscreen}
        setFullscreen={setFullscreen}
      />

      <audio id="musicPlayer" src={currentSong} controls autoPlay style={{display: "none"}}
        onEnded={() => {
          setControlAction("stop")
        }}
        preload="auto"
      />
    </div>
  );
}

export default App;
