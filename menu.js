document.getElementById("clock").onclick = setClock
document.getElementById("newmin").value = MIN
document.getElementById("newinc").value = INC

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
btn.onclick = function () {
    modal.style.display = "block"
}

// When the user clicks on <span> (x), close the modal
span.onclick = function () {
    modal.style.display = "none"
}

// When the user clicks anywhere outside of the modal, close it
window.onclick = function (event) {
    if (event.target == modal) {
        modal.style.display = "none"
    }
}