const QUERY_STRINGS = window.location.search;
const URL_PARAMS = new URLSearchParams(QUERY_STRINGS);
const TIME = parseInt(URL_PARAMS.get("time")) || 5;
const INC = parseInt(URL_PARAMS.get("inc")) || 0;
const TICK = new Audio("/sounds/tick.ogg");

function getData() {
  return {
    time: TIME,
    inc: INC,
    player1Time: getTimeMillis(),
    player2Time: getTimeMillis(),
    increment: getIncMillis(),
    isPlaying: false,
    isPlayer1Turn: true,
    interval: null,
    updateTimePlayer1: (data) => {
      if (data.player1Time > 0) {
        data.player1Time -= 10;
      }
    },
    updateTimePlayer2: (data) => {
      if (data.player2Time > 0) {
        data.player2Time -= 10;
      }
    },
    openModal: false,
  };
}

function getTimeMillis() {
  return TIME * 60000;
}

function getIncMillis() {
  return INC * 1000;
}

function msToMin(millis) {
  let sec = Math.floor(millis / 1000);
  let hrs = Math.floor(sec / 3600);
  sec -= hrs * 3600;
  let min = Math.floor(sec / 60);
  sec -= min * 60;
  sec = "" + sec;
  sec = ("00" + sec).substring(sec.toString().length);
  if (hrs > 0) {
    min = "" + min;
    min = ("00" + min).substring(min.toString().length);
    return hrs + ":" + min + ":" + sec;
  } else {
    return min + ":" + sec;
  }
}

function setTimer(interval, func, data) {
  window.clearInterval(interval);
  TICK.play();
  interval = window.setInterval(func, 10, data);
  return interval;
}

function setClock(time, inc) {
  window.location.href = "?time=" + time + "&inc=" + inc;
}
