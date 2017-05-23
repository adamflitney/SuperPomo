var timer = document.getElementById("timer");
var toggleWorkTimerButton = document.getElementById("toggleWorkTimer");
var toggleBreakTimerButton = document.getElementById("toggleBreakTimer");
var resetButton = document.getElementById("resetTimer");
var message = document.getElementById("inspirationalMessage");
var minutes = 25;
var seconds = 0;
var minutesDisplay = document.getElementById("minutes");
var secondsDisplay = document.getElementById("seconds");
var workTimerPaused = true;
var breakTimerPaused = true;

//sound effects
var breakSound = new Audio("lalala.mp3");
var workSound = new Audio("shouganai.mp3");

var x = setInterval(countdown, 1000);

function countdown() {
  if (!workTimerPaused || !breakTimerPaused) {
    //alert("timer not paused");
    if (seconds > 0) {
      //alert("seconds > 0");
      seconds--;
    } else if (minutes > 0) {
      //alert("minutes > 0");
      minutes--;
      seconds = 59;
    } else {
      timerFinished();
    }
    displayTime(minutes, seconds);
  }
}

function displayTime(minutes, seconds) {
  var minutesStr, secondsStr;
  minutesStr = minutes < 10 ? "0" + minutes : minutes;
  secondsStr = seconds < 10 ? "0" + seconds : seconds;
  minutesDisplay.textContent = minutesStr;
  secondsDisplay.textContent = secondsStr;
}

//timerPaused = false;

toggleWorkTimerButton.addEventListener("click", function() {
  if (workTimerPaused) {
    stopBreakTimer();
    startWorkTimer();
  } else {
    stopWorkTimer();
  }
});

toggleBreakTimerButton.addEventListener("click", function() {
  if (breakTimerPaused) {
    stopWorkTimer();
    startBreakTimer();
  } else {
    stopBreakTimer();
  }
});

resetButton.addEventListener("click", function() {
  toggleWorkTimerButton.classList.remove("bigger");
  toggleBreakTimerButton.classList.remove("bigger");
  stopWorkTimer();
  stopBreakTimer();
  minutes = 25;
  seconds = 0;
  displayTime(minutes, seconds);
  message.textContent = "Let's do some work!";
});

function stopWorkTimer() {
  toggleWorkTimerButton.textContent = "Start Work";
  workTimerPaused = true;
  toggleWorkTimerButton.classList.remove("stop");
  toggleWorkTimerButton.classList.add("start");
}

function startWorkTimer() {
  toggleWorkTimerButton.classList.remove("bigger");
  toggleBreakTimerButton.classList.remove("bigger");
  minutes = 1;
  seconds = 0;
  displayTime(minutes, seconds);
  toggleWorkTimerButton.textContent = "Stop Work";
  workTimerPaused = false;
  toggleWorkTimerButton.classList.remove("start");
  toggleWorkTimerButton.classList.add("stop");
  message.textContent = "Working!";
}

function stopBreakTimer() {
  toggleBreakTimerButton.textContent = "Start Break";
  breakTimerPaused = true;
  toggleBreakTimerButton.classList.remove("stop");
  toggleBreakTimerButton.classList.add("start");
}

function startBreakTimer() {
  toggleWorkTimerButton.classList.remove("bigger");
  toggleBreakTimerButton.classList.remove("bigger");
  minutes = 1;
  seconds = 0;
  displayTime(minutes, seconds);
  toggleBreakTimerButton.textContent = "Stop Break";
  breakTimerPaused = false;
  toggleBreakTimerButton.classList.remove("start");
  toggleBreakTimerButton.classList.add("stop");
  message.textContent = "Resting!";
}

function timerFinished() {
  if (!workTimerPaused) {
    workTimerPaused = true;
    toggleBreakTimerButton.classList.add("bigger");
    message.textContent = "Take a break!";
    breakSound.play();
  } else if (!breakTimerPaused) {
    breakTimerPaused = true;
    toggleWorkTimerButton.classList.add("bigger");
    message.textContent = "Back to work!";
    workSound.play();
  }
}
