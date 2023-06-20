// import clickSound from "./components/sounds/click.mp3";
// import switchSound from "./components/sounds/switch.mp3";
// import rewindSound from "./components/sounds/rewind.mp3";
// import forwardSound from "./components/sounds/fforward.mp3";

const clickSound = "/audios/sounds/click.mp3";
const switchSound = "/audios/sounds/switch.mp3";
const rewindSound = "/audios/sounds/rewind.mp3";
const forwardSound = "/audios/sounds/fforward.mp3";

export const colors = ["#4cb8f5", "#a6e630", "#f5e82f", "#E75776", "#414073", "#4C3B4D"];

export const bestColorByLuma = (colors) => {
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

export const sortColorsByLuma = (colors) => {
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

export const Color2RGB = (color) => {
  return `rgb(${color[0]}, ${color[1]}, ${color[2]})`
}


export const noteByKey = (key) => {
    var notes = ["C", "C♯", "D", "D♯", "E", "F", "F♯", "G", "G♯", "A", "A♯", "B"];
    return notes[key];
}

export const playSound = (sound) => {
  let sounds = {
    click: clickSound,
    switch: switchSound,
    rewind: rewindSound,
    forward: forwardSound,
  };

  let audio = new Audio(sounds[sound]);
  let playPromise = audio.play();

  if (playPromise !== undefined) {
    playPromise.then((_) => { }).catch((error) => { });
  }
}

export const formatTime = (time) => {
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

export function generateRandomString(length) {
  var text = '';
  var possible = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';

  for (var i = 0; i < length; i++)
    text += possible.charAt(Math.floor(Math.random() * possible.length));

  return text;
}
