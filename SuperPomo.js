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
var breakSound = new Audio("audio/lalala.mp3");
var workSound = new Audio("audio/shouganai.mp3");

var x = setInterval(countdown, 1000);

function initSounds() {
  breakSound.play();
  breakSound.pause();
  workSound.play();
  workSound.pause();
}

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
  initSounds();
  if (workTimerPaused) {
    stopBreakTimer();
    startWorkTimer();
  } else {
    stopWorkTimer();
  }
});

toggleBreakTimerButton.addEventListener("click", function() {
  initSounds();
  if (breakTimerPaused) {
    stopWorkTimer();
    startBreakTimer();
  } else {
    stopBreakTimer();
  }
});

resetButton.addEventListener("click", function() {
  initSounds();
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
    Notify("SuperPomo", "Time for a break!");
    breakSound.play();
  } else if (!breakTimerPaused) {
    breakTimerPaused = true;
    toggleWorkTimerButton.classList.add("bigger");
    message.textContent = "Back to work!";
    Notify("SuperPomo", "Time to get back to work!");
    workSound.play();
  }
}

/**
 * Notification API code!
 */

// Determine the correct object to use
var notification =
  window.Notification || window.mozNotification || window.webkitNotification;

// The user needs to allow this
if ("undefined" === typeof notification)
  alert("Web notification not supported");
else notification.requestPermission(function(permission) {});

// A function handler
function Notify(titleText, bodyText) {
  if ("undefined" === typeof notification) return false; //Not supported....
  var noty = new notification(titleText, {
    body: bodyText
  });
  noty.onclick = function() {
    console.log("notification.Click");
  };
  noty.onerror = function() {
    console.log("notification.Error");
  };
  noty.onshow = function() {
    console.log("notification.Show");
  };
  noty.onclose = function() {
    console.log("notification.Close");
  };
  return true;
}

/**
 * Web Audio API Code
 */

function BufferLoader(context, urlList, callback) {
  this.context = context;
  this.urlList = urlList;
  this.onload = callback;
  this.bufferList = new Array();
  this.loadCount = 0;
}

BufferLoader.prototype.loadBuffer = function(url, index) {
  // Load buffer asynchronously
  var request = new XMLHttpRequest();
  request.open("GET", url, true);
  request.responseType = "arraybuffer";

  var loader = this;

  request.onload = function() {
    // Asynchronously decode the audio file data in request.response
    loader.context.decodeAudioData(
      request.response,
      function(buffer) {
        if (!buffer) {
          alert("error decoding file data: " + url);
          return;
        }
        loader.bufferList[index] = buffer;
        if (++loader.loadCount == loader.urlList.length)
          loader.onload(loader.bufferList);
      },
      function(error) {
        console.error("decodeAudioData error", error);
      }
    );
  };

  request.onerror = function() {
    alert("BufferLoader: XHR error");
  };

  request.send();
};

BufferLoader.prototype.load = function() {
  for (var i = 0; i < this.urlList.length; ++i)
    this.loadBuffer(this.urlList[i], i);
};

var context;
var bufferLoader;
var source1;
var source2;

// Fix up prefixing
window.AudioContext = window.AudioContext || window.webkitAudioContext;
context = new AudioContext();

bufferLoader = new BufferLoader(
  context,
  ["audio/shouganai.mp3", "audio/lalala.mp3"],
  finishedLoading
);

bufferLoader.load();

function finishedLoading(bufferList) {
  // Create two sources and play them both together.
  source1 = context.createBufferSource();
  source2 = context.createBufferSource();
  source1.buffer = bufferList[0];
  source2.buffer = bufferList[1];

  // source1.connect(context.destination);
  // source2.connect(context.destination);
  // source1.start(0);
  // source2.start(0);
  playSound(source1);
}

//We will call this function from the index file
//it might look messy/crazy, but every time you want to play/replay a sound in Web Audio, you need to re-create the contect and connection.
function playSound(sound, volume, loop) {
  //set some default values for the functions volume and loop parameters
  volume = typeof volume !== "undefined" ? volume : 1;
  loop = typeof loop !== "undefined" ? loop : false;

  var source = context.createBufferSource(), g = context.createGain();
  source.buffer = sound.buffer;
  source.loop = loop;
  g.gain.value = volume;
  source.connect(g);
  g.connect(context.destination);
  source.start(0);
}
