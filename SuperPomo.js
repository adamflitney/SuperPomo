var timer = document.getElementById("timer");
var toggleTimerButton = document.getElementById("toggleTimer");
var resetButton = document.getElementById("resetTimer");
var minutes = 24;
var seconds = 59;
var timerPaused = true;

var x = setInterval(countdown, 1000);

function countdown(){
    if(!timerPaused){
        //alert("timer not paused");
    if(seconds > 0){
        //alert("seconds > 0");
        seconds--;
    } else if(minutes > 0) {
        //alert("minutes > 0");
        minutes--;
        seconds = 59;
    }
    timer.textContent = formatTime(minutes, seconds);
}

}

function formatTime(minutes, seconds){
    var minutesStr, secondsStr;
    minutesStr = minutes < 10 ? "0" + minutes : minutes;
    secondsStr = seconds < 10 ? "0" + seconds : seconds;
    return minutesStr + ":" + secondsStr;
}

//timerPaused = false;

toggleTimerButton.addEventListener("click", function(){
    if(timerPaused){
        toggleTimerButton.textContent = "Stop Timer";
        timerPaused = false;
    } else {
        toggleTimerButton.textContent = "Start Timer";
        timerPaused = true;
    }
});

resetButton.addEventListener("click", function(){
    minutes = 25;
    seconds = 0;
    timerPaused = true;
    timer.textContent = formatTime(minutes, seconds);
})