const QUERY_STRINGS = window.location.search
const URL_PARAMS = new URLSearchParams(QUERY_STRINGS)
const MIN = parseInt(URL_PARAMS.get("min")) || 5
const INC = parseInt(URL_PARAMS.get("inc")) || 0
const P1_BUTTON = document.getElementById("player1")
const P2_BUTTON = document.getElementById("player2")
const TICK = new Audio("tick.ogg")

document.getElementById("restart").onclick = start
document.getElementById("pause").onclick = pause
P1_BUTTON.onclick = player1Playing
P2_BUTTON.onclick = player2Playing

let interval
let p1Time = MIN * 60000
let p2Time = MIN * 60000
let paused = false

start()

function start() {
  window.clearInterval(interval)
  P1_BUTTON.disabled = false
  p1Time = MIN * 60000
  P1_BUTTON.innerText = msToMin(p1Time)
  P2_BUTTON.disabled = false
  p2Time = MIN * 60000
  P2_BUTTON.innerText = msToMin(p2Time)
  paused = false
  document.getElementById("pauseIcon").innerText = "pause"
}

function player1Playing() {
  P1_BUTTON.disabled = true
  P2_BUTTON.disabled = false
  window.clearInterval(interval)
  p1Time += INC * 1000
  interval = window.setInterval(time, 10, false)
  TICK.play()
}

function player2Playing() {
  P1_BUTTON.disabled = false
  P2_BUTTON.disabled = true
  p2Time += INC * 1000
  window.clearInterval(interval)
  interval = window.setInterval(time, 10, true)
  TICK.play()
}

function pause() {
  if (!paused) {
    window.clearInterval(interval)
    P1_BUTTON.disabled = true
    P2_BUTTON.disabled = true
    paused = true
    document.getElementById("pauseIcon").innerText = "play_arrow"
  } else {
    paused = false
    P1_BUTTON.disabled = false
    P2_BUTTON.disabled = false
    document.getElementById("pauseIcon").innerText = "pause"
  }
}

function msToMin(millis) {
  let sec = Math.floor(millis / 1000)
  let hrs = Math.floor(sec / 3600)
  sec -= hrs * 3600
  let min = Math.floor(sec / 60)
  sec -= min * 60
  sec = "" + sec
  sec = ("00" + sec).substring(sec.toString().length)
  if (hrs > 0) {
    min = "" + min
    min = ("00" + min).substring(min.toString().length)
    return hrs + ":" + min + ":" + sec
  } else {
    return min + ":" + sec
  }
}

function time(isPlayer1) {
  if (isPlayer1) {
    p1Time -= 10
    P1_BUTTON.innerText = msToMin(p1Time + 1000)
    if (p1Time + 1000 <= 0) {
      document.getElementById("pause").remove()
      pause()
      window.clearInterval(interval)
    }
  } else {
    p2Time -= 10
    P2_BUTTON.innerText = msToMin(p2Time + 1000)
    if (p2Time + 1000 <= 0) {
      document.getElementById("pause").remove()
      pause()
      window.clearInterval(interval)
    }
  }
}
