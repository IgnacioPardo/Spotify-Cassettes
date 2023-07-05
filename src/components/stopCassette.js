export const stopCassette = (setControlAction) => {
  var playingCassette = document.querySelector(".clickable-cassette-shutdown");
  if (playingCassette) {
    playingCassette.click();
  }
  setControlAction("stop");
};
