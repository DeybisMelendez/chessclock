const queryString = window.location.search
const urlParams = new URLSearchParams(queryString)
document.getElementById("restart").onclick = restart
document.getElementById("settings").onclick = settings
document.getElementById("play").onclick = play
const playIcon = document.getElementById("playIcon")

var audio = new Audio("assets/clock-tock.ogg")
const min = urlParams.get("min") || 5
const inc = urlParams.get("inc") || 0
const player1 = document.getElementById("player1")
const player2 = document.getElementById("player2")
const player1info = document.getElementById("player1info")
const player2info = document.getElementById("player2info")
var player1time = min*60000
var player2time = min*60000
var turn
var interval
var playing = false

console.log("min: " + min + ", inc: " + inc)

player1info.innerText = msToMin(player1time)
player2info.innerText = msToMin(player2time)

player1.onclick = player1Button
player2.onclick = player2Button

function msToMin(millis) {
    let sec = Math.floor(millis / 1000);
    let hrs = Math.floor(sec / 3600);
    sec -= hrs * 3600;
    let min = Math.floor(sec / 60);
    sec -= min * 60;
  
    sec = '' + sec;
    sec = ('00' + sec).substring(sec.length);
  
    if (hrs > 0) {
      min = '' + min;
      min = ('00' + min).substring(min.length);
      return hrs + ":" + min + ":" + sec;
    }
    else {
      return min + ":" + sec;
    }
  }

function time(){
    if (turn == true) {
        player1time -= 10
        player1info.innerText = msToMin(player1time+1000)
        if (player1time+1000 <= 0){
            window.clearInterval(interval)
            player1.classList.add('disabled')
            document.getElementById("play").remove()
        }
    } else {
        player2time -= 10
        player2info.innerText = msToMin(player2time+1000)
        if (player2time+1000 <= 0){
            window.clearInterval(interval)
            player2.classList.add('disabled')
            document.getElementById("play").remove()
        }
    }
}

function checkPlaying(){
    if (!playing) {
        interval = window.setInterval(time, 10)
        playing = true
    }
}

function player1Button() {
    if (player2.classList.contains("disabled")){
        player2.classList.remove('disabled')
    }
    if (!player1.classList.contains("disabled")) {
        player1.classList.add('disabled')
    }
    turn = false
    checkPlaying()
    player1time += inc * 1000
    audio.play()
    console.log("Player 1")
}

function player2Button() {
    if (player1.classList.contains("disabled")){
        player1.classList.remove('disabled')
    }
    if (!player2.classList.contains("disabled")) {
        player2.classList.add('disabled')
    }
    turn = true
    checkPlaying()
    player2time += inc * 1000
    audio.play()
    console.log("Player 2")
}

function restart() {
    location.reload()
}

function play(){
    if (playing == true) {
        playing = false
        window.clearInterval(interval)
        if (!player1.classList.contains("disabled")) {
            player1.classList.add('disabled')
        }
        if (!player2.classList.contains("disabled")) {
            player2.classList.add('disabled')
        }
        playIcon.innerText = "play_arrow"
    } else if (turn != null){
        playIcon.innerText = "pause"
        if (turn == true) {
            player2Button()
            player2time -= inc * 1000
        } else {
            player1Button()
            player1time -= inc * 1000
        }
    }
}
// Settings
document.addEventListener('DOMContentLoaded', function() {
    var elems = document.querySelectorAll('.modal')
    var instances = M.Modal.init(elems)
  })

document.getElementById("clock").onclick = setClock
document.getElementById("newmin").value = min
document.getElementById("newinc").value = inc
function setClock() {
    var newmin = document.getElementById("newmin").value.toString()
    var newinc = document.getElementById("newinc").value.toString()
    window.location.href = "?min=" + newmin + "&inc=" + newinc
}