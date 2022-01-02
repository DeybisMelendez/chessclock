const queryString = window.location.search
const urlParams = new URLSearchParams(queryString)
const tick1 = new Audio("assets/tick.ogg")
const tick2 = new Audio("assets/tick.ogg")
const min = urlParams.get("min") || 5
const inc = urlParams.get("inc") || 0
const player1 = document.getElementById("player1")
const player2 = document.getElementById("player2")
var player1time = min*60000
var player2time = min*60000
player1.innerText = msToMin(player1time)
player2.innerText = msToMin(player2time)
player1.onclick = player1Button
player2.onclick = player2Button
var interval
var playing = false

function msToMin(millis) {
    let sec = Math.floor(millis / 1000)
    let hrs = Math.floor(sec / 3600)
    sec -= hrs * 3600
    let min = Math.floor(sec / 60)
    sec -= min * 60
    sec = '' + sec
    sec = ('00' + sec).substring(sec.toString().length)
    if (hrs > 0) {
        min = '' + min
        min = ('00' + min).substring(min.toString().length)
        return hrs + ":" + min + ":" + sec
    } else {
        return min + ":" + sec
    }
}

function time(){
    if (player2.disabled == true) {
        player1time -= 10
        player1.innerText = msToMin(player1time+1000)
        if (player1time+1000 <= 0){
            window.clearInterval(interval)
            player1.classList.add('disabled')
            document.getElementById("play").remove()
        }
    } else {
        player2time -= 10
        player2.innerText = msToMin(player2time+1000)
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
        document.getElementById("pauseIcon").innerText = "pause"
    }
}

function player1Button() {
    player1.disabled = true
    player2.disabled = false
    checkPlaying()
    player1time += inc * 1000
    tick1.play()
}

function player2Button() {
    player1.disabled = false
    player2.disabled = true
    checkPlaying()
    player2time += inc * 1000
    tick2.play()
}

// Pause Button
document.getElementById("pause").onclick = pause
function pause(){
    if (playing == true) {
        playing = false
        window.clearInterval(interval)
        document.getElementById("pauseIcon").innerText = "play_arrow"
    } else if (player1.disabled == true || player2.disabled == true){
        document.getElementById("pauseIcon").innerText = "pause"
        if (player2.disabled == true) {
            player2Button()
            player2time -= inc * 1000
        } else {
            player1Button()
            player1time -= inc * 1000
        }
    }
}

// Reload Button

document.getElementById("restart").onclick = restart
function restart() {
    location.reload()
}

// Settings

document.getElementById("clock").onclick = setClock
document.getElementById("newmin").value = min
document.getElementById("newinc").value = inc
function setClock() {
    var newmin = document.getElementById("newmin").value.toString()
    var newinc = document.getElementById("newinc").value.toString()
    window.location.href = "?min=" + newmin + "&inc=" + newinc
}

// Get the modal
var modal = document.getElementById("settings-menu")

// Get the button that opens the modal
var btn = document.getElementById("settings")

// Get the <span> element that closes the modal
var span = document.getElementsByClassName("close")[0]

// When the user clicks on the button, open the modal
btn.onclick = function() {
  modal.style.display = "block"
}

// When the user clicks on <span> (x), close the modal
span.onclick = function() {
  modal.style.display = "none"
}

// When the user clicks anywhere outside of the modal, close it
window.onclick = function(event) {
  if (event.target == modal) {
    modal.style.display = "none"
  }
}

// fullscreen

function fullscreen() {
    if (isFullscreen == true) {
        closeFullscreen()
        document.getElementById("fullscreenIcon").innerText = "fullscreen"
        isFullscreen = false
    } else {
        openFullscreen()
        document.getElementById("fullscreenIcon").innerText = "fullscreen_exit"
        isFullscreen = true
    }
}